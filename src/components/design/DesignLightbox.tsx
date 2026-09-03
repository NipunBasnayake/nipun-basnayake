import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { useEffect, useRef } from "react";
import type { DesignCategory, DesignItem } from "../../data/designPortfolio";

interface DesignLightboxProps {
  item: DesignItem | null;
  items: DesignItem[];
  categories: DesignCategory[];
  onClose: () => void;
  onSelect: (item: DesignItem) => void;
}

export function DesignLightbox({
  item,
  items,
  categories,
  onClose,
  onSelect,
}: DesignLightboxProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const startXRef = useRef<number | null>(null);

  const activeIndex = item
    ? items.findIndex((candidate) => candidate.id === item.id)
    : -1;
  const category = item
    ? categories.find((candidate) => candidate.id === item.categoryId)
    : undefined;

  const goTo = (direction: -1 | 1) => {
    if (!item || activeIndex < 0 || items.length < 2) return;

    const nextIndex = (activeIndex + direction + items.length) % items.length;
    onSelect(items[nextIndex]);
  };

  useEffect(() => {
    if (!item) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key === "ArrowLeft") {
        goTo(-1);
      }

      if (event.key === "ArrowRight") {
        goTo(1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex, item, items, onClose]);

  if (!item) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      className="fixed inset-0 z-[80] bg-obsidian/95 p-4 backdrop-blur-xl sm:p-6"
      onPointerDown={(event) => {
        startXRef.current = event.clientX;
      }}
      onPointerUp={(event) => {
        if (startXRef.current === null) return;

        const delta = event.clientX - startXRef.current;
        startXRef.current = null;

        if (Math.abs(delta) < 70) return;
        goTo(delta > 0 ? -1 : 1);
      }}
    >
      <div className="mx-auto flex h-full max-w-7xl flex-col">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate font-display text-xl font-black text-platinum sm:text-2xl">
              {item.title}
            </p>
            <p className="mt-1 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-platinum/46">
              {category?.label ?? "Design Work"}
            </p>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="grid size-12 flex-none place-items-center rounded-full border border-white/12 bg-white/[0.06] text-platinum transition hover:border-ember/45 hover:bg-ember/12 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-arctic"
            aria-label="Close design preview"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="relative grid min-h-0 flex-1 place-items-center rounded-[1.4rem] border border-white/10 bg-black/35 p-3 sm:p-6">
          <img
            src={item.image}
            alt={item.alt}
            width={item.width}
            height={item.height}
            decoding="async"
            className="max-h-full max-w-full object-contain"
          />

          {items.length > 1 ? (
            <>
              <button
                type="button"
                onClick={() => goTo(-1)}
                className="absolute left-3 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full border border-white/12 bg-obsidian/78 text-platinum backdrop-blur-md transition hover:border-arctic/40 hover:bg-arctic/12 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-arctic"
                aria-label="Previous design"
              >
                <ArrowLeft className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => goTo(1)}
                className="absolute right-3 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full border border-white/12 bg-obsidian/78 text-platinum backdrop-blur-md transition hover:border-arctic/40 hover:bg-arctic/12 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-arctic"
                aria-label="Next design"
              >
                <ArrowRight className="size-5" />
              </button>
            </>
          ) : null}
        </div>

        {item.description ? (
          <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-7 text-platinum/62">
            {item.description}
          </p>
        ) : null}
      </div>
    </div>
  );
}

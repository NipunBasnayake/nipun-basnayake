import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { DesignCategory, DesignItem } from "../../data/designPortfolio";

interface DesignLightboxProps {
  item: DesignItem | null;
  items: DesignItem[];
  categories: DesignCategory[];
  onClose: () => void;
  onSelect: (item: DesignItem) => void;
  returnFocusElement?: HTMLElement | null;
}

export function DesignLightbox({
  item,
  items,
  categories,
  onClose,
  onSelect,
  returnFocusElement,
}: DesignLightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const startXRef = useRef<number | null>(null);
  const [imageFailed, setImageFailed] = useState(false);

  const activeIndex = item
    ? items.findIndex((candidate) => candidate.id === item.id)
    : -1;
  const category = item
    ? categories.find((candidate) => candidate.id === item.categoryId)
    : undefined;

  const goTo = useCallback((direction: -1 | 1) => {
    if (!item || activeIndex < 0 || items.length < 2) return;

    const nextIndex = (activeIndex + direction + items.length) % items.length;
    onSelect(items[nextIndex]);
  }, [activeIndex, item, items, onSelect]);

  useEffect(() => {
    if (!item) return undefined;

    setImageFailed(false);
  }, [item]);

  useEffect(() => {
    if (!item) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;

      if (returnFocusElement?.isConnected) {
        returnFocusElement.focus();
      }
    };
  }, [Boolean(item), returnFocusElement]);

  useEffect(() => {
    if (!item) return undefined;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key === "ArrowLeft") {
        goTo(-1);
        return;
      }

      if (event.key === "ArrowRight") {
        goTo(1);
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusableElements = Array.from(
        dialogRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      ).filter((element) => !element.hasAttribute("aria-hidden"));

      if (focusableElements.length === 0) {
        event.preventDefault();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement;

      if (event.shiftKey && activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
        return;
      }

      if (!event.shiftKey && activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [goTo, item, onClose]);

  if (!item) return null;

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      className="fixed inset-0 z-[80] bg-obsidian/95 p-4 backdrop-blur-xl [padding-bottom:max(1rem,env(safe-area-inset-bottom))] [padding-left:max(1rem,env(safe-area-inset-left))] [padding-right:max(1rem,env(safe-area-inset-right))] [padding-top:max(1rem,env(safe-area-inset-top))] sm:p-6"
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
          {imageFailed ? (
            <div className="grid h-full min-h-64 w-full place-items-center rounded-[1rem] bg-[radial-gradient(circle_at_50%_20%,rgba(162,41,255,0.12),transparent_34%),linear-gradient(135deg,rgba(255,90,61,0.08),rgba(5,5,5,0.92))] p-6 text-center">
              <div>
                <p className="font-display text-2xl font-black text-platinum">
                  Artwork unavailable
                </p>
                <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-platinum/58">
                  The full artwork file could not be loaded.
                </p>
              </div>
            </div>
          ) : (
            <img
              src={item.image}
              alt={item.alt}
              width={item.width}
              height={item.height}
              decoding="async"
              className="max-h-full max-w-full object-contain"
              onError={() => setImageFailed(true)}
            />
          )}

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

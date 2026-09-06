import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const startXRef = useRef<number | null>(null);
  const [imageFailed, setImageFailed] = useState(false);

  const activeIndex = item
    ? items.findIndex((candidate) => candidate.id === item.id)
    : -1;
  const category = item
    ? categories.find((candidate) => candidate.id === item.categoryId)
    : undefined;

  const goTo = useCallback(
    (direction: -1 | 1) => {
      if (!item || activeIndex < 0 || items.length < 2) return;

      videoRef.current?.pause();
      const nextIndex = (activeIndex + direction + items.length) % items.length;
      onSelect(items[nextIndex]);
    },
    [activeIndex, item, items, onSelect],
  );

  useEffect(() => {
    if (!item) return undefined;

    setImageFailed(false);
    dialogRef.current?.scrollTo(0, 0);
  }, [item]);

  useEffect(() => {
    if (!item) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.classList.add("lightbox-scroll-locked");
    document.documentElement.classList.add("lightbox-scroll-locked");
    closeButtonRef.current?.focus();

    return () => {
      videoRef.current?.pause();
      document.body.classList.remove("lightbox-scroll-locked");
      document.documentElement.classList.remove("lightbox-scroll-locked");
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
        if (event.target instanceof HTMLMediaElement) return;
        goTo(-1);
        return;
      }

      if (event.key === "ArrowRight") {
        if (event.target instanceof HTMLMediaElement) return;
        goTo(1);
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusableElements = Array.from(
        dialogRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), video[controls], textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
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
  if (typeof document === "undefined") return null;

  const isVideo = item.mediaType === "video";

  const lightbox = (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      aria-describedby="design-lightbox-meta"
      className="fixed inset-0 z-[2147483647] isolate h-screen h-[100dvh] max-h-screen max-h-[100dvh] w-screen overflow-hidden bg-obsidian/95 p-3 backdrop-blur-xl [padding-bottom:max(0.75rem,env(safe-area-inset-bottom))] [padding-left:max(0.75rem,env(safe-area-inset-left))] [padding-right:max(0.75rem,env(safe-area-inset-right))] [padding-top:max(0.75rem,env(safe-area-inset-top))] sm:p-6"
      onPointerDown={(event) => {
        if (event.target instanceof HTMLElement && event.target.closest("button, video")) {
          return;
        }
        startXRef.current = event.clientX;
      }}
      onPointerUp={(event) => {
        if (event.target instanceof HTMLElement && event.target.closest("button, video")) {
          startXRef.current = null;
          return;
        }
        if (startXRef.current === null) return;

        const delta = event.clientX - startXRef.current;
        startXRef.current = null;

        if (Math.abs(delta) < 70) return;
        goTo(delta > 0 ? -1 : 1);
      }}
    >
      <div className="mx-auto flex h-full max-h-full min-h-0 max-w-7xl flex-col overflow-hidden">
        <div className="mb-3 flex flex-none items-center justify-between gap-3 sm:mb-4">
          <div className="min-w-0">
            <p className="truncate font-display text-base font-black text-platinum min-[390px]:text-lg sm:text-2xl">
              {item.title}
            </p>
            <p id="design-lightbox-meta" className="mt-1 truncate font-mono text-[0.62rem] uppercase tracking-[0.18em] text-platinum/46 sm:text-[0.68rem] sm:tracking-[0.22em]">
              {category?.label ?? "Design Work"}
            </p>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="tap-target grid size-11 flex-none place-items-center rounded-full border border-white/12 bg-white/[0.06] text-platinum transition hover:border-ember/45 hover:bg-ember/12 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-arctic sm:size-12"
            aria-label="Close design preview"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="relative min-h-0 flex-1 overflow-hidden rounded-[1rem] border border-white/10 bg-black/35 sm:rounded-[1.4rem]">
          {imageFailed ? (
            <div className="absolute inset-3 grid place-items-center rounded-[1rem] bg-[radial-gradient(circle_at_50%_20%,rgba(162,41,255,0.12),transparent_34%),linear-gradient(135deg,rgba(255,90,61,0.08),rgba(5,5,5,0.92))] p-6 text-center sm:inset-6">
              <div>
                <p className="font-display text-2xl font-black text-platinum">
                  Artwork unavailable
                </p>
                <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-platinum/58">
                  The full artwork file could not be loaded.
                </p>
              </div>
            </div>
          ) : isVideo ? (
            <div className="absolute inset-2 min-h-0 min-w-0 overflow-hidden sm:inset-6">
              <video
                key={item.id}
                ref={videoRef}
                src={item.image}
                poster={item.thumbnail}
                width={item.width}
                height={item.height}
                controls
                playsInline
                preload="metadata"
                className="block h-full w-full object-contain"
                onError={() => setImageFailed(true)}
              />
            </div>
          ) : (
            <div className="absolute inset-2 min-h-0 min-w-0 overflow-hidden sm:inset-6">
              <img
                src={item.image}
                alt={item.alt}
                width={item.width}
                height={item.height}
                decoding="async"
                className="block h-full w-full object-contain"
                onError={() => setImageFailed(true)}
              />
            </div>
          )}

          {items.length > 1 ? (
            <>
              <button
                type="button"
                onClick={() => goTo(-1)}
                className="tap-target absolute bottom-3 left-[calc(50%-3.5rem)] grid size-11 place-items-center rounded-full border border-white/12 bg-obsidian/78 text-platinum backdrop-blur-md transition hover:border-arctic/40 hover:bg-arctic/12 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-arctic sm:left-3 sm:top-1/2 sm:size-12 sm:-translate-y-1/2"
                aria-label="Previous design"
              >
                <ArrowLeft className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => goTo(1)}
                className="tap-target absolute bottom-3 right-[calc(50%-3.5rem)] grid size-11 place-items-center rounded-full border border-white/12 bg-obsidian/78 text-platinum backdrop-blur-md transition hover:border-arctic/40 hover:bg-arctic/12 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-arctic sm:right-3 sm:top-1/2 sm:size-12 sm:-translate-y-1/2"
                aria-label="Next design"
              >
                <ArrowRight className="size-5" />
              </button>
            </>
          ) : null}
        </div>

      </div>
    </div>
  );

  return createPortal(lightbox, document.body);
}

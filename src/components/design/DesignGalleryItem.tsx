import { Maximize2, PlayCircle } from "lucide-react";
import { useState } from "react";
import type { DesignCategory, DesignItem } from "../../data/designPortfolio";

interface DesignGalleryItemProps {
  item: DesignItem;
  category?: DesignCategory;
  onOpen: (item: DesignItem, trigger: HTMLButtonElement) => void;
}

export function DesignGalleryItem({
  item,
  category,
  onOpen,
}: DesignGalleryItemProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const aspectRatio = `${item.width} / ${item.height}`;
  const isVideo = item.mediaType === "video";
  const thumbnail = item.thumbnail;
  const hasMediaSource = Boolean(thumbnail || item.image);
  const showFallback = imageFailed || !hasMediaSource;

  return (
    <button
      type="button"
      onClick={(event) => onOpen(item, event.currentTarget)}
      className="group mb-3 block w-full break-inside-avoid overflow-hidden rounded-[1rem] border border-white/10 bg-white/[0.055] text-left shadow-[0_18px_52px_rgba(0,0,0,0.24)] transition hover:border-wine/45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-arctic sm:mb-5 sm:rounded-[1.4rem] lg:hover:-translate-y-1"
      aria-label={`${isVideo ? "Play" : "Open"} ${item.title}`}
    >
      <div className="relative overflow-hidden bg-carbon" style={{ aspectRatio }}>
        {showFallback ? (
          <div className="grid h-full w-full place-items-center bg-[radial-gradient(circle_at_50%_20%,rgba(162,41,255,0.12),transparent_34%),linear-gradient(135deg,rgba(255,90,61,0.08),rgba(5,5,5,0.92))] p-4 text-center sm:p-6">
            <span className="grid place-items-center gap-2 sm:gap-3">
              {isVideo ? (
                <PlayCircle className="size-8 text-ember/80 sm:size-12" aria-hidden="true" />
              ) : null}
              <span className="font-mono text-[0.62rem] font-bold uppercase tracking-[0.18em] text-platinum/48 sm:text-[0.68rem] sm:tracking-[0.22em]">
                {isVideo ? "Video preview" : "Artwork unavailable"}
              </span>
            </span>
          </div>
        ) : isVideo ? (
          <div className="relative h-full w-full overflow-hidden">
            {thumbnail ? (
              <img
                src={thumbnail}
                alt={item.alt}
                width={item.width}
                height={item.height}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition duration-500 lg:group-hover:scale-[1.025]"
                onError={() => setImageFailed(true)}
              />
            ) : (
              <video
                src={`${item.image}#t=0.001`}
                preload="metadata"
                muted
                playsInline
                width={item.width}
                height={item.height}
                className="h-full w-full object-cover transition duration-500 lg:group-hover:scale-[1.025]"
                onError={() => setImageFailed(true)}
              />
            )}
            <span className="absolute inset-0 grid place-items-center bg-obsidian/25 text-platinum opacity-95 transition group-hover:bg-obsidian/35">
              <span className="grid size-10 place-items-center rounded-full border border-white/20 bg-obsidian/75 shadow-[0_16px_42px_rgba(0,0,0,0.4)] backdrop-blur-md sm:size-14">
                <PlayCircle className="size-5 sm:size-7 text-platinum" aria-hidden="true" />
              </span>
            </span>
          </div>
        ) : (
          <img
            src={thumbnail ?? item.image}
            alt={item.alt}
            width={item.width}
            height={item.height}
            loading="lazy"
            decoding="async"
            className="h-auto w-full transition duration-500 lg:group-hover:scale-[1.025]"
            onError={() => setImageFailed(true)}
          />
        )}
        <span className="absolute right-2 top-2 grid size-7 place-items-center rounded-full border border-white/12 bg-obsidian/70 text-platinum opacity-100 backdrop-blur-md transition sm:right-3 sm:top-3 sm:size-10 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100">
          {isVideo ? (
            <PlayCircle className="size-3.5 sm:size-4" aria-hidden="true" />
          ) : (
            <Maximize2 className="size-3.5 sm:size-4" aria-hidden="true" />
          )}
        </span>
      </div>

      <span className="block p-3 sm:p-4">
        <span className="block break-words font-display text-sm font-bold leading-tight text-platinum sm:text-xl sm:font-black">
          {item.title}
        </span>
        {category ? (
          <span className="mt-1 block font-mono text-[0.62rem] uppercase tracking-[0.18em] text-ember/72 sm:mt-2 sm:text-[0.68rem] sm:tracking-[0.22em]">
            {category.label}
          </span>
        ) : null}
        {item.description ? (
          <span className="mt-2 block text-xs leading-5 text-platinum/62 sm:mt-3 sm:text-sm sm:leading-6">
            {item.description}
          </span>
        ) : null}
      </span>
    </button>
  );
}

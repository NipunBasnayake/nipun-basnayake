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
  const hasPreviewImage = !imageFailed && Boolean(thumbnail);

  return (
    <button
      type="button"
      onClick={(event) => onOpen(item, event.currentTarget)}
      className="group mb-5 block w-full break-inside-avoid overflow-hidden rounded-[1.2rem] border border-white/10 bg-white/[0.055] text-left shadow-[0_18px_52px_rgba(0,0,0,0.24)] transition hover:border-wine/45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-arctic sm:rounded-[1.4rem] lg:hover:-translate-y-1"
      aria-label={`${isVideo ? "Play" : "Open"} ${item.title}`}
    >
      <div className="relative overflow-hidden bg-carbon" style={{ aspectRatio }}>
        {!hasPreviewImage ? (
          <div className="grid h-full w-full place-items-center bg-[radial-gradient(circle_at_50%_20%,rgba(162,41,255,0.12),transparent_34%),linear-gradient(135deg,rgba(255,90,61,0.08),rgba(5,5,5,0.92))] p-6 text-center">
            <span className="grid place-items-center gap-3">
              {isVideo ? (
                <PlayCircle className="size-12 text-ember/80" aria-hidden="true" />
              ) : null}
              <span className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.22em] text-platinum/48">
                {isVideo ? "Video preview" : "Artwork unavailable"}
              </span>
            </span>
          </div>
        ) : (
          <img
            src={thumbnail}
            alt={item.alt}
            width={item.width}
            height={item.height}
            loading="lazy"
            decoding="async"
            className="h-auto w-full transition duration-500 lg:group-hover:scale-[1.025]"
            onError={() => setImageFailed(true)}
          />
        )}
        {isVideo && hasPreviewImage ? (
          <span className="absolute inset-0 grid place-items-center bg-obsidian/10 text-platinum opacity-95 transition group-hover:bg-obsidian/20">
            <span className="grid size-14 place-items-center rounded-full border border-white/18 bg-obsidian/72 shadow-[0_16px_42px_rgba(0,0,0,0.35)] backdrop-blur-md">
              <PlayCircle className="size-7" aria-hidden="true" />
            </span>
          </span>
        ) : null}
        <span className="absolute right-3 top-3 grid size-10 place-items-center rounded-full border border-white/12 bg-obsidian/70 text-platinum opacity-100 backdrop-blur-md transition sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100">
          {isVideo ? (
            <PlayCircle className="size-4" aria-hidden="true" />
          ) : (
            <Maximize2 className="size-4" aria-hidden="true" />
          )}
        </span>
      </div>

      <span className="block p-4">
        <span className="block break-words font-display text-lg font-black leading-tight text-platinum sm:text-xl">
          {item.title}
        </span>
        {category ? (
          <span className="mt-2 block font-mono text-[0.68rem] uppercase tracking-[0.22em] text-ember/72">
            {category.label}
          </span>
        ) : null}
        {item.description ? (
          <span className="mt-3 block text-sm leading-6 text-platinum/62">
            {item.description}
          </span>
        ) : null}
      </span>
    </button>
  );
}

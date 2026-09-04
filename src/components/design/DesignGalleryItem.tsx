import { Maximize2 } from "lucide-react";
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

  return (
    <button
      type="button"
      onClick={(event) => onOpen(item, event.currentTarget)}
      className="group mb-5 block w-full break-inside-avoid overflow-hidden rounded-[1.4rem] border border-white/10 bg-white/[0.055] text-left shadow-[0_18px_52px_rgba(0,0,0,0.24)] transition hover:-translate-y-1 hover:border-wine/45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-arctic"
      aria-label={`Open ${item.title}`}
    >
      <div className="relative overflow-hidden bg-carbon" style={{ aspectRatio }}>
        {imageFailed ? (
          <div className="grid h-full w-full place-items-center bg-[radial-gradient(circle_at_50%_20%,rgba(162,41,255,0.12),transparent_34%),linear-gradient(135deg,rgba(255,90,61,0.08),rgba(5,5,5,0.92))] p-6 text-center">
            <span className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.22em] text-platinum/48">
              Artwork unavailable
            </span>
          </div>
        ) : (
          <img
            src={item.thumbnail}
            alt={item.alt}
            width={item.width}
            height={item.height}
            loading="lazy"
            decoding="async"
            className="h-auto w-full transition duration-500 group-hover:scale-[1.025]"
            onError={() => setImageFailed(true)}
          />
        )}
        <span className="absolute right-3 top-3 grid size-10 place-items-center rounded-full border border-white/12 bg-obsidian/70 text-platinum opacity-0 backdrop-blur-md transition group-hover:opacity-100 group-focus-visible:opacity-100">
          <Maximize2 className="size-4" />
        </span>
      </div>

      <span className="block p-4">
        <span className="block font-display text-xl font-black leading-tight text-platinum">
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

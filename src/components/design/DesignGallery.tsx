import { useMemo, useState } from "react";
import type { DesignCategory, DesignItem } from "../../data/designPortfolio";
import { DesignCategoryFilters } from "./DesignCategoryFilters";
import { DesignGalleryItem } from "./DesignGalleryItem";
import { DesignLightbox } from "./DesignLightbox";

interface DesignGalleryProps {
  categories: DesignCategory[];
  items: DesignItem[];
}

export function DesignGallery({ categories, items }: DesignGalleryProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedItem, setSelectedItem] = useState<DesignItem | null>(null);

  const filteredItems = useMemo(() => {
    if (activeCategory === "all") return items;

    return items.filter((item) => item.categoryId === activeCategory);
  }, [activeCategory, items]);

  return (
    <div>
      <DesignCategoryFilters
        categories={categories}
        activeCategory={activeCategory}
        onChange={setActiveCategory}
      />

      {filteredItems.length > 0 ? (
        <div className="mt-10 columns-1 gap-5 sm:columns-2 lg:columns-3 xl:columns-4">
          {filteredItems.map((item) => (
            <DesignGalleryItem
              key={item.id}
              item={item}
              category={categories.find((category) => category.id === item.categoryId)}
              onOpen={setSelectedItem}
            />
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-[2rem] border border-dashed border-white/14 bg-white/[0.035] p-8 text-center sm:p-12">
          <p className="font-display text-3xl font-black leading-none text-platinum">
            Design gallery ready for real artwork.
          </p>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-platinum/62 sm:text-base sm:leading-8">
            Categories, mixed-aspect-ratio masonry layout, lazy image rendering, and lightbox behavior are in place. Add optimized design items to `src/data/designPortfolio.ts` when the real portfolio assets are ready.
          </p>
        </div>
      )}

      <DesignLightbox
        item={selectedItem}
        items={filteredItems}
        categories={categories}
        onClose={() => setSelectedItem(null)}
        onSelect={setSelectedItem}
      />
    </div>
  );
}

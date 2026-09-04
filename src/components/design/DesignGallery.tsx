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
  const [returnFocusElement, setReturnFocusElement] =
    useState<HTMLElement | null>(null);

  const categoryById = useMemo(
    () => new Map(categories.map((category) => [category.id, category])),
    [categories],
  );

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
        <div className="mt-10 columns-1 gap-5 min-[480px]:columns-2 md:columns-3 min-[1200px]:columns-4">
          {filteredItems.map((item) => (
            <DesignGalleryItem
              key={item.id}
              item={item}
              category={categoryById.get(item.categoryId)}
              onOpen={(nextItem, trigger) => {
                setReturnFocusElement(trigger);
                setSelectedItem(nextItem);
              }}
            />
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-[2rem] border border-dashed border-white/14 bg-white/[0.035] p-8 text-center sm:p-12">
          <p className="font-display text-3xl font-black leading-none text-platinum">
            Design gallery ready for real artwork.
          </p>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-platinum/62 sm:text-base sm:leading-8">
            Categories, mixed-aspect-ratio masonry layout, lazy image rendering, and lightbox behavior are in place. Add optimized design items to `src/data/designGallery.json` when the real portfolio assets are ready.
          </p>
        </div>
      )}

      <DesignLightbox
        item={selectedItem}
        items={filteredItems}
        categories={categories}
        onClose={() => setSelectedItem(null)}
        onSelect={setSelectedItem}
        returnFocusElement={returnFocusElement}
      />
    </div>
  );
}

import { ArrowUp } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { DesignCategory, DesignItem } from "../../data/designPortfolio";
import { DesignCategoryFilters } from "./DesignCategoryFilters";
import { DesignGalleryItem } from "./DesignGalleryItem";
import { DesignLightbox } from "./DesignLightbox";

interface DesignGalleryProps {
  categories: DesignCategory[];
  items: DesignItem[];
}

const initialVisibleItems = 24;
const visibleItemsBatch = 24;

export function DesignGallery({ categories, items }: DesignGalleryProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [visibleCount, setVisibleCount] = useState(initialVisibleItems);
  const [selectedItem, setSelectedItem] = useState<DesignItem | null>(null);
  const [returnFocusElement, setReturnFocusElement] =
    useState<HTMLElement | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const categoryById = useMemo(
    () => new Map(categories.map((category) => [category.id, category])),
    [categories],
  );

  const visibleCategories = useMemo(() => {
    const usedCategoryIds = new Set(items.map((item) => item.categoryId));

    return categories.filter((category) => usedCategoryIds.has(category.id));
  }, [categories, items]);

  useEffect(() => {
    if (
      activeCategory !== "all" &&
      !visibleCategories.some((category) => category.id === activeCategory)
    ) {
      setActiveCategory("all");
      setVisibleCount(initialVisibleItems);
    }
  }, [activeCategory, visibleCategories]);

  const filteredItems = useMemo(() => {
    if (activeCategory === "all") return items;

    return items.filter((item) => item.categoryId === activeCategory);
  }, [activeCategory, items]);

  const renderedItems = useMemo(
    () => filteredItems.slice(0, visibleCount),
    [filteredItems, visibleCount],
  );

  const remainingCount = Math.max(0, filteredItems.length - renderedItems.length);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 900);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const changeCategory = (categoryId: string) => {
    setActiveCategory(categoryId);
    setVisibleCount(initialVisibleItems);
    setSelectedItem(null);
  };

  const showMore = () => {
    setVisibleCount((current) =>
      Math.min(filteredItems.length, current + visibleItemsBatch),
    );
  };

  const backToGalleryTop = () => {
    const target = document.getElementById("design-work");

    if (target) {
      target.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
        block: "start",
      });
      return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div className="sticky top-[4.75rem] z-30 -mx-5 px-5 py-3 sm:-mx-6 sm:px-6 sm:top-[5.25rem] lg:-mx-8 lg:px-8 bg-obsidian/90 backdrop-blur-xl border-y border-white/10 shadow-[0_16px_36px_rgba(0,0,0,0.5)]">
        <DesignCategoryFilters
          categories={visibleCategories}
          activeCategory={activeCategory}
          onChange={changeCategory}
        />
      </div>

      {filteredItems.length > 0 ? (
        <>
          <p className="mt-6 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-platinum/44">
            Showing {renderedItems.length} of {filteredItems.length}
          </p>

          <div className="mt-8 columns-2 gap-3 sm:gap-5 md:columns-3 min-[1200px]:columns-4">
            {renderedItems.map((item) => (
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

          {remainingCount > 0 ? (
            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={showMore}
                className="tap-target inline-flex items-center justify-center rounded-full border border-white/12 bg-white/[0.065] px-6 py-3 text-center text-sm font-black uppercase tracking-[0.16em] text-platinum transition hover:border-wine/45 hover:bg-wine/18 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-arctic"
              >
                Load More Work
                <span className="ml-3 font-mono text-[0.68rem] font-bold text-platinum/48">
                  {remainingCount}
                </span>
              </button>
            </div>
          ) : null}
        </>
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
        items={renderedItems}
        categories={categories}
        onClose={() => setSelectedItem(null)}
        onSelect={setSelectedItem}
        returnFocusElement={returnFocusElement}
      />

      {showBackToTop ? (
        <button
          type="button"
          onClick={backToGalleryTop}
          className="tap-target fixed bottom-4 right-4 z-40 grid size-12 place-items-center rounded-full border border-white/12 bg-obsidian/82 text-platinum shadow-[0_16px_42px_rgba(0,0,0,0.32)] backdrop-blur-md transition hover:border-arctic/40 hover:bg-arctic/12 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-arctic [bottom:max(1rem,env(safe-area-inset-bottom))] [right:max(1rem,env(safe-area-inset-right))]"
          aria-label="Back to top of design work"
        >
          <ArrowUp className="size-5" aria-hidden="true" />
        </button>
      ) : null}
    </div>
  );
}

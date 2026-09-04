import type { DesignCategory } from "../../data/designPortfolio";
import { cn } from "../../lib/utils";

interface DesignCategoryFiltersProps {
  categories: DesignCategory[];
  activeCategory: string;
  onChange: (categoryId: string) => void;
}

export function DesignCategoryFilters({
  categories,
  activeCategory,
  onChange,
}: DesignCategoryFiltersProps) {
  return (
    <div
      className="-mx-5 overflow-x-auto px-5 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] sm:mx-0 sm:overflow-visible sm:px-0 sm:pb-0 [&::-webkit-scrollbar]:hidden"
      aria-label="Filter design portfolio"
    >
      <div className="flex w-max gap-2.5 sm:w-full sm:flex-wrap">
        <button
          type="button"
          onClick={() => onChange("all")}
          aria-pressed={activeCategory === "all"}
          className={cn(
            "min-h-11 shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-arctic",
            activeCategory === "all"
              ? "border-platinum bg-platinum text-obsidian"
              : "border-white/10 bg-white/[0.055] text-platinum/62 hover:border-arctic/35 hover:text-platinum",
          )}
        >
          All
        </button>

        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => onChange(category.id)}
            aria-pressed={activeCategory === category.id}
            className={cn(
              "min-h-11 shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-arctic",
              activeCategory === category.id
                ? "border-wine bg-wine text-platinum"
                : "border-white/10 bg-white/[0.055] text-platinum/62 hover:border-wine/45 hover:text-platinum",
            )}
          >
            {category.label}
          </button>
        ))}
      </div>
    </div>
  );
}

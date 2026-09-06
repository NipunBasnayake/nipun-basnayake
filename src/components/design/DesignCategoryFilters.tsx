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
      className="overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] sm:overflow-visible [&::-webkit-scrollbar]:hidden"
      aria-label="Filter design portfolio"
    >
      <div className="flex w-max gap-2 sm:w-full sm:flex-wrap">
        <button
          type="button"
          onClick={() => onChange("all")}
          aria-pressed={activeCategory === "all"}
          className={cn(
            "min-h-10 shrink-0 whitespace-nowrap rounded-full border px-3.5 py-1.5 text-xs font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-arctic sm:min-h-11 sm:px-4 sm:py-2 sm:text-sm",
            activeCategory === "all"
              ? "border-platinum bg-platinum text-obsidian shadow-[0_0_16px_rgba(255,255,255,0.22)]"
              : "border-white/10 bg-white/[0.055] text-platinum/65 hover:border-arctic/35 hover:text-platinum",
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
              "min-h-10 shrink-0 whitespace-nowrap rounded-full border px-3.5 py-1.5 text-xs font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-arctic sm:min-h-11 sm:px-4 sm:py-2 sm:text-sm",
              activeCategory === category.id
                ? "border-wine bg-wine text-platinum shadow-[0_0_16px_rgba(162,41,255,0.28)]"
                : "border-white/10 bg-white/[0.055] text-platinum/65 hover:border-wine/45 hover:text-platinum",
            )}
          >
            {category.label}
          </button>
        ))}
      </div>
    </div>
  );
}

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
    <div className="flex flex-wrap gap-2.5" aria-label="Filter design portfolio">
      <button
        type="button"
        onClick={() => onChange("all")}
        aria-pressed={activeCategory === "all"}
        className={cn(
          "min-h-11 rounded-full border px-4 py-2 text-sm font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-arctic",
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
            "min-h-11 rounded-full border px-4 py-2 text-sm font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-arctic",
            activeCategory === category.id
              ? "border-wine bg-wine text-platinum"
              : "border-white/10 bg-white/[0.055] text-platinum/62 hover:border-wine/45 hover:text-platinum",
          )}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
}

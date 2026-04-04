"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { PRODUCT_CATEGORIES } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface ShopFiltersProps {
  activeCategory: string;
  activeSort: string;
}

export function ShopFilters({ activeCategory, activeSort }: ShopFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function updateParams(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all" || value === "newest") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`/shop?${params.toString()}`);
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      {/* Category pills */}
      <div className="flex flex-wrap gap-2">
        {PRODUCT_CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => updateParams("category", cat.value)}
            className={cn(
              "text-sm px-4 py-1.5 rounded-full border transition-colors",
              activeCategory === cat.value
                ? "bg-terracotta text-white border-terracotta"
                : "bg-white text-walnut-light border-sage-light/50 hover:border-terracotta/30 hover:text-terracotta"
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Sort dropdown */}
      <select
        value={activeSort}
        onChange={(e) => updateParams("sort", e.target.value)}
        className="text-sm bg-white border border-sage-light/50 rounded-full px-4 py-1.5 text-walnut-light self-start"
      >
        <option value="newest">Newest</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
      </select>
    </div>
  );
}

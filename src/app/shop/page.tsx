import type { Metadata } from "next";
import { SectionHeading } from "@/components/shared/section-heading";
import { ProductCard } from "@/components/shop/product-card";
import { ShopFilters } from "@/components/shop/shop-filters";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Browse handcrafted, personalized keepsakes — embroidered hoops, baby blankets, custom sweaters, and monthly craft kits.",
};

interface ShopPageProps {
  searchParams: Promise<{ category?: string; sort?: string }>;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams;
  const category = params.category || "all";
  const sort = params.sort || "newest";

  let filtered = products.filter((p) => p.active);
  if (category !== "all") {
    filtered = filtered.filter((p) => p.category === category);
  }

  if (sort === "price-asc") {
    filtered.sort((a, b) => a.basePrice - b.basePrice);
  } else if (sort === "price-desc") {
    filtered.sort((a, b) => b.basePrice - a.basePrice);
  }

  return (
    <div className="section-padding bg-cream texture-paper">
      <div className="container-wide mx-auto">
        <SectionHeading
          title="Shop"
          subtitle="Every piece is handmade to order, just for you"
        />

        <ShopFilters activeCategory={category} activeSort={sort} />

        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-walnut-light text-lg">
              No products found in this category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

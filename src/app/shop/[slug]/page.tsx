import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { SectionHeading } from "@/components/shared/section-heading";
import { ProductCard } from "@/components/shop/product-card";
import { ProductCustomizer } from "@/components/shop/product-customizer";
import { getProductBySlug, getProductsByCategory } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/constants";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };

  return {
    title: product.name,
    description: product.shortDescription || product.description.slice(0, 160),
    openGraph: {
      title: `${product.name} | ${SITE_CONFIG.name}`,
      description: product.shortDescription || product.description.slice(0, 160),
      images: product.images,
      type: "website",
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const related = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="section-padding bg-cream">
      <div className="container-wide mx-auto">
        {/* Breadcrumb */}
        <nav className="text-sm text-walnut-light mb-8">
          <a href="/shop" className="hover:text-terracotta transition-colors">
            Shop
          </a>
          <span className="mx-2">/</span>
          <span className="text-walnut">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Left: Image gallery */}
          <div className="space-y-4">
            <div className="aspect-square rounded-2xl overflow-hidden bg-cream-dark shadow-sm">
              <Image
                src={product.images[0]}
                alt={product.name}
                width={800}
                height={800}
                className="object-cover w-full h-full"
                priority
              />
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.slice(1).map((img, i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-lg overflow-hidden bg-cream-dark"
                  >
                    <Image
                      src={img}
                      alt={`${product.name} ${i + 2}`}
                      width={200}
                      height={200}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product info */}
          <div>
            <h1 className="font-handwritten text-3xl sm:text-4xl text-walnut">
              {product.name}
            </h1>

            <div className="mt-3 flex items-center gap-3">
              <span className="text-2xl font-bold text-terracotta">
                {product.metadata?.type === "subscription"
                  ? `${formatPrice(product.basePrice)}/mo`
                  : `From ${formatPrice(product.basePrice)}`}
              </span>
              {product.compareAtPrice && (
                <span className="text-lg text-walnut-light line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
            </div>

            <p className="mt-5 text-walnut-light leading-relaxed">
              {product.description}
            </p>

            {/* Customization + Add to Cart */}
            <ProductCustomizer product={product} />

            {/* Features */}
            <div className="mt-8 pt-8 border-t border-sage-light/30">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-sage-dark mt-0.5">&#10003;</span>
                  <span className="text-walnut-light">Handmade to order</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-sage-dark mt-0.5">&#10003;</span>
                  <span className="text-walnut-light">
                    Free shipping over $75
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-sage-dark mt-0.5">&#10003;</span>
                  <span className="text-walnut-light">
                    Ships in 7-14 business days
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-sage-dark mt-0.5">&#10003;</span>
                  <span className="text-walnut-light">
                    Eco-friendly materials
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-20">
            <SectionHeading
              title="You Might Also Love"
              subtitle="More handcrafted pieces from our collection"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              name: product.name,
              description: product.shortDescription || product.description,
              image: product.images,
              offers: {
                "@type": "Offer",
                price: (product.basePrice / 100).toFixed(2),
                priceCurrency: "USD",
                availability: "https://schema.org/InStock",
              },
            }),
          }}
        />
      </div>
    </div>
  );
}

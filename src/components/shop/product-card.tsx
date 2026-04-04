import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-cream-dark">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {product.customizable && (
          <Badge className="absolute top-3 left-3 bg-terracotta text-white border-0 text-xs">
            Personalize
          </Badge>
        )}
        {product.metadata?.type === "subscription" && (
          <Badge className="absolute top-3 left-3 bg-sage-dark text-white border-0 text-xs">
            Subscription
          </Badge>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-medium text-walnut text-sm sm:text-base leading-snug group-hover:text-terracotta transition-colors">
          {product.name}
        </h3>
        <p className="mt-1 text-walnut-light text-xs sm:text-sm line-clamp-2">
          {product.shortDescription}
        </p>
        <div className="mt-2 flex items-center gap-2">
          <span className="font-semibold text-terracotta">
            {product.metadata?.type === "subscription"
              ? `${formatPrice(product.basePrice)}/mo`
              : formatPrice(product.basePrice)}
          </span>
          {product.compareAtPrice && (
            <span className="text-sm text-walnut-light line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
          {product.basePrice !== product.basePrice && product.customizable && (
            <span className="text-xs text-walnut-light">from</span>
          )}
        </div>
      </div>
    </Link>
  );
}

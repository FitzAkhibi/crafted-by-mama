"use client";

import { useState, useMemo } from "react";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/lib/utils";
import { toast } from "sonner";
import type { Product } from "@/types/product";

interface ProductCustomizerProps {
  product: Product;
}

export function ProductCustomizer({ product }: ProductCustomizerProps) {
  const [customizations, setCustomizations] = useState<Record<string, string>>(
    {}
  );
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((s) => s.addItem);

  // Calculate total price including customization modifiers
  const totalPrice = useMemo(() => {
    let price = product.basePrice;

    if (product.customizationOptions) {
      for (const option of product.customizationOptions) {
        const selectedValue = customizations[option.id];
        if (!selectedValue) continue;

        // Check option-level price modifier
        if (option.priceModifier) {
          price += option.priceModifier;
        }

        // Check selected value's price modifier (for select options)
        if (option.options) {
          const selected = option.options.find(
            (o) => o.value === selectedValue
          );
          if (selected?.priceModifier) {
            price += selected.priceModifier;
          }
        }
      }
    }

    return price;
  }, [product, customizations]);

  const handleAddToCart = () => {
    // Validate required customizations
    if (product.customizationOptions) {
      for (const option of product.customizationOptions) {
        if (option.required && !customizations[option.id]) {
          toast.error(`Please fill in "${option.label}"`);
          return;
        }
      }
    }

    addItem({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      image: product.images[0],
      price: totalPrice,
      quantity,
      customizations:
        Object.keys(customizations).length > 0 ? customizations : undefined,
    });

    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="mt-6 space-y-5">
      {/* Customization fields */}
      {product.customizationOptions?.map((option) => (
        <div key={option.id}>
          <Label className="text-sm font-medium text-walnut mb-1.5 block">
            {option.label}
            {option.required && <span className="text-terracotta ml-1">*</span>}
          </Label>

          {option.type === "text" && (
            <Input
              placeholder={option.placeholder}
              maxLength={option.maxLength}
              value={customizations[option.id] || ""}
              onChange={(e) =>
                setCustomizations((prev) => ({
                  ...prev,
                  [option.id]: e.target.value,
                }))
              }
              className="bg-white border-sage-light/50 rounded-xl"
            />
          )}

          {option.type === "select" && option.options && (
            <div className="flex flex-wrap gap-2">
              {option.options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() =>
                    setCustomizations((prev) => ({
                      ...prev,
                      [option.id]: opt.value,
                    }))
                  }
                  className={`text-sm px-4 py-2 rounded-xl border transition-colors ${
                    customizations[option.id] === opt.value
                      ? "bg-terracotta text-white border-terracotta"
                      : "bg-white text-walnut border-sage-light/50 hover:border-terracotta/40"
                  }`}
                >
                  {opt.label}
                  {opt.priceModifier
                    ? ` (+${formatPrice(opt.priceModifier)})`
                    : ""}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Quantity */}
      <div>
        <Label className="text-sm font-medium text-walnut mb-1.5 block">
          Quantity
        </Label>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="h-10 w-10 rounded-xl border border-sage-light/50 bg-white text-walnut hover:bg-cream flex items-center justify-center"
          >
            -
          </button>
          <span className="w-12 text-center font-medium">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="h-10 w-10 rounded-xl border border-sage-light/50 bg-white text-walnut hover:bg-cream flex items-center justify-center"
          >
            +
          </button>
        </div>
      </div>

      {/* Price + Add to Cart */}
      <div className="pt-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-walnut-light">Total</span>
          <span className="text-xl font-bold text-terracotta">
            {formatPrice(totalPrice * quantity)}
          </span>
        </div>

        <Button
          onClick={handleAddToCart}
          size="lg"
          className="w-full bg-terracotta hover:bg-terracotta-dark text-white rounded-xl h-12 text-base"
        >
          <ShoppingBag className="mr-2 h-5 w-5" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
}

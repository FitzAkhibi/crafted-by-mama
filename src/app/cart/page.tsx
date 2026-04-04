"use client";

import Link from "next/link";
import Image from "next/image";
import { Trash2, ShoppingBag, ArrowRight, ArrowLeft } from "lucide-react";
import { buttonVariants } from "@/lib/button-variants";
import { cn, formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { FREE_SHIPPING_THRESHOLD, FLAT_SHIPPING_RATE } from "@/lib/constants";

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, clearCart } =
    useCartStore();
  const sub = subtotal();
  const shipping = sub >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING_RATE;
  const total = sub + shipping;

  if (items.length === 0) {
    return (
      <div className="section-padding bg-cream texture-paper">
        <div className="container-narrow mx-auto text-center py-16">
          <ShoppingBag className="h-16 w-16 text-sage-light mx-auto mb-4" />
          <h1 className="font-handwritten text-3xl text-walnut">
            Your cart is empty
          </h1>
          <p className="mt-2 text-walnut-light">
            Looks like you haven&apos;t added any keepsakes yet.
          </p>
          <Link href="/shop" className={cn(buttonVariants(), "mt-6 bg-terracotta hover:bg-terracotta-dark text-white rounded-full")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="section-padding bg-cream texture-paper">
      <div className="container-wide mx-auto">
        <h1 className="font-handwritten text-3xl sm:text-4xl text-walnut mb-8">
          Your Cart
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 bg-white rounded-2xl p-4 shadow-sm"
              >
                {/* Image */}
                <div className="shrink-0 w-24 h-24 rounded-xl overflow-hidden bg-cream-dark">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={96}
                    height={96}
                    className="object-cover w-full h-full"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/shop/${item.slug}`}
                    className="font-medium text-walnut hover:text-terracotta text-sm sm:text-base transition-colors"
                  >
                    {item.name}
                  </Link>

                  {/* Customizations */}
                  {item.customizations && (
                    <div className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5">
                      {Object.entries(item.customizations).map(([key, val]) => (
                        <span
                          key={key}
                          className="text-xs text-walnut-light capitalize"
                        >
                          {key.replace(/_/g, " ")}: {val}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-2 flex items-center justify-between">
                    {/* Quantity */}
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="h-7 w-7 rounded-lg border border-sage-light/50 bg-cream text-walnut text-sm flex items-center justify-center"
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-sm font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="h-7 w-7 rounded-lg border border-sage-light/50 bg-cream text-walnut text-sm flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-terracotta text-sm">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1 text-walnut-light hover:text-destructive transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex gap-3 pt-2">
              <Link
                href="/shop"
                className="text-sm text-walnut-light hover:text-terracotta transition-colors flex items-center gap-1"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
              <h2 className="font-semibold text-walnut text-lg mb-4">
                Order Summary
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-walnut-light">
                  <span>Subtotal</span>
                  <span>{formatPrice(sub)}</span>
                </div>
                <div className="flex justify-between text-walnut-light">
                  <span>Shipping</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-sage-dark">Free</span>
                    ) : (
                      formatPrice(shipping)
                    )}
                  </span>
                </div>
                {sub < FREE_SHIPPING_THRESHOLD && (
                  <p className="text-xs text-sage-dark bg-sage-light/20 rounded-lg px-3 py-2">
                    Add {formatPrice(FREE_SHIPPING_THRESHOLD - sub)} more for
                    free shipping!
                  </p>
                )}
                <div className="border-t border-sage-light/30 pt-3 flex justify-between font-semibold text-walnut">
                  <span>Total</span>
                  <span className="text-terracotta">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>

              <Link href="/checkout" className={cn(buttonVariants({ size: "lg" }), "w-full mt-6 bg-terracotta hover:bg-terracotta-dark text-white rounded-xl h-12")}>
                  Proceed to Checkout
                  <ArrowRight className="ml-2 h-4 w-4" />
              </Link>

              <p className="mt-3 text-xs text-walnut-light text-center">
                Secure checkout powered by Stripe
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

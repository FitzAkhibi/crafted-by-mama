"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useCartStore } from "@/store/cart-store";

export default function CheckoutPage() {
  const { items, subtotal } = useCartStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function redirectToStripe() {
      if (items.length === 0) {
        window.location.href = "/cart";
        return;
      }

      try {
        const res = await fetch("/api/stripe/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: items.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
              customizations: item.customizations,
            })),
          }),
        });

        const data = await res.json();

        if (data.url) {
          window.location.href = data.url;
        } else {
          setError(data.error || "Failed to start checkout");
          setLoading(false);
        }
      } catch {
        setError("Something went wrong. Please try again.");
        setLoading(false);
      }
    }

    redirectToStripe();
  }, [items]);

  if (error) {
    return (
      <div className="section-padding bg-cream texture-paper">
        <div className="container-narrow mx-auto text-center py-16">
          <h1 className="font-handwritten text-3xl text-walnut">
            Checkout Error
          </h1>
          <p className="mt-3 text-walnut-light">{error}</p>
          <p className="mt-2 text-sm text-walnut-light">
            Stripe may not be configured yet. Please check your environment
            variables.
          </p>
          <a
            href="/cart"
            className="mt-4 inline-block text-terracotta hover:text-terracotta-dark font-medium"
          >
            &larr; Back to Cart
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="section-padding bg-cream texture-paper">
      <div className="container-narrow mx-auto text-center py-16">
        <Loader2 className="h-8 w-8 text-terracotta animate-spin mx-auto mb-4" />
        <h1 className="font-handwritten text-3xl text-walnut">
          Redirecting to checkout...
        </h1>
        <p className="mt-2 text-walnut-light">
          You&apos;ll be redirected to our secure payment page in a moment.
        </p>
      </div>
    </div>
  );
}

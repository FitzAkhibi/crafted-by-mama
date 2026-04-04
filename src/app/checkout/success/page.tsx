import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { buttonVariants } from "@/lib/button-variants";
import { cn } from "@/lib/utils";

export default function CheckoutSuccessPage() {
  return (
    <div className="section-padding bg-cream texture-paper">
      <div className="container-narrow mx-auto text-center py-12">
        <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-sage-light/30 mb-6">
          <CheckCircle className="h-10 w-10 text-sage-dark" />
        </div>

        <h1 className="font-handwritten text-4xl sm:text-5xl text-walnut">
          Thank You!
        </h1>

        <p className="mt-4 text-lg text-walnut-light max-w-md mx-auto">
          Your order has been placed. We&apos;ll start crafting your piece
          right away and send you a confirmation email shortly.
        </p>

        <div className="mt-6 bg-white rounded-2xl p-6 shadow-sm max-w-sm mx-auto text-left">
          <h2 className="font-semibold text-walnut text-sm mb-3">
            What happens next?
          </h2>
          <ol className="space-y-2 text-sm text-walnut-light">
            <li className="flex gap-2">
              <span className="text-terracotta font-bold">1.</span>
              You&apos;ll receive an order confirmation email
            </li>
            <li className="flex gap-2">
              <span className="text-terracotta font-bold">2.</span>
              We begin handcrafting your piece (7-14 business days)
            </li>
            <li className="flex gap-2">
              <span className="text-terracotta font-bold">3.</span>
              You&apos;ll receive a shipping notification with tracking
            </li>
            <li className="flex gap-2">
              <span className="text-terracotta font-bold">4.</span>
              Your keepsake arrives, wrapped with love
            </li>
          </ol>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/shop" className={cn(buttonVariants(), "bg-terracotta hover:bg-terracotta-dark text-white rounded-full")}>
            Continue Shopping
          </Link>
          <Link href="/" className={cn(buttonVariants({ variant: "outline" }), "border-sage rounded-full")}>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

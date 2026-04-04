import Link from "next/link";
import { ArrowRight, Package, Play, Scissors } from "lucide-react";
import { buttonVariants } from "@/lib/button-variants";
import { cn } from "@/lib/utils";

const steps = [
  {
    icon: Package,
    title: "Unbox Your Kit",
    description: "Premium fabrics, threads, needles, and a printed pattern — everything you need, delivered monthly.",
  },
  {
    icon: Play,
    title: "Follow Along",
    description: "Scan the QR code for a step-by-step video tutorial. No experience needed.",
  },
  {
    icon: Scissors,
    title: "Craft Together",
    description: "Create a beautiful keepsake alongside your little one. Screen-free, hands-on, heart-full.",
  },
];

export function SubscriptionPreview() {
  return (
    <section className="bg-sage/10 section-padding">
      <div className="container-wide mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: content */}
          <div>
            <span className="text-sm font-semibold text-sage-dark uppercase tracking-wider">
              Monthly Subscription
            </span>
            <h2 className="font-handwritten text-3xl sm:text-4xl lg:text-5xl text-walnut mt-2">
              Your crafting adventure, delivered
            </h2>
            <p className="mt-4 text-walnut-light text-base sm:text-lg leading-relaxed">
              Each month, receive a curated kit with everything you need to
              create a beautiful, heirloom-quality piece. No trips to the craft
              store. No guessing. Just sit down and create.
            </p>

            <div className="mt-8 space-y-6">
              {steps.map((step, i) => (
                <div key={step.title} className="flex gap-4">
                  <div className="shrink-0 flex items-center justify-center h-10 w-10 rounded-xl bg-sage-light/50">
                    <step.icon className="h-5 w-5 text-sage-dark" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-walnut text-sm">
                      {i + 1}. {step.title}
                    </h3>
                    <p className="mt-0.5 text-sm text-walnut-light leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-4">
              <Link href="/subscription" className={cn(buttonVariants({ size: "lg" }), "bg-terracotta hover:bg-terracotta-dark text-white rounded-full px-8")}>
                  Subscribe — $27.95/mo
                  <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <span className="text-sm text-walnut-light">Cancel anytime</span>
            </div>
          </div>

          {/* Right: visual placeholder */}
          <div className="relative">
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-sage-light via-cream to-blush overflow-hidden shadow-lg">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <Package className="h-16 w-16 text-sage-dark/40 mx-auto mb-4" />
                  <p className="font-handwritten text-xl text-walnut/50">
                    Kit unboxing photo
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

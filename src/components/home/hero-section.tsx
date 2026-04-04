import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";
import { buttonVariants } from "@/lib/button-variants";
import { cn } from "@/lib/utils";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-cream texture-paper">
      <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Copy */}
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 bg-blush/50 text-terracotta-dark text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              <Heart className="h-3.5 w-3.5 fill-terracotta-light" />
              Handmade with love
            </div>

            <h1 className="font-handwritten text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-walnut leading-tight">
              Slow down. Create. Connect.
            </h1>

            <p className="mt-5 text-lg sm:text-xl text-walnut-light leading-relaxed">
              Handcrafted keepsakes and guided crafting experiences for moms who
              want to create something beautiful with their little ones. Every
              stitch tells a story.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link href="/shop" className={cn(buttonVariants({ size: "lg" }), "bg-terracotta hover:bg-terracotta-dark text-white rounded-full px-8 text-base h-12")}>
                  Shop Now
                  <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link href="/subscription" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "border-sage hover:bg-sage-light/30 text-walnut rounded-full px-8 text-base h-12")}>
                Start Your Subscription
              </Link>
            </div>

            {/* Social proof */}
            <div className="mt-10 flex items-center gap-6 text-sm text-walnut-light">
              <div className="flex items-center gap-1.5">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-7 w-7 rounded-full bg-sage-light border-2 border-cream"
                    />
                  ))}
                </div>
                <span className="ml-1">200+ happy mamas</span>
              </div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg
                    key={i}
                    className="h-4 w-4 text-terracotta fill-terracotta"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-1">5.0 rating</span>
              </div>
            </div>
          </div>

          {/* Right: Image placeholder */}
          <div className="relative">
            <div className="aspect-[4/5] rounded-3xl bg-gradient-to-br from-blush via-sage-light to-cream-dark overflow-hidden shadow-lg">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="h-24 w-24 mx-auto rounded-full bg-white/50 flex items-center justify-center mb-4">
                    <Heart className="h-10 w-10 text-terracotta" />
                  </div>
                  <p className="font-handwritten text-2xl text-walnut/60">
                    Hero image here
                  </p>
                  <p className="text-sm text-walnut/40 mt-2">
                    Lifestyle photo of mom crafting with child
                  </p>
                </div>
              </div>
            </div>

            {/* Decorative blob */}
            <div className="absolute -bottom-6 -left-6 h-24 w-24 bg-sage-light/40 rounded-full blur-2xl" />
            <div className="absolute -top-4 -right-4 h-16 w-16 bg-blush/50 rounded-full blur-xl" />
          </div>
        </div>
      </div>
    </section>
  );
}

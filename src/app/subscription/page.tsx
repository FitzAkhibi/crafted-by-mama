import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Package, Play, Scissors, Star, Gift, Clock } from "lucide-react";
import { buttonVariants } from "@/lib/button-variants";
import { cn } from "@/lib/utils";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "Monthly Craft Kit Subscription",
  description:
    "Receive a curated crafting experience every month. Premium materials, step-by-step tutorials, and quality time with your little one — delivered to your door.",
};

const steps = [
  {
    icon: Package,
    title: "Unbox Your Kit",
    description:
      "Premium fabrics, threads, needles, embellishments, and a printed pattern. Everything you need, nothing you don't.",
  },
  {
    icon: Play,
    title: "Follow the Tutorial",
    description:
      "Scan the QR code for a full video walkthrough. Designed for beginners — if you can thread a needle, you can do this.",
  },
  {
    icon: Scissors,
    title: "Craft Your Keepsake",
    description:
      "Spend 1-2 hours creating something beautiful. Screen-free, hands-on, and entirely yours to keep forever.",
  },
];

const included = [
  "Premium fabric (linen, cotton, or muslin)",
  "Embroidery thread in curated colors",
  "Needles and any specialty tools",
  "Printed pattern guide with full instructions",
  "QR code to step-by-step video tutorial",
  "Finishing materials (hoop, rod, or frame)",
];

const faqs = [
  {
    q: "What skill level do I need?",
    a: "Complete beginner! Our tutorials are designed for people who have never picked up a needle. We walk you through every single step.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Absolutely. No contracts, no commitment. Cancel anytime from your account or by emailing us. Your cancellation takes effect at the end of your current billing period.",
  },
  {
    q: "When do kits ship?",
    a: "Kits ship on the 1st of each month. If you subscribe after the 1st, your first kit will ship at the beginning of the following month.",
  },
  {
    q: "Can I gift a subscription?",
    a: "Yes! Gift subscriptions are available for 3, 6, or 12 months. The recipient will receive a beautifully designed gift card with their first kit.",
  },
  {
    q: "What if I get stuck on a project?",
    a: "Our video tutorials cover every step in detail. If you still need help, reach out to us on Instagram or email — we're always happy to help!",
  },
];

export default function SubscriptionPage() {
  return (
    <div className="bg-cream">
      {/* Hero */}
      <section className="section-padding bg-sage/10 texture-paper">
        <div className="container-narrow mx-auto text-center">
          <span className="inline-block text-sm font-semibold text-sage-dark uppercase tracking-wider mb-3">
            Monthly Subscription
          </span>
          <h1 className="font-handwritten text-4xl sm:text-5xl lg:text-6xl text-walnut">
            Your Crafting Adventure, Delivered
          </h1>
          <p className="mt-5 text-lg text-walnut-light max-w-xl mx-auto leading-relaxed">
            A curated crafting experience delivered to your door every month.
            Everything you need to create a beautiful, heirloom-quality
            keepsake.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="section-padding bg-white">
        <div className="container-wide mx-auto">
          <h2 className="font-handwritten text-3xl sm:text-4xl text-walnut text-center mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={step.title} className="text-center">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-sage-light/30 mb-4">
                  <step.icon className="h-7 w-7 text-sage-dark" />
                </div>
                <div className="text-sm font-bold text-terracotta mb-1">
                  Step {i + 1}
                </div>
                <h3 className="font-semibold text-walnut text-lg">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-walnut-light leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="section-padding bg-cream texture-paper">
        <div className="container-wide mx-auto">
          <h2 className="font-handwritten text-3xl sm:text-4xl text-walnut text-center mb-12">
            Choose Your Plan
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Standard */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-sage-light/30">
              <h3 className="font-semibold text-walnut text-lg">
                Monthly Kit
              </h3>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-terracotta">
                  $27.95
                </span>
                <span className="text-walnut-light">/month</span>
              </div>
              <ul className="mt-6 space-y-3">
                {included.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-walnut-light"
                  >
                    <span className="text-sage-dark mt-0.5 shrink-0">
                      &#10003;
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/checkout?plan=monthly" className={cn(buttonVariants({ size: "lg" }), "w-full mt-8 bg-terracotta hover:bg-terracotta-dark text-white rounded-xl h-12")}>
                  Subscribe Now
                  <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <p className="mt-3 text-xs text-walnut-light text-center">
                Cancel anytime. Free shipping included.
              </p>
            </div>

            {/* Premium */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border-2 border-terracotta relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-terracotta text-white text-xs font-bold px-4 py-1 rounded-full">
                BEST VALUE
              </div>
              <h3 className="font-semibold text-walnut text-lg">
                Premium Kit
              </h3>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-terracotta">
                  $39.95
                </span>
                <span className="text-walnut-light">/month</span>
              </div>
              <ul className="mt-6 space-y-3">
                {[
                  ...included,
                  "Bonus: surprise embellishment or accessory",
                  "Early access to new products",
                  "Members-only tutorial library",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-walnut-light"
                  >
                    <span className="text-sage-dark mt-0.5 shrink-0">
                      &#10003;
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/checkout?plan=premium" className={cn(buttonVariants({ size: "lg" }), "w-full mt-8 bg-terracotta hover:bg-terracotta-dark text-white rounded-xl h-12")}>
                  Subscribe Premium
                  <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <p className="mt-3 text-xs text-walnut-light text-center">
                Cancel anytime. Free shipping included.
              </p>
            </div>
          </div>

          {/* Gift option callout */}
          <div className="mt-12 max-w-xl mx-auto bg-blush/30 rounded-2xl p-6 text-center">
            <Gift className="h-8 w-8 text-terracotta mx-auto mb-2" />
            <h3 className="font-semibold text-walnut">
              Give the Gift of Crafting
            </h3>
            <p className="mt-1 text-sm text-walnut-light">
              Gift subscriptions available for 3, 6, or 12 months. Includes
              a beautifully designed gift card.
            </p>
            <Link
              href="/contact"
              className="inline-block mt-3 text-sm text-terracotta hover:text-terracotta-dark font-medium"
            >
              Contact us to order a gift &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-white">
        <div className="container-narrow mx-auto">
          <h2 className="font-handwritten text-3xl sm:text-4xl text-walnut text-center mb-10">
            Questions?
          </h2>
          <Accordion className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="bg-cream rounded-xl border border-sage-light/30 px-5"
              >
                <AccordionTrigger className="text-left font-medium text-walnut py-4 hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-walnut-light leading-relaxed pb-4">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
}

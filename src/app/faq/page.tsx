import type { Metadata } from "next";
import Link from "next/link";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqData } from "@/data/faq";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about Crafted By Mama — ordering, shipping, subscriptions, custom orders, and care instructions.",
};

export default function FaqPage() {
  // Build JSON-LD for FAQ rich results
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.flatMap((cat) =>
      cat.items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      }))
    ),
  };

  return (
    <div className="section-padding bg-cream texture-paper">
      <div className="container-narrow mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-handwritten text-4xl sm:text-5xl text-walnut">
            Frequently Asked Questions
          </h1>
          <p className="mt-3 text-walnut-light text-lg">
            Can&apos;t find what you&apos;re looking for?{" "}
            <Link
              href="/contact"
              className="text-terracotta hover:text-terracotta-dark transition-colors"
            >
              Get in touch
            </Link>
          </p>
        </div>

        <div className="space-y-8">
          {faqData.map((category) => (
            <div key={category.category}>
              <h2 className="font-semibold text-walnut text-lg mb-3">
                {category.category}
              </h2>
              <Accordion className="space-y-2">
                {category.items.map((item, i) => (
                  <AccordionItem
                    key={i}
                    value={`${category.category}-${i}`}
                    className="bg-white rounded-xl border border-sage-light/30 px-5"
                  >
                    <AccordionTrigger className="text-left font-medium text-walnut py-4 hover:no-underline text-sm sm:text-base">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-walnut-light text-sm leading-relaxed pb-4">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center bg-blush/30 rounded-2xl p-6">
          <h3 className="font-semibold text-walnut">Still have questions?</h3>
          <p className="mt-1 text-sm text-walnut-light">
            We&apos;d love to help. Reach out anytime.
          </p>
          <Link
            href="/contact"
            className="inline-block mt-3 text-sm text-terracotta hover:text-terracotta-dark font-medium"
          >
            Contact Us &rarr;
          </Link>
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </div>
    </div>
  );
}

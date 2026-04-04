"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { testimonials } from "@/data/testimonials";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const [current, setCurrent] = useState(0);

  const prev = () =>
    setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () =>
    setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  const t = testimonials[current];

  return (
    <section className="bg-white section-padding">
      <div className="container-narrow mx-auto text-center">
        <SectionHeading
          title="What Mamas Are Saying"
          subtitle="Real stories from our community"
        />

        <div className="relative max-w-2xl mx-auto">
          {/* Quote */}
          <div className="min-h-[160px] flex flex-col items-center justify-center">
            <div className="flex items-center gap-1 mb-4">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 text-terracotta fill-terracotta"
                />
              ))}
            </div>
            <blockquote className="text-base sm:text-lg text-walnut leading-relaxed italic">
              &ldquo;{t.text}&rdquo;
            </blockquote>
            <div className="mt-4">
              <p className="font-semibold text-walnut text-sm">{t.name}</p>
              <p className="text-xs text-walnut-light">{t.product}</p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prev}
              className="p-2 rounded-full border border-sage-light hover:bg-sage-light/30 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-4 w-4 text-walnut" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    i === current
                      ? "w-6 bg-terracotta"
                      : "w-2 bg-sage-light hover:bg-sage"
                  )}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="p-2 rounded-full border border-sage-light hover:bg-sage-light/30 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-4 w-4 text-walnut" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

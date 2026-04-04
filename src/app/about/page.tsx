import type { Metadata } from "next";
import { Heart, Sparkles, Users, Leaf } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet the mama behind Crafted By Mama. Learn about our story, our mission, and why every stitch matters.",
};

const values = [
  {
    icon: Heart,
    title: "Made with Love",
    text: "Every piece is crafted by hand, with intention and care. There are no shortcuts — just time, skill, and a whole lot of heart.",
  },
  {
    icon: Sparkles,
    title: "Celebrate the Little Moments",
    text: "Childhood is fleeting. Our products help you slow down, be present, and create something that captures this beautiful, messy, magical season.",
  },
  {
    icon: Users,
    title: "Community Over Competition",
    text: "We believe in lifting each other up. Every mama who crafts, creates, or supports another mama is part of this story.",
  },
  {
    icon: Leaf,
    title: "Thoughtful Materials",
    text: "We source eco-friendly, non-toxic materials whenever possible. What touches your baby matters to us too.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-cream">
      {/* Hero */}
      <section className="section-padding bg-sage/10">
        <div className="container-narrow mx-auto text-center">
          <h1 className="font-handwritten text-4xl sm:text-5xl lg:text-6xl text-walnut">
            Hi, I&apos;m the Mama Behind the Brand
          </h1>
          <p className="mt-6 text-lg text-walnut-light leading-relaxed max-w-2xl mx-auto">
            Crafted By Mama started at a tiny kitchen table, with a sleeping
            baby in one arm and a needle in the other. What began as a way to
            slow down during the chaos of new motherhood became something much
            bigger — a community of mamas creating keepsakes that last a
            lifetime.
          </p>
        </div>
      </section>

      {/* Photo + Story */}
      <section className="section-padding">
        <div className="container-wide mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Photo placeholder */}
            <div className="aspect-[3/4] rounded-3xl bg-gradient-to-br from-blush via-cream-dark to-sage-light overflow-hidden shadow-md">
              <div className="h-full flex items-center justify-center">
                <div className="text-center p-8">
                  <Heart className="h-16 w-16 text-terracotta/30 mx-auto mb-3" />
                  <p className="font-handwritten text-xl text-walnut/40">
                    Maker portrait here
                  </p>
                </div>
              </div>
            </div>

            {/* Story */}
            <div>
              <h2 className="font-handwritten text-3xl text-walnut mb-4">
                My Story
              </h2>
              <div className="space-y-4 text-walnut-light leading-relaxed">
                <p>
                  I&apos;ve always been a maker. As a child, I learned to sew
                  from my grandmother. As a teacher, I discovered the power of
                  creating something with your hands — how it calms the mind,
                  builds confidence, and connects people.
                </p>
                <p>
                  When I became a mama, crafting became my anchor. During late
                  night feeds and long nap-trapped afternoons, I started
                  embroidering my daughter&apos;s name. Then her birth stats.
                  Then little affirmations for her room. Each piece felt like a
                  love letter stitched in thread.
                </p>
                <p>
                  Friends and family started asking me to make pieces for them.
                  Then their friends asked. And I realized: this wasn&apos;t
                  just about beautiful objects. It was about the act of creation
                  itself — the slowing down, the intentionality, the choosing to
                  make something with your hands for someone you love.
                </p>
                <p>
                  That&apos;s what Crafted By Mama is. Whether you&apos;re
                  buying a personalized keepsake or sitting down with one of our
                  monthly kits, you&apos;re choosing presence over perfection.
                  You&apos;re choosing to create something that matters.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-white">
        <div className="container-wide mx-auto">
          <h2 className="font-handwritten text-3xl sm:text-4xl text-walnut text-center mb-12">
            What We Believe
          </h2>
          <div className="grid sm:grid-cols-2 gap-8">
            {values.map((v) => (
              <div key={v.title} className="flex gap-4">
                <div className="shrink-0 h-12 w-12 rounded-2xl bg-sage-light/30 flex items-center justify-center">
                  <v.icon className="h-5 w-5 text-sage-dark" />
                </div>
                <div>
                  <h3 className="font-semibold text-walnut">{v.title}</h3>
                  <p className="mt-1 text-sm text-walnut-light leading-relaxed">
                    {v.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

import { Heart, Leaf, Sparkles, HandHeart } from "lucide-react";

const values = [
  {
    icon: HandHeart,
    title: "100% Handmade",
    description: "Every piece is crafted by hand with care and attention to detail",
  },
  {
    icon: Leaf,
    title: "Eco-Friendly",
    description: "Sustainably sourced materials that are safe for little ones",
  },
  {
    icon: Sparkles,
    title: "Personalized",
    description: "Custom-made pieces featuring your child's name and story",
  },
  {
    icon: Heart,
    title: "Made with Love",
    description: "From one mama to another, poured with heart into every stitch",
  },
];

export function BrandValues() {
  return (
    <section className="bg-white section-padding">
      <div className="container-wide mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {values.map((value) => (
            <div
              key={value.title}
              className="text-center p-6 rounded-2xl hover:bg-cream/50 transition-colors"
            >
              <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-sage-light/30 mb-4">
                <value.icon className="h-6 w-6 text-sage-dark" />
              </div>
              <h3 className="font-semibold text-walnut text-sm sm:text-base">
                {value.title}
              </h3>
              <p className="mt-1.5 text-xs sm:text-sm text-walnut-light leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { SectionHeading } from "@/components/shared/section-heading";
import { SITE_CONFIG } from "@/lib/constants";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

const placeholderColors = [
  "from-blush to-sage-light",
  "from-sage-light to-cream-dark",
  "from-terracotta-light/30 to-blush",
  "from-cream-dark to-sage-light",
  "from-blush to-terracotta-light/30",
  "from-sage-light to-blush",
];

export function InstagramFeed() {
  return (
    <section className="section-padding bg-cream">
      <div className="container-wide mx-auto">
        <SectionHeading
          title="Follow Along"
          subtitle="Join our community on Instagram for daily inspiration"
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {placeholderColors.map((color, i) => (
            <a
              key={i}
              href={SITE_CONFIG.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-xl overflow-hidden"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${color}`}
              />
              <div className="absolute inset-0 bg-walnut/0 group-hover:bg-walnut/30 transition-colors flex items-center justify-center">
                <InstagramIcon className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </a>
          ))}
        </div>

        <div className="mt-6 text-center">
          <a
            href={SITE_CONFIG.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-terracotta hover:text-terracotta-dark font-medium text-sm transition-colors"
          >
            <InstagramIcon className="h-4 w-4" />
            @craftedbymama
          </a>
        </div>
      </div>
    </section>
  );
}

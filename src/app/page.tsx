import { HeroSection } from "@/components/home/hero-section";
import { BrandValues } from "@/components/home/brand-values";
import { FeaturedProducts } from "@/components/home/featured-products";
import { SubscriptionPreview } from "@/components/home/subscription-preview";
import { Testimonials } from "@/components/home/testimonials";
import { InstagramFeed } from "@/components/home/instagram-feed";
import { NewsletterSection } from "@/components/home/newsletter-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <BrandValues />
      <FeaturedProducts />
      <SubscriptionPreview />
      <Testimonials />
      <InstagramFeed />
      <NewsletterSection />
    </>
  );
}

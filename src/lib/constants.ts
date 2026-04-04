export const SITE_CONFIG = {
  name: "Crafted By Mama",
  tagline: "Handmade with love, crafted for keeps",
  description:
    "Handcrafted, personalized keepsakes and guided crafting experiences for moms who want to slow down, create, and connect with their little ones.",
  url: "https://craftedbymama.com",
  email: "hello@craftedbymama.com",
  social: {
    instagram: "https://instagram.com/craftedbymama",
    tiktok: "https://tiktok.com/@craftedbymama",
    youtube: "https://youtube.com/@craftedbymama",
    pinterest: "https://pinterest.com/craftedbymama",
  },
} as const;

export const NAV_LINKS = [
  { label: "Shop", href: "/shop" },
  { label: "Subscription", href: "/subscription" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

export const FOOTER_LINKS = {
  shop: [
    { label: "All Products", href: "/shop" },
    { label: "Craft Kits", href: "/shop?category=craft-kits" },
    { label: "Embroidered Hoops", href: "/shop?category=hoops" },
    { label: "Baby Blankets", href: "/shop?category=blankets" },
    { label: "Custom Sweaters", href: "/shop?category=sweaters" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Shipping Policy", href: "/shipping" },
    { label: "Returns & Refunds", href: "/returns" },
  ],
} as const;

export const PRODUCT_CATEGORIES = [
  { value: "all", label: "All Products" },
  { value: "craft-kits", label: "Craft Kits" },
  { value: "hoops", label: "Embroidered Hoops" },
  { value: "blankets", label: "Baby Blankets" },
  { value: "sweaters", label: "Custom Sweaters" },
  { value: "banners", label: "Banners" },
  { value: "custom", label: "Custom Orders" },
] as const;

export const FREE_SHIPPING_THRESHOLD = 7500; // $75.00 in cents
export const FLAT_SHIPPING_RATE = 599; // $5.99 in cents

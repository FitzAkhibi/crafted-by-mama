import type { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: "prod_001",
    name: "Monthly Craft Kit Subscription",
    slug: "monthly-craft-kit",
    description:
      "Each month, receive a curated crafting experience delivered to your door. Every kit includes premium fabrics, threads, needles, a printed pattern guide, and a QR code linking to a step-by-step video tutorial. No prior experience needed — just sit down with your little one and create something beautiful together.",
    shortDescription:
      "A guided crafting experience delivered monthly. Everything included.",
    category: "craft-kits",
    basePrice: 2795,
    images: ["/images/products/craft-kit-1.jpg"],
    featured: true,
    active: true,
    customizable: false,
    metadata: { type: "subscription", interval: "month" },
    createdAt: "2026-04-01",
    updatedAt: "2026-04-01",
  },
  {
    id: "prod_002",
    name: "Personalized Name Hoop",
    slug: "personalized-name-hoop",
    description:
      "A beautiful hand-embroidered hoop featuring your child's name in elegant calligraphy, surrounded by delicate floral accents. Each piece is crafted on premium linen fabric and finished in a natural bamboo hoop. Perfect for nursery decor or as a one-of-a-kind baby shower gift.",
    shortDescription: "Hand-embroidered name in a bamboo hoop.",
    category: "hoops",
    basePrice: 3500,
    images: ["/images/products/name-hoop-1.jpg"],
    featured: true,
    active: true,
    customizable: true,
    customizationOptions: [
      {
        id: "child_name",
        label: "Child's Name",
        type: "text",
        required: true,
        placeholder: "Enter name (max 12 characters)",
        maxLength: 12,
      },
      {
        id: "hoop_size",
        label: "Hoop Size",
        type: "select",
        required: true,
        options: [
          { value: "6inch", label: '6" Small', priceModifier: 0 },
          { value: "8inch", label: '8" Medium', priceModifier: 500 },
          { value: "10inch", label: '10" Large', priceModifier: 1000 },
        ],
      },
      {
        id: "thread_color",
        label: "Thread Color",
        type: "select",
        required: true,
        options: [
          { value: "sage", label: "Sage Green" },
          { value: "blush", label: "Blush Pink" },
          { value: "terracotta", label: "Terracotta" },
          { value: "walnut", label: "Walnut Brown" },
          { value: "cream", label: "Natural Cream" },
        ],
      },
    ],
    createdAt: "2026-04-01",
    updatedAt: "2026-04-01",
  },
  {
    id: "prod_003",
    name: "Embroidered Baby Blanket",
    slug: "embroidered-baby-blanket",
    description:
      "Wrap your little one in love with a luxuriously soft muslin blanket featuring their name in hand-embroidered calligraphy. Made from 100% organic cotton muslin, each blanket is pre-washed for extra softness. A timeless keepsake that grows with your child.",
    shortDescription: "Organic cotton blanket with hand-embroidered name.",
    category: "blankets",
    basePrice: 4500,
    images: ["/images/products/baby-blanket-1.jpg"],
    featured: true,
    active: true,
    customizable: true,
    customizationOptions: [
      {
        id: "child_name",
        label: "Child's Name",
        type: "text",
        required: true,
        placeholder: "Enter name (max 15 characters)",
        maxLength: 15,
      },
      {
        id: "blanket_color",
        label: "Blanket Color",
        type: "select",
        required: true,
        options: [
          { value: "cream", label: "Natural Cream" },
          { value: "blush", label: "Blush Pink" },
          { value: "sage", label: "Sage Green" },
          { value: "sky", label: "Sky Blue" },
        ],
      },
      {
        id: "thread_color",
        label: "Embroidery Color",
        type: "select",
        required: true,
        options: [
          { value: "terracotta", label: "Terracotta" },
          { value: "sage-dark", label: "Deep Sage" },
          { value: "walnut", label: "Walnut Brown" },
          { value: "blush-dark", label: "Dusty Rose" },
        ],
      },
    ],
    createdAt: "2026-04-01",
    updatedAt: "2026-04-01",
  },
  {
    id: "prod_004",
    name: "Birth Stats Embroidered Hoop",
    slug: "birth-stats-hoop",
    description:
      "Celebrate your baby's arrival with a keepsake hoop featuring their name, date of birth, weight, and length — all hand-embroidered with care. A meaningful gift for new parents or a treasured piece for the nursery wall.",
    shortDescription: "Name, DOB, weight & length in an embroidered hoop.",
    category: "hoops",
    basePrice: 4200,
    images: ["/images/products/birth-stats-hoop-1.jpg"],
    featured: false,
    active: true,
    customizable: true,
    customizationOptions: [
      {
        id: "child_name",
        label: "Baby's Name",
        type: "text",
        required: true,
        placeholder: "Enter name",
        maxLength: 15,
      },
      {
        id: "birth_date",
        label: "Date of Birth",
        type: "text",
        required: true,
        placeholder: "e.g., March 15, 2026",
      },
      {
        id: "weight",
        label: "Birth Weight",
        type: "text",
        required: true,
        placeholder: "e.g., 7 lbs 4 oz",
      },
      {
        id: "length",
        label: "Birth Length",
        type: "text",
        required: true,
        placeholder: "e.g., 20 inches",
      },
    ],
    createdAt: "2026-04-01",
    updatedAt: "2026-04-01",
  },
  {
    id: "prod_005",
    name: "Reverse Applique Name Sweater",
    slug: "reverse-applique-sweater",
    description:
      "A cozy, handcrafted sweater featuring your child's name (or MAMA, DADA, AUNTIE, etc.) in reverse applique on premium cotton. Each letter is carefully cut and stitched by hand, creating a textured, tactile design that's as fun to touch as it is to wear.",
    shortDescription:
      "Handmade sweater with reverse applique lettering.",
    category: "sweaters",
    basePrice: 5500,
    images: ["/images/products/sweater-1.jpg"],
    featured: false,
    active: true,
    customizable: true,
    customizationOptions: [
      {
        id: "text",
        label: "Sweater Text",
        type: "text",
        required: true,
        placeholder: "e.g., EMMA, MAMA, DADA",
        maxLength: 10,
      },
      {
        id: "size",
        label: "Size",
        type: "select",
        required: true,
        options: [
          { value: "6-12m", label: "6-12 Months" },
          { value: "12-18m", label: "12-18 Months" },
          { value: "18-24m", label: "18-24 Months" },
          { value: "2-3y", label: "2-3 Years" },
          { value: "3-4y", label: "3-4 Years" },
          { value: "adult-s", label: "Adult S", priceModifier: 1500 },
          { value: "adult-m", label: "Adult M", priceModifier: 1500 },
          { value: "adult-l", label: "Adult L", priceModifier: 1500 },
        ],
      },
      {
        id: "sweater_color",
        label: "Sweater Color",
        type: "select",
        required: true,
        options: [
          { value: "cream", label: "Cream" },
          { value: "sage", label: "Sage" },
          { value: "terracotta", label: "Terracotta" },
          { value: "oatmeal", label: "Oatmeal" },
        ],
      },
    ],
    createdAt: "2026-04-01",
    updatedAt: "2026-04-01",
  },
  {
    id: "prod_006",
    name: "Embroidered Affirmation Banner",
    slug: "affirmation-banner",
    description:
      "Beautiful hand-embroidered affirmation banners on natural linen fabric, hung with a wooden rod. Choose from uplifting phrases or customize with your own. Perfect for a child's room, playroom, or anywhere that needs a reminder of how loved they are.",
    shortDescription: "Hand-embroidered affirmation on linen with wooden rod.",
    category: "banners",
    basePrice: 2800,
    images: ["/images/products/banner-1.jpg"],
    featured: false,
    active: true,
    customizable: true,
    customizationOptions: [
      {
        id: "phrase",
        label: "Phrase",
        type: "select",
        required: true,
        options: [
          { value: "you-are-loved", label: "You Are So Loved" },
          { value: "be-kind", label: "Be Kind, Be Brave, Be You" },
          { value: "dream-big", label: "Dream Big Little One" },
          { value: "sunshine", label: "You Are My Sunshine" },
          { value: "custom", label: "Custom Phrase", priceModifier: 500 },
        ],
      },
      {
        id: "custom_phrase",
        label: "Custom Phrase (if selected above)",
        type: "text",
        required: false,
        placeholder: "Enter your custom phrase",
        maxLength: 40,
      },
      {
        id: "size",
        label: "Size",
        type: "select",
        required: true,
        options: [
          { value: "small", label: '8" x 10"' },
          { value: "medium", label: '12" x 18"', priceModifier: 700 },
          { value: "large", label: '16" x 24"', priceModifier: 1400 },
        ],
      },
    ],
    createdAt: "2026-04-01",
    updatedAt: "2026-04-01",
  },
  {
    id: "prod_007",
    name: "Handprint & Footprint Keepsake Hoop",
    slug: "handprint-footprint-hoop",
    description:
      "Preserve your baby's tiny handprint or footprint forever with this hand-embroidered keepsake hoop. Send us a photo or ink print, and we'll carefully recreate it in thread alongside your child's name. A truly personal piece that captures a fleeting moment in time.",
    shortDescription: "Your baby's actual handprint or footprint, embroidered.",
    category: "hoops",
    basePrice: 4800,
    images: ["/images/products/handprint-hoop-1.jpg"],
    featured: false,
    active: true,
    customizable: true,
    customizationOptions: [
      {
        id: "child_name",
        label: "Child's Name",
        type: "text",
        required: true,
        placeholder: "Enter name",
        maxLength: 15,
      },
      {
        id: "print_type",
        label: "Print Type",
        type: "select",
        required: true,
        options: [
          { value: "handprint", label: "Handprint" },
          { value: "footprint", label: "Footprint" },
        ],
      },
    ],
    createdAt: "2026-04-01",
    updatedAt: "2026-04-01",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === "all") return products.filter((p) => p.active);
  return products.filter((p) => p.category === category && p.active);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured && p.active);
}

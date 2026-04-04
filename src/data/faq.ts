export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqCategory {
  category: string;
  items: FaqItem[];
}

export const faqData: FaqCategory[] = [
  {
    category: "Ordering",
    items: [
      {
        question: "How do I place a custom order?",
        answer:
          "Simply choose your product, fill in the customization options (name, color, size), and add it to your cart. If you need something completely custom that isn't listed, reach out through our Contact page and we'll work together to bring your vision to life.",
      },
      {
        question: "Can I change or cancel my order after placing it?",
        answer:
          "Since each piece is handmade to order, we begin crafting within 24 hours. Please contact us immediately if you need to make changes. We'll do our best to accommodate, but changes may not be possible once crafting has begun.",
      },
      {
        question: "Do you offer gift wrapping?",
        answer:
          "Yes! Every order comes beautifully packaged with tissue paper and a Crafted By Mama sticker. For an extra special touch, we include a digital art print with orders over $50.",
      },
    ],
  },
  {
    category: "Shipping",
    items: [
      {
        question: "How long does shipping take?",
        answer:
          "Since every piece is handmade to order, please allow 7-14 business days for crafting, plus 3-5 business days for shipping. Subscription kits ship on the 1st of each month.",
      },
      {
        question: "Do you offer free shipping?",
        answer:
          "Yes! We offer free standard shipping on all orders over $75. Orders under $75 ship for a flat rate of $5.99.",
      },
      {
        question: "Do you ship internationally?",
        answer:
          "Currently, we ship within the United States and Canada. We're working on expanding to more countries soon. Sign up for our newsletter to be the first to know!",
      },
    ],
  },
  {
    category: "Subscriptions",
    items: [
      {
        question: "What's included in the monthly craft kit?",
        answer:
          "Each kit includes all materials you need (fabric, thread, needles, embellishments), a printed pattern guide, and a QR code linking to a full video tutorial. No extra supplies needed — everything is included.",
      },
      {
        question: "What skill level do I need?",
        answer:
          "Our kits are designed for complete beginners! The step-by-step video tutorials walk you through every stitch. If you can thread a needle, you can do this.",
      },
      {
        question: "Can I cancel my subscription anytime?",
        answer:
          "Absolutely. There's no commitment — cancel anytime from your account or by emailing us. Your cancellation takes effect at the end of your current billing period.",
      },
      {
        question: "Can I gift a subscription?",
        answer:
          "Yes! Gift subscriptions are available for 3, 6, or 12 months. The recipient will receive a beautifully designed gift card with their first kit.",
      },
    ],
  },
  {
    category: "Custom Orders",
    items: [
      {
        question: "How do I send a handprint or footprint for the keepsake hoop?",
        answer:
          "After placing your order, you'll receive an email with instructions. Simply take a photo of an ink print or use our printable template, and send it to us. We'll recreate it faithfully in embroidery.",
      },
      {
        question: "Can I request a color not listed in the options?",
        answer:
          "We're happy to accommodate custom color requests whenever possible. Please reach out via our Contact page with your request and we'll let you know if we can make it happen.",
      },
    ],
  },
  {
    category: "Returns & Care",
    items: [
      {
        question: "What is your return policy?",
        answer:
          "Because each piece is handmade and personalized, we cannot accept returns. However, if there's an issue with your order (damage, incorrect personalization), please contact us within 7 days and we'll make it right.",
      },
      {
        question: "How do I care for my handmade piece?",
        answer:
          "For embroidered hoops and banners: dust gently and keep out of direct sunlight. For blankets: machine wash cold on gentle cycle, tumble dry low. For sweaters: hand wash cold, lay flat to dry.",
      },
    ],
  },
];

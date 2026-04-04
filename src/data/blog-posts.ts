export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  coverColor: string; // gradient placeholder until real images
  content: string; // Markdown content
}

export const blogPosts: BlogPost[] = [
  {
    slug: "your-first-embroidery-project",
    title: "Your First Embroidery Project: A Complete Beginner's Guide",
    excerpt:
      "Never picked up a needle before? Perfect. This step-by-step guide walks you through everything you need to know to start your first embroidery project — no experience required.",
    date: "2026-04-01",
    category: "Tutorials",
    readTime: "8 min read",
    coverColor: "from-sage-light to-blush",
    content: `
## Getting Started with Embroidery

Embroidery is one of the most rewarding crafts you can learn. It's portable, meditative, and creates beautiful pieces that last a lifetime.

### What You'll Need

- **Embroidery hoop** (6" is perfect for beginners)
- **Fabric** (cotton or linen work best)
- **Embroidery floss** (DMC is the gold standard)
- **Embroidery needles** (size 7 or 8)
- **Scissors** (small, sharp ones)
- **Water-soluble marker** (for tracing your design)

### Your First Stitches

Start with these three foundational stitches and you can create almost anything:

1. **Back stitch** — perfect for outlines and text
2. **Satin stitch** — fills in shapes with smooth, parallel threads
3. **French knot** — adds texture and dots

### Tips for Success

- Keep your fabric taut in the hoop
- Use 2-3 strands of floss (not all 6!)
- Don't worry about the back looking messy — everyone's does
- Take breaks — embroidery should be relaxing, not stressful

*Ready to try? Our monthly craft kit includes everything listed above, plus a full video tutorial walking you through each stitch.*
    `.trim(),
  },
  {
    slug: "choosing-the-perfect-baby-blanket-fabric",
    title: "How to Choose the Perfect Fabric for a Baby Blanket",
    excerpt:
      "Not all fabrics are created equal — especially when it comes to wrapping your little one. Here's what to look for (and avoid) when choosing blanket fabric.",
    date: "2026-03-25",
    category: "Tips",
    readTime: "5 min read",
    coverColor: "from-blush to-cream-dark",
    content: `
## Choosing Baby Blanket Fabric

The fabric you choose for a baby blanket matters more than you might think. It touches your baby's sensitive skin, gets washed constantly, and ideally lasts through multiple kids.

### Best Fabrics for Baby Blankets

**Organic Cotton Muslin** — Our top pick. It's breathable, gets softer with every wash, and is naturally hypoallergenic. This is what we use for all our embroidered baby blankets.

**Bamboo** — Incredibly soft, temperature-regulating, and eco-friendly. Slightly more expensive but worth it.

**Flannel** — Warm, cozy, and affordable. Great for winter babies.

### Fabrics to Avoid

- **Polyester** — Traps heat and can irritate sensitive skin
- **Wool** — Too scratchy for most babies
- **Silk** — Beautiful but impractical for daily use

### What About Embroidered Blankets?

When adding embroidery to a baby blanket, the fabric needs to be sturdy enough to hold stitches without puckering. That's why we love muslin — it has the perfect combination of softness and structure.

*All our embroidered blankets use 100% organic cotton muslin, pre-washed for extra softness.*
    `.trim(),
  },
  {
    slug: "screen-free-activities-for-toddlers",
    title: "15 Screen-Free Activities You Can Do With Your Toddler Today",
    excerpt:
      "Stuck in a screen-time rut? These simple, hands-on activities require minimal supplies and maximum giggles. Most take under 5 minutes to set up.",
    date: "2026-03-18",
    category: "Parenting",
    readTime: "6 min read",
    coverColor: "from-terracotta-light/30 to-sage-light",
    content: `
## Screen-Free Fun

We've all been there — reaching for the iPad because you just need 10 minutes of peace. No judgment. But when you're ready for alternatives, here are 15 activities that genuinely keep toddlers engaged.

### Quick Setup (Under 2 Minutes)

1. **Water painting** — Give them a cup of water and a paintbrush. Let them "paint" the sidewalk, fence, or patio. It dries and they can start over.
2. **Sticker sorting** — A sheet of stickers and a piece of paper. That's it.
3. **Pot and spoon band** — Pull out the pots, wooden spoons, and let them go wild.
4. **Window clings** — Reusable, mess-free, and endlessly entertaining.
5. **Tape roads** — Painter's tape on the floor becomes roads for toy cars.

### Medium Setup (5-10 Minutes)

6. **Sensory bins** — Rice, beans, or pasta with cups and scoops
7. **Play dough** — Homemade takes 5 minutes and lasts weeks
8. **Sorting colors** — Gather items around the house and sort by color
9. **Washing toys** — A bin of soapy water and some dirty toys = 30 min of focus
10. **Nature walk bingo** — Print a simple card and explore outside

### Craft Time (Perfect for Mama + Toddler)

11. **Finger painting** — Embrace the mess
12. **Cotton ball stamping** — Clip cotton balls to clothespins for easy grip
13. **Tearing paper collage** — No scissors needed for little hands
14. **Threading pasta** — Pipe cleaners through tube pasta for fine motor skills
15. **Our monthly craft kit** — Designed for exactly this: quality time creating together

*Want a guided crafting experience delivered monthly? Our craft kits include everything you need, plus a video tutorial designed for mama and toddler together.*
    `.trim(),
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  if (category === "all") return blogPosts;
  return blogPosts.filter((p) => p.category === category);
}

export function getBlogCategories(): string[] {
  return [...new Set(blogPosts.map((p) => p.category))];
}

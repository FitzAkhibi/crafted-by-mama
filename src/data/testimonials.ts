export interface Testimonial {
  id: string;
  name: string;
  text: string;
  product: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Sarah M.",
    text: "I got the name hoop for my daughter's nursery and I literally cried when I opened it. The craftsmanship is stunning and it's so much more meaningful than anything I could buy at a store.",
    product: "Personalized Name Hoop",
    rating: 5,
  },
  {
    id: "t2",
    name: "Jessica T.",
    text: "The monthly craft kit is the highlight of our week. My toddler and I sit down together and it's the most connected I feel all week. The tutorials are so helpful for a total beginner like me.",
    product: "Monthly Craft Kit",
    rating: 5,
  },
  {
    id: "t3",
    name: "Amanda R.",
    text: "Ordered a birth stats hoop as a gift for my sister's baby shower. She was blown away. It's now the centerpiece of the nursery. Will absolutely be ordering more for every new baby in our family.",
    product: "Birth Stats Hoop",
    rating: 5,
  },
  {
    id: "t4",
    name: "Maria L.",
    text: "The baby blanket is SO soft and the embroidery is perfect. I love that it's organic cotton too. My son carries it everywhere. It's already becoming his favorite comfort item.",
    product: "Embroidered Baby Blanket",
    rating: 5,
  },
];

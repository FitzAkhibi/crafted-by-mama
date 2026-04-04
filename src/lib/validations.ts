import { z } from "zod";

export const newsletterSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .max(254, "Email too long")
    .transform((e) => e.toLowerCase().trim()),
});

export const contactSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name too long")
    .trim(),
  email: z
    .string()
    .email("Invalid email address")
    .max(254, "Email too long")
    .transform((e) => e.toLowerCase().trim()),
  subject: z
    .string()
    .max(200, "Subject too long")
    .optional()
    .default("General Inquiry"),
  message: z
    .string()
    .min(1, "Message is required")
    .max(5000, "Message too long (max 5000 characters)")
    .trim(),
});

export const checkoutItemSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),
  quantity: z.number().int().min(1).max(10, "Maximum 10 per item"),
  customizations: z.record(z.string(), z.string().max(100)).optional(),
});

export const checkoutSchema = z.object({
  items: z
    .array(checkoutItemSchema)
    .min(1, "At least one item is required")
    .max(20, "Maximum 20 items per order"),
});

export const subscriptionSchema = z.object({
  planId: z.string().optional(),
  priceId: z.string().min(1, "Price ID is required"),
});

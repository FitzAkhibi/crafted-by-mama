import {
  pgTable,
  uuid,
  text,
  integer,
  boolean,
  timestamp,
  jsonb,
} from "drizzle-orm/pg-core";

// ─── Products ────────────────────────────────────────────────────────────────

export const products = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  shortDescription: text("short_description"),
  category: text("category").notNull(), // craft-kits, hoops, blankets, sweaters, banners, custom
  basePrice: integer("base_price").notNull(), // cents
  compareAtPrice: integer("compare_at_price"),
  images: jsonb("images").$type<string[]>().notNull().default([]),
  featured: boolean("featured").default(false),
  active: boolean("active").default(true),
  customizable: boolean("customizable").default(false),
  customizationOptions: jsonb("customization_options").$type<
    {
      id: string;
      label: string;
      type: "text" | "select" | "color";
      required: boolean;
      placeholder?: string;
      maxLength?: number;
      priceModifier?: number;
      options?: {
        value: string;
        label: string;
        priceModifier?: number;
      }[];
    }[]
  >(),
  stripeProductId: text("stripe_product_id"),
  stripePriceId: text("stripe_price_id"),
  metadata: jsonb("metadata").$type<Record<string, string>>(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ─── Product Variants ────────────────────────────────────────────────────────

export const productVariants = pgTable("product_variants", {
  id: uuid("id").defaultRandom().primaryKey(),
  productId: uuid("product_id")
    .references(() => products.id, { onDelete: "cascade" })
    .notNull(),
  name: text("name").notNull(),
  sku: text("sku").notNull().unique(),
  price: integer("price").notNull(), // cents
  stripePriceId: text("stripe_price_id"),
  inventory: integer("inventory").default(0),
  active: boolean("active").default(true),
});

// ─── Subscription Plans ──────────────────────────────────────────────────────

export const subscriptionPlans = pgTable("subscription_plans", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  price: integer("price").notNull(), // cents per period
  interval: text("interval").notNull(), // "month" | "year"
  features: jsonb("features").$type<string[]>().notNull().default([]),
  stripeProductId: text("stripe_product_id"),
  stripePriceId: text("stripe_price_id"),
  active: boolean("active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ─── Orders ──────────────────────────────────────────────────────────────────

export const orders = pgTable("orders", {
  id: uuid("id").defaultRandom().primaryKey(),
  orderNumber: text("order_number").notNull().unique(), // CBM-0001
  email: text("email").notNull(),
  customerName: text("customer_name").notNull(),
  status: text("status").notNull().default("pending"),
  // pending | paid | processing | shipped | delivered | cancelled | refunded
  subtotal: integer("subtotal").notNull(), // cents
  shippingCost: integer("shipping_cost").notNull(), // cents
  total: integer("total").notNull(), // cents
  stripeSessionId: text("stripe_session_id"),
  stripePaymentIntentId: text("stripe_payment_intent_id"),
  shippingAddress: jsonb("shipping_address").$type<{
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  }>(),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ─── Order Items ─────────────────────────────────────────────────────────────

export const orderItems = pgTable("order_items", {
  id: uuid("id").defaultRandom().primaryKey(),
  orderId: uuid("order_id")
    .references(() => orders.id, { onDelete: "cascade" })
    .notNull(),
  productId: uuid("product_id")
    .references(() => products.id)
    .notNull(),
  variantId: uuid("variant_id").references(() => productVariants.id),
  quantity: integer("quantity").notNull(),
  unitPrice: integer("unit_price").notNull(), // cents
  customizations: jsonb("customizations").$type<Record<string, string>>(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ─── Newsletter Subscribers ──────────────────────────────────────────────────

export const subscribers = pgTable("subscribers", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull().unique(),
  firstName: text("first_name"),
  source: text("source"), // footer, popup, checkout, blog
  active: boolean("active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ─── Contact Messages ────────────────────────────────────────────────────────

export const contactMessages = pgTable("contact_messages", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject"),
  message: text("message").notNull(),
  read: boolean("read").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

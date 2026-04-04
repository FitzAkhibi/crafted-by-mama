/**
 * Stripe Product & Price Setup Script
 *
 * Run with: npx tsx scripts/stripe-setup.ts
 *
 * This creates the subscription products/prices in your Stripe account.
 * Run this once after setting up your Stripe account.
 * Copy the output price IDs into your subscription page.
 */

import Stripe from "stripe";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-03-25.dahlia",
});

async function setup() {
  console.log("Setting up Stripe products...\n");

  // Monthly Craft Kit - Standard
  const monthlyProduct = await stripe.products.create({
    name: "Monthly Craft Kit",
    description:
      "A curated crafting experience delivered to your door every month. Includes premium materials, pattern guide, and video tutorial.",
    metadata: { plan: "monthly" },
  });

  const monthlyPrice = await stripe.prices.create({
    product: monthlyProduct.id,
    unit_amount: 2795, // $27.95
    currency: "usd",
    recurring: { interval: "month" },
  });

  console.log("Monthly Kit:");
  console.log(`  Product ID: ${monthlyProduct.id}`);
  console.log(`  Price ID:   ${monthlyPrice.id}`);
  console.log();

  // Monthly Craft Kit - Premium
  const premiumProduct = await stripe.products.create({
    name: "Premium Craft Kit",
    description:
      "Everything in the Monthly Kit, plus bonus embellishments, early access to new products, and a members-only tutorial library.",
    metadata: { plan: "premium" },
  });

  const premiumPrice = await stripe.prices.create({
    product: premiumProduct.id,
    unit_amount: 3995, // $39.95
    currency: "usd",
    recurring: { interval: "month" },
  });

  console.log("Premium Kit:");
  console.log(`  Product ID: ${premiumProduct.id}`);
  console.log(`  Price ID:   ${premiumPrice.id}`);
  console.log();

  console.log("Done! Add these price IDs to your subscription page.");
  console.log("\nNext steps:");
  console.log("1. Go to https://dashboard.stripe.com/webhooks");
  console.log("2. Add endpoint: https://craftedbymama.com/api/stripe/webhook");
  console.log(
    "3. Listen for: checkout.session.completed, invoice.payment_succeeded, customer.subscription.updated, customer.subscription.deleted"
  );
  console.log("4. Copy the webhook signing secret to STRIPE_WEBHOOK_SECRET in .env.local");
}

setup().catch(console.error);

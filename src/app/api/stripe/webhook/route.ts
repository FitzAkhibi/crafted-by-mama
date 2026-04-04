import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import Stripe from "stripe";

export const dynamic = "force-dynamic";

/**
 * In-memory set of processed Stripe event IDs to prevent duplicate processing.
 * For production at scale, replace with a database check (e.g., check orders table
 * for existing stripeSessionId before inserting).
 */
const processedEvents = new Set<string>();

// Prevent unbounded memory growth — cap at 10,000 entries
const MAX_PROCESSED_EVENTS = 10_000;

function markEventProcessed(eventId: string) {
  if (processedEvents.size >= MAX_PROCESSED_EVENTS) {
    // Clear oldest half (Set maintains insertion order)
    const entries = Array.from(processedEvents);
    for (let i = 0; i < entries.length / 2; i++) {
      processedEvents.delete(entries[i]);
    }
  }
  processedEvents.add(eventId);
}

async function generateOrderNumber(): Promise<string> {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `CBM-${timestamp}-${random}`;
}

export async function POST(request: Request) {
  try {
    const body = await request.text();
    const signature = request.headers.get("stripe-signature");

    if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
      return NextResponse.json(
        { error: "Missing signature or webhook secret" },
        { status: 400 }
      );
    }

    let event: Stripe.Event;
    try {
      event = getStripe().webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error("Webhook signature verification failed:", err);
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 400 }
      );
    }

    // Idempotency check — skip already-processed events
    if (processedEvents.has(event.id)) {
      console.log(`Skipping already-processed event: ${event.id}`);
      return NextResponse.json({ received: true, deduplicated: true });
    }

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        const orderNumber = await generateOrderNumber();

        console.log("=== NEW ORDER ===");
        console.log("Order Number:", orderNumber);
        console.log("Customer:", session.customer_details?.name);
        console.log("Email:", session.customer_details?.email);
        console.log("Amount:", session.amount_total);
        console.log("Payment Intent:", session.payment_intent);
        console.log("Mode:", session.mode);
        console.log("Metadata:", session.metadata);

        // TODO: When DB is connected:
        // 1. Check if order with this stripeSessionId already exists (DB-level idempotency)
        // 2. Insert order into orders table
        // 3. Insert line items into order_items table
        // 4. Send confirmation email via Resend
        break;
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object;
        console.log("=== SUBSCRIPTION PAYMENT ===");
        console.log("Customer:", invoice.customer_email);
        console.log("Amount:", invoice.amount_paid);
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object;
        console.log("=== SUBSCRIPTION UPDATED ===");
        console.log("Subscription ID:", subscription.id);
        console.log("Status:", subscription.status);
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object;
        console.log("=== SUBSCRIPTION CANCELLED ===");
        console.log("Subscription ID:", subscription.id);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    // Mark event as processed after successful handling
    markEventProcessed(event.id);

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}

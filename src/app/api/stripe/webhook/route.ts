import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import Stripe from "stripe";

export const dynamic = "force-dynamic";

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
        // 1. Insert order into orders table
        // 2. Insert line items into order_items table
        // 3. Send confirmation email via Resend
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

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

// Allowlist of valid Stripe price IDs to prevent arbitrary price injection
const VALID_PRICE_IDS = new Set(
  [
    process.env.STRIPE_MONTHLY_PRICE_ID,
    process.env.STRIPE_PREMIUM_PRICE_ID,
  ].filter(Boolean)
);

export async function POST(request: Request) {
  try {
    // Rate limit: 5 subscription attempts per IP per hour
    const ip = getClientIp(request);
    const rl = rateLimit(`subscription:${ip}`, {
      limit: 5,
      windowSeconds: 3600,
    });
    if (!rl.allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const { planId, priceId } = await request.json();

    if (!priceId || typeof priceId !== "string") {
      return NextResponse.json(
        { error: "Price ID is required" },
        { status: 400 }
      );
    }

    // Validate price ID against allowlist (if configured)
    if (VALID_PRICE_IDS.size > 0 && !VALID_PRICE_IDS.has(priceId)) {
      return NextResponse.json(
        { error: "Invalid price ID" },
        { status: 400 }
      );
    }

    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: "Stripe is not configured" },
        { status: 503 }
      );
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3001";

    const session = await getStripe().checkout.sessions.create({
      mode: "subscription",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/subscription`,
      metadata: {
        source: "crafted-by-mama-website",
        planId: planId || "monthly",
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe subscription error:", error);
    return NextResponse.json(
      { error: "Failed to create subscription session" },
      { status: 500 }
    );
  }
}

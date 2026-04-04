import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { FREE_SHIPPING_THRESHOLD, FLAT_SHIPPING_RATE } from "@/lib/constants";

interface CheckoutItem {
  name: string;
  price: number; // cents
  quantity: number;
  image?: string;
  customizations?: Record<string, string>;
}

export async function POST(request: Request) {
  try {
    const { items } = (await request.json()) as { items: CheckoutItem[] };

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No items provided" }, { status: 400 });
    }

    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: "Stripe is not configured" },
        { status: 503 }
      );
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3001";

    // Build line items
    const lineItems = items.map((item) => {
      const customizationDesc = item.customizations
        ? Object.entries(item.customizations)
            .map(([k, v]) => `${k}: ${v}`)
            .join(", ")
        : undefined;

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            description: customizationDesc || undefined,
            images: item.image ? [`${siteUrl}${item.image}`] : undefined,
          },
          unit_amount: item.price,
        },
        quantity: item.quantity,
      };
    });

    // Calculate if free shipping applies
    const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const shippingOptions =
      subtotal >= FREE_SHIPPING_THRESHOLD
        ? [
            {
              shipping_rate_data: {
                type: "fixed_amount" as const,
                fixed_amount: { amount: 0, currency: "usd" },
                display_name: "Free Shipping",
                delivery_estimate: {
                  minimum: { unit: "business_day" as const, value: 10 },
                  maximum: { unit: "business_day" as const, value: 19 },
                },
              },
            },
          ]
        : [
            {
              shipping_rate_data: {
                type: "fixed_amount" as const,
                fixed_amount: { amount: FLAT_SHIPPING_RATE, currency: "usd" },
                display_name: "Standard Shipping",
                delivery_estimate: {
                  minimum: { unit: "business_day" as const, value: 10 },
                  maximum: { unit: "business_day" as const, value: 19 },
                },
              },
            },
            {
              shipping_rate_data: {
                type: "fixed_amount" as const,
                fixed_amount: { amount: 0, currency: "usd" },
                display_name: "Free Shipping (orders $75+)",
                delivery_estimate: {
                  minimum: { unit: "business_day" as const, value: 10 },
                  maximum: { unit: "business_day" as const, value: 19 },
                },
              },
            },
          ];

    const session = await getStripe().checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      shipping_address_collection: {
        allowed_countries: ["US", "CA"],
      },
      shipping_options: shippingOptions,
      success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/cart`,
      metadata: {
        source: "crafted-by-mama-website",
        itemCount: String(items.length),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}

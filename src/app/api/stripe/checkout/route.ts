import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { products } from "@/data/products";
import { FREE_SHIPPING_THRESHOLD, FLAT_SHIPPING_RATE } from "@/lib/constants";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { checkoutSchema } from "@/lib/validations";

interface CheckoutItemRequest {
  productId: string;
  quantity: number;
  customizations?: Record<string, string>;
}

/**
 * Calculate the true price of a product server-side, including customization modifiers.
 * Never trust client-sent prices.
 */
function calculateItemPrice(
  productId: string,
  customizations?: Record<string, string>
): { price: number; name: string; description?: string } | null {
  const product = products.find((p) => p.id === productId && p.active);
  if (!product) return null;

  let price = product.basePrice;

  // Apply customization price modifiers
  if (product.customizationOptions && customizations) {
    for (const option of product.customizationOptions) {
      const selectedValue = customizations[option.id];
      if (!selectedValue) continue;

      // Option-level modifier
      if (option.priceModifier) {
        price += option.priceModifier;
      }

      // Selected value's modifier (for select options)
      if (option.options) {
        const selected = option.options.find((o) => o.value === selectedValue);
        if (selected?.priceModifier) {
          price += selected.priceModifier;
        }
      }
    }
  }

  // Build customization description for Stripe line item
  const customizationDesc = customizations
    ? Object.entries(customizations)
        .filter(([, v]) => v) // skip empty values
        .map(([k, v]) => `${k.replace(/_/g, " ")}: ${v}`)
        .join(", ")
    : undefined;

  return { price, name: product.name, description: customizationDesc };
}

export async function POST(request: Request) {
  try {
    // Rate limit: 10 checkout attempts per IP per hour
    const ip = getClientIp(request);
    const rl = rateLimit(`checkout:${ip}`, { limit: 10, windowSeconds: 3600 });
    if (!rl.allowed) {
      return NextResponse.json(
        { error: "Too many checkout attempts. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const parsed = checkoutSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid input" },
        { status: 400 }
      );
    }

    const { items } = parsed.data;

    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: "Stripe is not configured" },
        { status: 503 }
      );
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3001";

    // Validate and price each item SERVER-SIDE
    const lineItems = [];
    let subtotal = 0;

    for (const item of items) {
      const priced = calculateItemPrice(item.productId, item.customizations);
      if (!priced) {
        return NextResponse.json(
          { error: `Product not found: ${item.productId}` },
          { status: 400 }
        );
      }

      subtotal += priced.price * item.quantity;

      lineItems.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: priced.name,
            description: priced.description || undefined,
          },
          unit_amount: priced.price,
        },
        quantity: item.quantity,
      });
    }

    // Calculate shipping based on server-side subtotal
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

import { NextResponse } from "next/server";
import { sendNewsletterWelcome } from "@/lib/email";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { newsletterSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    // Rate limit: 3 signups per IP per hour
    const ip = getClientIp(request);
    const rl = rateLimit(`newsletter:${ip}`, { limit: 3, windowSeconds: 3600 });
    if (!rl.allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const parsed = newsletterSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid input" },
        { status: 400 }
      );
    }

    const { email } = parsed.data;

    // TODO: Save to subscribers table when DB is connected
    console.log(`Newsletter signup: ${email}`);

    // Send welcome email with discount code
    await sendNewsletterWelcome({ to: email });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Newsletter signup error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

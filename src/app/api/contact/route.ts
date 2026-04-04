import { NextResponse } from "next/server";
import { sendContactNotification } from "@/lib/email";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { contactSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    // Rate limit: 5 submissions per IP per hour
    const ip = getClientIp(request);
    const rl = rateLimit(`contact:${ip}`, { limit: 5, windowSeconds: 3600 });
    if (!rl.allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid input" },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = parsed.data;

    // TODO: Save to contact_messages table when DB is connected
    console.log("Contact form submission:", { name, email, subject, message });

    // Send notification email to business
    await sendContactNotification({
      name,
      email,
      subject: subject || "General Inquiry",
      message,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

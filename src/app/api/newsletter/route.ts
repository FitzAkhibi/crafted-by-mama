import { NextResponse } from "next/server";
import { sendNewsletterWelcome } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      );
    }

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

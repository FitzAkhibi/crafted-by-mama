import { NextResponse } from "next/server";
import { sendContactNotification } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

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

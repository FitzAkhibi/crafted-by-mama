import { Resend } from "resend";

let _resend: Resend | null = null;

function getResend(): Resend | null {
  if (!process.env.RESEND_API_KEY) {
    return null;
  }
  if (!_resend) {
    _resend = new Resend(process.env.RESEND_API_KEY);
  }
  return _resend;
}

const FROM_EMAIL = "Crafted By Mama <hello@craftedbymama.com>";

export async function sendOrderConfirmation({
  to,
  customerName,
  orderNumber,
  total,
  items,
}: {
  to: string;
  customerName: string;
  orderNumber: string;
  total: number;
  items: { name: string; quantity: number; price: number }[];
}) {
  const resend = getResend();
  if (!resend) return;

  const itemsList = items
    .map((i) => `${i.name} x${i.quantity} — $${(i.price / 100).toFixed(2)}`)
    .join("\n");

  await resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject: `Order Confirmed! #${orderNumber}`,
    text: `Hi ${customerName},

Thank you for your order! We're so excited to start crafting your keepsake.

Order #${orderNumber}
${itemsList}

Total: $${(total / 100).toFixed(2)}

What happens next:
1. We begin handcrafting your piece (7-14 business days)
2. You'll receive a shipping notification with tracking
3. Your keepsake arrives, wrapped with love

Questions? Reply to this email anytime.

With love,
Crafted By Mama`,
  });
}

export async function sendSubscriptionWelcome({
  to,
  customerName,
}: {
  to: string;
  customerName: string;
}) {
  const resend = getResend();
  if (!resend) return;

  await resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject: "Welcome to Crafted By Mama!",
    text: `Hi ${customerName},

Welcome to the Crafted By Mama family! We're so happy you're here.

Your first craft kit will ship on the 1st of next month. Here's what to expect:

- A curated kit with all materials included
- A printed pattern guide
- A QR code linking to your video tutorial

No experience needed — just open the box, scan the QR code, and follow along.

In the meantime, follow us on Instagram @craftedbymama for daily inspiration and tips.

Can't wait for you to start creating!

With love,
Crafted By Mama`,
  });
}

export async function sendNewsletterWelcome({ to }: { to: string }) {
  const resend = getResend();
  if (!resend) return;

  await resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject: "Welcome + Your 10% Off Code!",
    text: `Welcome to the Mama Circle!

As promised, here's your 10% off code for your first order:

WELCOMEMAMA

Use it at checkout on craftedbymama.com.

You'll hear from us with crafting tips, new product drops, and a little encouragement. No spam, ever.

With love,
Crafted By Mama`,
  });
}

export async function sendContactNotification({
  name,
  email,
  subject,
  message,
}: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const resend = getResend();
  if (!resend) return;

  await resend.emails.send({
    from: FROM_EMAIL,
    to: "hello@craftedbymama.com",
    replyTo: email,
    subject: `[Contact Form] ${subject} — from ${name}`,
    text: `New contact form submission:

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}`,
  });
}

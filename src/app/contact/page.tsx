"use client";

import { useState } from "react";
import { Mail, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SITE_CONFIG } from "@/lib/constants";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="section-padding bg-cream texture-paper">
      <div className="container-wide mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: Info */}
          <div>
            <h1 className="font-handwritten text-4xl sm:text-5xl text-walnut">
              Let&apos;s Chat
            </h1>
            <p className="mt-4 text-walnut-light text-lg leading-relaxed">
              Have a question about a product? Want to discuss a custom order?
              Just want to say hi? I&apos;d love to hear from you.
            </p>

            <div className="mt-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="shrink-0 h-10 w-10 rounded-xl bg-sage-light/30 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-sage-dark" />
                </div>
                <div>
                  <h3 className="font-semibold text-walnut text-sm">Email</h3>
                  <a
                    href={`mailto:${SITE_CONFIG.email}`}
                    className="text-sm text-terracotta hover:text-terracotta-dark transition-colors"
                  >
                    {SITE_CONFIG.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="shrink-0 h-10 w-10 rounded-xl bg-sage-light/30 flex items-center justify-center">
                  <MessageCircle className="h-5 w-5 text-sage-dark" />
                </div>
                <div>
                  <h3 className="font-semibold text-walnut text-sm">
                    Social Media
                  </h3>
                  <p className="text-sm text-walnut-light">
                    DM us on{" "}
                    <a
                      href={SITE_CONFIG.social.instagram}
                      className="text-terracotta hover:text-terracotta-dark"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Instagram
                    </a>{" "}
                    for the fastest response
                  </p>
                </div>
              </div>

              <div className="bg-blush/30 rounded-2xl p-5">
                <p className="text-sm text-walnut-light leading-relaxed">
                  <strong className="text-walnut">Response time:</strong> We
                  typically respond within 24-48 hours. For custom orders,
                  please allow a bit more time as we want to give your request
                  the attention it deserves.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm">
            {status === "success" ? (
              <div className="text-center py-12">
                <div className="h-16 w-16 rounded-full bg-sage-light/30 flex items-center justify-center mx-auto mb-4">
                  <Send className="h-7 w-7 text-sage-dark" />
                </div>
                <h2 className="font-handwritten text-2xl text-walnut">
                  Message Sent!
                </h2>
                <p className="mt-2 text-walnut-light">
                  Thank you for reaching out. I&apos;ll get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium text-walnut">
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    required
                    placeholder="Your name"
                    className="mt-1.5 bg-cream border-sage-light/50 rounded-xl"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-walnut">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="your@email.com"
                    className="mt-1.5 bg-cream border-sage-light/50 rounded-xl"
                  />
                </div>

                <div>
                  <Label htmlFor="subject" className="text-sm font-medium text-walnut">
                    Subject
                  </Label>
                  <select
                    id="subject"
                    name="subject"
                    className="mt-1.5 w-full h-10 bg-cream border border-sage-light/50 rounded-xl px-3 text-sm text-walnut"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="custom-order">Custom Order</option>
                    <option value="subscription">Subscription Question</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="message" className="text-sm font-medium text-walnut">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell me what you're looking for..."
                    className="mt-1.5 bg-cream border-sage-light/50 rounded-xl resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={status === "loading"}
                  size="lg"
                  className="w-full bg-terracotta hover:bg-terracotta-dark text-white rounded-xl h-12"
                >
                  {status === "loading" ? "Sending..." : "Send Message"}
                </Button>

                {status === "error" && (
                  <p className="text-sm text-destructive text-center">
                    Something went wrong. Please try again or email us directly.
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

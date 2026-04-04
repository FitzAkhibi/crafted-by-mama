"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="bg-walnut section-padding">
      <div className="container-narrow mx-auto text-center">
        <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-terracotta/20 mb-4">
          <Mail className="h-5 w-5 text-terracotta-light" />
        </div>

        <h2 className="font-handwritten text-3xl sm:text-4xl text-cream">
          Join the Mama Circle
        </h2>
        <p className="mt-3 text-cream-dark/60 max-w-md mx-auto">
          Get 10% off your first order, plus crafting tips, new product drops,
          and a little encouragement delivered to your inbox.
        </p>

        {status === "success" ? (
          <div className="mt-6 bg-sage-dark/30 text-sage-light rounded-full py-3 px-6 inline-block">
            You&apos;re in! Check your inbox for your welcome gift.
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <Input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-white/10 border-cream-dark/20 text-cream placeholder:text-cream-dark/40 rounded-full h-11 px-5"
            />
            <Button
              type="submit"
              disabled={status === "loading"}
              className="bg-terracotta hover:bg-terracotta-dark text-white rounded-full h-11 px-6 shrink-0"
            >
              {status === "loading" ? "Joining..." : "Join"}
            </Button>
          </form>
        )}

        {status === "error" && (
          <p className="mt-3 text-sm text-terracotta-light">
            Something went wrong. Please try again.
          </p>
        )}

        <p className="mt-4 text-xs text-cream-dark/30">
          No spam, ever. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}

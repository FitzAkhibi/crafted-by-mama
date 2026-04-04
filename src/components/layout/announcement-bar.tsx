"use client";

import { useState } from "react";
import { X } from "lucide-react";

export function AnnouncementBar() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="relative bg-terracotta text-white text-center text-sm py-2 px-8">
      <p className="font-medium">
        Free shipping on orders over $75
        <span className="hidden sm:inline"> | </span>
        <span className="block sm:inline">
          Subscribe &amp; save 10% on your first kit
        </span>
      </p>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:opacity-70 transition-opacity"
        aria-label="Dismiss announcement"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

import Link from "next/link";
import { buttonVariants } from "@/lib/button-variants";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="section-padding bg-cream texture-paper flex-1 flex items-center justify-center">
      <div className="text-center">
        <h1 className="font-handwritten text-6xl text-walnut">Oops!</h1>
        <p className="mt-3 text-xl text-walnut-light">
          We couldn&apos;t find that page.
        </p>
        <p className="mt-1 text-walnut-light">
          It might have been moved or may no longer exist.
        </p>
        <Link href="/" className={cn(buttonVariants(), "mt-6 bg-terracotta hover:bg-terracotta-dark text-white rounded-full")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
        </Link>
      </div>
    </div>
  );
}

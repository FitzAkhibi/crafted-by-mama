import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Middleware: CSRF protection for API routes.
 * Verifies that POST/PUT/DELETE requests come from the same origin.
 * Stripe webhooks are excluded since they come from Stripe's servers.
 */
export function middleware(request: NextRequest) {
  // Only check mutating methods
  if (!["POST", "PUT", "PATCH", "DELETE"].includes(request.method)) {
    return NextResponse.next();
  }

  // Exclude Stripe webhook (has its own signature verification)
  if (request.nextUrl.pathname === "/api/stripe/webhook") {
    return NextResponse.next();
  }

  // Check origin header
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");

  if (origin && host) {
    try {
      const originUrl = new URL(origin);
      // Allow if origin matches host
      if (originUrl.host !== host) {
        return NextResponse.json(
          { error: "Forbidden: cross-origin request" },
          { status: 403 }
        );
      }
    } catch {
      return NextResponse.json(
        { error: "Forbidden: invalid origin" },
        { status: 403 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};

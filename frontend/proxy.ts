import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Example: protect /dashboard
  if (pathname.startsWith("/dashboard")) {
    const loggedIn = request.cookies.get("accessToken"); // HttpOnly cookie set by backend
    if (!loggedIn) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Allow all other requests
  return NextResponse.next();
}

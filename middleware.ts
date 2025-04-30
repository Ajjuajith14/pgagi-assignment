import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Define which paths are protected and which are public
  const isPublicPath = path === "/signin" || path === "/signup" || path === "/"
  const isProtectedPath =
    path.startsWith("/dashboard") ||
    path.startsWith("/profile") ||
    path.startsWith("/analytics") ||
    path.startsWith("/reports") ||
    path.startsWith("/users") ||
    path.startsWith("/help")

  // Get the authentication status from cookies
  const isAuthenticated = request.cookies.has("user")

  // Redirect logic
  // Only redirect from signin/signup to dashboard if authenticated, but allow homepage access regardless
  if ((path === "/signin" || path === "/signup") && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  if (isProtectedPath && !isAuthenticated) {
    return NextResponse.redirect(new URL("/signin", request.url))
  }

  return NextResponse.next()
}

// Specify which routes this middleware should run on
export const config = {
  matcher: [
    "/",
    "/dashboard/:path*",
    "/signin",
    "/signup",
    "/profile/:path*",
    "/analytics/:path*",
    "/reports/:path*",
    "/users/:path*",
    "/help/:path*",
  ],
}

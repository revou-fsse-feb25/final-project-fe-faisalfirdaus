// middleware.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const LOGIN_PATH = "/auth/login";

const isAdminRoute = (p: string) => p.startsWith("/admin");
const isMeRoute = (p: string) => p.startsWith("/me");
const isCheckoutRoute = (p: string) => p.startsWith("/checkout");

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/api")
  ) {
    return NextResponse.next();
  }

  const auth = req.cookies.get("auth")?.value === "1";
  const role = req.cookies.get("role")?.value;

  const redirectToLogin = () => {
    const url = req.nextUrl.clone();
    url.pathname = LOGIN_PATH;
    url.search = search
      ? `${search}&next=${encodeURIComponent(pathname)}`
      : `?next=${encodeURIComponent(pathname)}`;
    return NextResponse.redirect(url);
  };

  if (isAdminRoute(pathname)) {
    if (!(auth && role === "ADMIN")) return redirectToLogin();
  } else if (isMeRoute(pathname) || isCheckoutRoute(pathname)) {
    if (!auth) return redirectToLogin();
  }

  const res = NextResponse.next();
  res.headers.set("X-Frame-Options", "SAMEORIGIN");
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  return res;
}

export const config = {
  matcher: ["/me/:path*", "/admin/:path*"],
};

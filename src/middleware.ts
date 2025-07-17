import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { NextRequestWithAuth } from "next-auth/middleware";

export default async function middleware(req: NextRequestWithAuth) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const isAuthenticated = !!token;
  const isAuthPage =
    req.nextUrl.pathname.startsWith("/auth/login") ||
    req.nextUrl.pathname.startsWith("/auth/register");

  // Redirect authenticated users away from auth pages
  if (isAuthenticated && isAuthPage) {
    const role = token.role as string;
    const redirectUrl = role === "admin" ? "/admin" : "/";
    return NextResponse.redirect(new URL(redirectUrl, req.url));
  }

  // Redirect unauthenticated users to login
  if (!isAuthenticated && !isAuthPage) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/admin/:path*", "/auth/:path*"],
};

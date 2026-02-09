import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const { pathname } = req.nextUrl;

  // public routes
  if (pathname.startsWith("/login") || pathname.startsWith("/join")) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Driver approval gate
  if (token.role === "driver" && token.driverStatus !== "Approved") {
    return NextResponse.redirect(new URL("/pending", req.url));
  }

  // Role based protection
  if (pathname.startsWith("/driver") && token.role !== "driver") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (pathname.startsWith("/helper") && token.role !== "helper") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (pathname.startsWith("/customer") && token.role !== "customer") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/driver/:path*", "/helper/:path*", "/customer/:path*"],
};

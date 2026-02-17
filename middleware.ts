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

  // Allow approved page for approved drivers
  if (token.role === "driver" && token.driverStatus === "Approved") {
    if (pathname === "/driver/pending") {
      return NextResponse.redirect(new URL("/driver/approved", req.url));
    }
    // Don't redirect if already on /driver/approved
  }


   // ---------------------------
  // Helper approval gate
  // ---------------------------
  if (token.role === "helper") {
    if (token.helperStatus !== "Approved") {
      // allow pending page
      if (pathname !== "/helper/pending") {
        return NextResponse.redirect(new URL("/helper/pending", req.url));
      }
    } else {
      // allow approved page
      if (pathname === "/helper/pending") {
        return NextResponse.redirect(new URL("/helper/approved", req.url));
      }
    }
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

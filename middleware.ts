import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  // function middleware(req) {
  //   const token = req.nextauth.token;
  //   const path = req.nextUrl.pathname;
  //   const role = token?.role;

  //   // Role-based redirection
  //   if (path.startsWith("/driver") && role !== "driver") {
  //     return NextResponse.redirect(new URL("/", req.url));
  //   }
  //   if (path.startsWith("/helper") && role !== "helper") {
  //     return NextResponse.redirect(new URL("/", req.url));
  //   }
  //   if (path.startsWith("/customer") && role !== "customer") {
  //     return NextResponse.redirect(new URL("/", req.url));
  //   }
  // },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/driver/:path*", "/helper/:path*", "/customer/:path*"],
};
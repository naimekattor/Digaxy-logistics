import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    role?: string;
    driverStatus?: string;
    user: {
      id: string;
      name?: string;
      role: "customer" | "driver" | "helper";
      email: string;
    };
  }

  interface User {
    id: string;
    name?: string;
    role: string;
    driverStatus?: string;
    accessToken: string;
    refreshToken?: string;
    user?: any;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: string;
    driverStatus?: string;
    accessToken?: string;
    refreshToken?: string;
    user?: any;
  }
}

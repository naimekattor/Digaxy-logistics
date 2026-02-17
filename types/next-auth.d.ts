import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    role?: string;
    driverStatus?: string;
    user: {
      id: string;
      username?: string;
      role: "customer" | "driver" | "helper";
      email: string;
      profile_picture?: string | null;
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

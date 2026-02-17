import NextAuth from "next-auth";
import { UserRole } from "./index";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    role?: UserRole;
    driverStatus?: string;
    user: {
      id: string;
      username?: string;
      role: UserRole;
      email: string;
      profile_picture?: string | null;
    };
  }

  interface User {
    id: string;
    name?: string;
    role: UserRole;
    driverStatus?: string;
    accessToken: string;
    refreshToken?: string;
    user?: any;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: UserRole;
    driverStatus?: string;
    accessToken?: string;
    refreshToken?: string;
    user?: any;
  }
}

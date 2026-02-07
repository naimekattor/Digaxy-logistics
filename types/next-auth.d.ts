import { UserRole } from "@/types";
import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
    interface User {
        id: string;
        role: UserRole;
        status?: string;
    }

    interface Session {
        user: User & {
            id: string;
            role: UserRole;
        };
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        role: UserRole;
    }
}

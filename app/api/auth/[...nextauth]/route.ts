import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { UserRole } from "@/types";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "user@example.com" },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "text" } // Passed from the login form
      },
      async authorize(credentials) {
        // MOCK AUTHENTICATION LOGIC
        // In a real app, this would hit your Django API

        if (!credentials?.email || !credentials?.password) return null;

        const role = credentials.role as UserRole || UserRole.CUSTOMER;

        // Simulating a user object
        const user = {
          id: "1",
          name: role === UserRole.DRIVER ? "Naim Doe" : "John Customer",
          email: credentials.email,
          role: role,
          image: "https://picsum.photos/150/150",
          status: "approved"
        };

        return user;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
        session.user.id = token.id;
      }
      return session;
    }
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
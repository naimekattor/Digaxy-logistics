import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
      name: "credentials",

      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login/`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          }
        );

        const result = await res.json();

        // 🔴 Pending driver → block login
        if (!res.ok) {
          throw new Error(result.message || "Login failed");
        }

        const { access, refresh, user } = result.data;

        return {
          id: user.id,
          email: user.email,
          name: user.username,
          role: user.role.toLowerCase(),
          driverStatus: user.driver_application_status,
          accessToken: access,
          refreshToken: refresh,
          user,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.role = user.role;
        token.driverStatus = user.driverStatus;
        token.user = user.user;
      }
      return token;
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.role = token.role;
      session.driverStatus = token.driverStatus;
      session.user = token.user;
      return session;
    },
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },
});

export { handler as GET, handler as POST };

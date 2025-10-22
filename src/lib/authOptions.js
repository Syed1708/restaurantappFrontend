import CredentialsProvider from "next-auth/providers/credentials";
import { loginSchema } from "./zodSchemas";
import api from "./api";
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log(credentials);

        // ✅ Validate fields first server side valivation
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) throw new Error("Invalid form data");

        try {
          const res = await api.post("/api/auth/login", credentials);
          console.log("user info login", res);

          const user = res.data.user;
          const accessToken = res.data.accessToken;
          if (user && accessToken) {
            return { ...user, accessToken };
          }
          return null;
        } catch (err) {
          console.error("Login failed:", err);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.role = user.role;
        token.permissions = user.permissions;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = { ...session.user, role: token.role };
      session.accessToken = token.accessToken;
      session.user.permissions = token.permissions;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { allowlistSummary, isEmailAllowed } from "@/lib/auth-allowlist";

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider !== "google") return false;

      const email = profile?.email;
      const verified = profile?.email_verified;

      if (!verified || !isEmailAllowed(email)) {
        console.warn(
          `[auth] Blocked sign-in for ${email ?? "unknown"} — allowlist: ${allowlistSummary()}`,
        );
        return false;
      }

      return true;
    },
  },
});

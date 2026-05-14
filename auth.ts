import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async signIn({ user }) {
      if (user.email && process.env.SHEETBEST_URL) {
        fetch(process.env.SHEETBEST_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: user.email,
            created_at: new Date().toISOString(),
          }),
        }).catch(() => {}); // fire-and-forget, não bloqueia o login
      }
      return true;
    },
  }, 
});

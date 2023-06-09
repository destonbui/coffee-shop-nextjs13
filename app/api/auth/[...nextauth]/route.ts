import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GH_ID as string,
      clientSecret: process.env.GH_CLIENT_SECRET as string,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, account }) {
      const userFromDB = await prisma.user.findUnique({
        where: { email: token.email as string },
      });

      if (!userFromDB) {
        token.role = undefined;
        return token;
      }

      token.role = userFromDB.role;

      return token;
    },

    async session({ token, session }) {
      if (!token) {
        return session;
      }

      session.user.role = token.role;

      return session;
    },
  },
});

export { handler as GET, handler as POST };

import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import { signIn } from "next-auth/react";

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GH_ID as string,
      clientSecret: process.env.GH_CLIENT_SECRET as string,
    }),
  ],
  pages: {
    signIn: "/signin",
    signOut: "/signout",
  },
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
    async signIn({ user }) {
      const userFromDB = await prisma.user.findUnique({
        where: { email: user.email as string },
      });
      if (!userFromDB) {
        return false;
      } else {
        if (userFromDB.role === "ADMIN") {
          return true;
        }
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };

"use client";

import { SessionProvider } from "next-auth/react";

interface NextAuthProviderProps {
  children: React.ReactNode;
}

const NextAuthPovider = ({ children }: NextAuthProviderProps) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default NextAuthPovider;

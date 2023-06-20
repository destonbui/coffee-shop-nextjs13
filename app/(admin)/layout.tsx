import React from "react";
import NextAuthPovider from "@/lib/components/auth/NextAuthProvider";

import "@/lib/styles/global.css";

import { Inter } from "next/font/google";

interface Props {
  children: React.ReactNode;
}

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["vietnamese"],
});

const RootLayout = ({ children }: Props) => {
  return (
    <html lang="vi" className={`${inter.className}`}>
      <head>
        <link
          rel="icon"
          href="https://storage.googleapis.com/pl-nextjs13-bucket/phuclong-logo-main.png"
        />
      </head>

      <NextAuthPovider>
        <body className="m-0 h-full w-full p-0">
          <main className=" min-h-screen bg-white">{children}</main>
        </body>
      </NextAuthPovider>
    </html>
  );
};

export default RootLayout;

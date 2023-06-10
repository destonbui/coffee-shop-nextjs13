import React from "react";
import NextAuthPovider from "@/lib/components/auth/NextAuthProvider";

import "@/lib/styles/global.css";

import { Baloo_2, Arimo } from "next/font/google";

interface Props {
  children: React.ReactNode;
}

const baloo = Baloo_2({
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
  subsets: ["vietnamese"],
  display: "swap",
  variable: "--font-baloo",
});

const arimo = Arimo({
  weight: ["400"],
  style: "normal",
  subsets: ["vietnamese"],
  display: "swap",
  variable: "--font-arimo",
});

const RootLayout = ({ children }: Props) => {
  return (
    <html lang="vi" className={`${baloo.variable} ${arimo.variable}`}>
      <head>
        <link rel="icon" href="./phuclong-logo-main.png" />
      </head>
      {/* @ts-expect-error Server Component */}
      <NextAuthPovider>
        <body className="m-0 h-full w-full p-0">
          <main className=" min-h-screen bg-white">{children}</main>
        </body>
      </NextAuthPovider>
    </html>
  );
};

export default RootLayout;

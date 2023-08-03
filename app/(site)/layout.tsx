import React from "react";
import NextAuthPovider from "@/lib/components/auth/NextAuthProvider";

import "@/lib/styles/global.css";
import Navbar from "@/lib/components/navigation/Navbar";
import Footer from "@/lib/components/navigation/Footer";

import { Baloo_2, Arimo } from "next/font/google";
import { NavbarVisibilityContextProvider } from "@/lib/contexts/NavbarVisibilityContext";

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
      <NextAuthPovider>
        <body className="root">
          <main className="main">
            <NavbarVisibilityContextProvider>
              <Navbar />

              <div className="content_wrapper">
                <div className="content">{children}</div>
                <Footer />
              </div>
            </NavbarVisibilityContextProvider>
          </main>
        </body>
      </NextAuthPovider>
    </html>
  );
};

export default RootLayout;

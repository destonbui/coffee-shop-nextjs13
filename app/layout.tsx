import React from "react";
import NextAuthPovider from "@/lib/components/auth/NextAuthProvider";

import "@/lib/styles/global.css";
import Navbar from "@/lib/components/navigation/Navbar";
import Footer from "@/lib/components/navigation/Footer";

interface Props {
  children: React.ReactNode;
}

const RootLayout = ({ children }: Props) => {
  return (
    <html>
      <head>
        <link rel="icon" href="./phuclong-logo-main.png" />
      </head>
      <NextAuthPovider>
        <body className={`root`}>
          <main className="main">
            <Navbar />
            <div className="content_wrapper">
              <div className="content">{children}</div>
              <Footer />
            </div>
          </main>
        </body>
      </NextAuthPovider>
    </html>
  );
};

export default RootLayout;

import React from "react";
import NextAuthPovider from "@/lib/components/NextAuthProvider";
import { Roboto } from "next/font/google";
import "@/lib/styles/global.css";

interface Props {
  children: React.ReactNode;
}

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

const layout = ({ children }: Props) => {
  return (
    <html>
      <head>{/* brower icon and links */}</head>
      <NextAuthPovider>
        <body className={`root ${roboto.className}`}>
          <main className="main">
            <div className="w-full">{children}</div>
          </main>
        </body>
      </NextAuthPovider>
    </html>
  );
};

export default layout;

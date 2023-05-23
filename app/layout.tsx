import NextAuthPovider from "@/lib/components/NextAuthProvider";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const layout = ({ children }: Props) => {
  return (
    <html>
      <head>{/* brower icon and links */}</head>
      <NextAuthPovider>
        <body className="app_root">
          <main className="main">{children}</main>
        </body>
      </NextAuthPovider>
    </html>
  );
};

export default layout;

import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth({
  callbacks: {
    authorized: ({ token }) => token?.role === "ADMIN",
  },
  pages: {
    signIn: "/signin",
  },
});

export const config = {
  matcher: ["/signin", "/dashboard/:path*", "/api/:endpoint*"],
};

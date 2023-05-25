import React from "react";

import { Metadata } from "next";
import UserDisplay from "@/lib/components/auth/UserDisplay";

interface HomeProps {}

export const metadata: Metadata = {
  title: "Home page",
  description: "Welcome to our coffee shop",
};

const Home = ({}: HomeProps) => {
  return (
    <div>
      <h1 className="h6">Hello Home page</h1>
      <UserDisplay />
    </div>
  );
};

export default Home;

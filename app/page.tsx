import React from "react";

import { Metadata } from "next";
import UserDisplay from "@/lib/components/auth/UserDisplay";

interface HomeProps {}

export const metadata: Metadata = {
  title: "Phúc Long Coffee & Tea",
  description:
    "Trải qua hơn 50 năm chắt chiu tinh hoa từ những búp trà xanh và hạt cà phê thượng hạng cùng mong muốn mang lại cho khách hàng những trải nghiệm giá trị nhất khi thưởng thức.",
};

const Home = ({}: HomeProps) => {
  return (
    <>
      <h1 className="h6 mt-4">Hello Home page</h1>
    </>
  );
};

export default Home;

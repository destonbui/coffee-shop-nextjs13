import React from "react";

import { Metadata } from "next";

import HeroCarousel from "@/lib/components/section/HeroCarousel";

import carouselImg1 from "@/public/longan-mua-2-tang-1.jpg";
import carouselImg2 from "@/public/refreshing-longan.jpg";
import carouselImg3 from "@/public/rewards-banner.jpg";
import carouselImg4 from "@/public/coconut-caramel.jpg";

interface HomeProps {}

export const metadata: Metadata = {
  title: "Phúc Long Coffee & Tea",
  description:
    "Trải qua hơn 50 năm chắt chiu tinh hoa từ những búp trà xanh và hạt cà phê thượng hạng cùng mong muốn mang lại cho khách hàng những trải nghiệm giá trị nhất khi thưởng thức.",
};

const Home = ({}: HomeProps) => {
  return (
    <>
      <HeroCarousel
        items={[
          { src: carouselImg1, alt: "Longan mua 2 tặng 1.", link: "#" },
          { src: carouselImg2, alt: "Refreshing Longan", link: "#" },
          { src: carouselImg4, alt: "Coconut Caramel", link: "#" },
          { src: carouselImg3, alt: "Rewards", link: "#" },
        ]}
      />
    </>
  );
};

export default Home;

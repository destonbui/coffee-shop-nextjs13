import React from "react";

import { Metadata } from "next";

import HeroCarousel from "@/lib/components/section/HeroCarousel";

import carouselImg1 from "@/public/longan-mua-2-tang-1.jpg";
import carouselImg2 from "@/public/refreshing-longan.jpg";
import carouselImg3 from "@/public/rewards-banner.jpg";
import carouselImg4 from "@/public/coconut-caramel.jpg";
import CategoriesNav from "@/lib/components/section/CategoriesNav";

interface HomeProps {}

export const metadata: Metadata = {
  title: "Phúc Long Coffee & Tea",
  description:
    "Trải qua hơn 50 năm chắt chiu tinh hoa từ những búp trà xanh và hạt cà phê thượng hạng cùng mong muốn mang lại cho khách hàng những trải nghiệm giá trị nhất khi thưởng thức.",
};

async function fetchBanners() {
  const endpoint = process.env.HOST + "/api/banners";

  const res = await fetch(endpoint, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Fetch banners failed");
  }

  return res.json();
}

const Home = async ({}: HomeProps) => {
  const banners = await fetchBanners();

  return (
    <>
      <HeroCarousel items={banners} />

      <CategoriesNav />
    </>
  );
};

export default Home;

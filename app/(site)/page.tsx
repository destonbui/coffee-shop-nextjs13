import React from "react";

import { Metadata } from "next";

import HeroCarousel from "@/lib/components/section/HeroCarousel";

import CategoriesNav from "@/lib/components/section/CategoriesNav";
import { Category } from "@prisma/client";

interface HomeProps {}

export const metadata: Metadata = {
  title: "Phúc Long Coffee & Tea",
  description:
    "Trải qua hơn 50 năm chắt chiu tinh hoa từ những búp trà xanh và hạt cà phê thượng hạng cùng mong muốn mang lại cho khách hàng những trải nghiệm giá trị nhất khi thưởng thức.",
};

async function fetchData() {
  const fetchBanners = fetch(process.env.HOST + "/api/banners", {
    next: { revalidate: 60 },
  });

  const fetchCategories = fetch(process.env.HOST + "/api/categories", {
    next: { revalidate: 60 },
  });

  const [bannersData, categoriesData] = await Promise.all([
    fetchBanners,
    fetchCategories,
  ]);

  const banners = await bannersData.json();
  const categories = await categoriesData.json();

  return { banners, categories };
}

const Home = async ({}: HomeProps) => {
  const { banners, categories } = await fetchData();

  return (
    <>
      <HeroCarousel items={banners} />

      <CategoriesNav categories={categories} />
    </>
  );
};

export default Home;

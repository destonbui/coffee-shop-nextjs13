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

async function fetchBanners() {
  const res = await fetch(process.env.HOST + "/api/banners", {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Fetch banners failed");
  }

  return res.json();
}

async function fetchCategories() {
  const res = await fetch(process.env.HOST + "/api/categories", {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Fetch categories failed");
  }

  return res.json();
}

const Home = async ({}: HomeProps) => {
  const bannersData = fetchBanners();
  const categoriesData = fetchCategories();

  const [banners, categories] = await Promise.all([
    bannersData,
    categoriesData,
  ]);

  return (
    <>
      <HeroCarousel items={banners} />

      <CategoriesNav categories={categories} />
    </>
  );
};

export default Home;

import React from "react";

import { Metadata } from "next";

import HeroCarousel from "@/lib/components/section/HeroCarousel";

import CategoriesNav from "@/lib/components/section/CategoriesNav";
import { Product } from "@prisma/client";
import Image from "next/image";
import { toVND } from "@/lib/utils/numberToCurrency";
import { PlusIcon } from "@radix-ui/react-icons";
import FeaturedProductsDisplay from "@/lib/components/section/FeaturedProductsDisplay";

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

async function fetchCategories() {
  const endpoint = process.env.HOST + "/api/categories";

  const res = await fetch(endpoint, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Fetch categories failed");
  }

  return res.json();
}

async function fetchFeaturedProducts() {
  const endpoint = process.env.HOST + "/api/products?featured=true";

  const res = await fetch(endpoint, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Internal Server Error");
  }

  return res.json();
}

const Home = async ({}: HomeProps) => {
  const bannersData = fetchBanners();
  const featuredProductsData = fetchFeaturedProducts();
  // const categoriesData = fetchCategories();

  const [banners, featuredProducts] = await Promise.all([
    bannersData,
    featuredProductsData,
  ]);

  return (
    <>
      <HeroCarousel items={banners} />

      {/* <CategoriesNav categories={categories} /> */}
      {/* Featured section */}
      <FeaturedProductsDisplay featuredProducts={featuredProducts} />
    </>
  );
};

export default Home;

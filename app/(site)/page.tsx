import React from "react";

import { Metadata } from "next";

import HeroCarousel from "@/lib/components/section/HeroCarousel";

import CategoriesNav from "@/lib/components/section/CategoriesNav";
import { Banner, Category, Product } from "@prisma/client";
import FeaturedProductsDisplay from "@/lib/components/section/FeaturedProductsDisplay";

import SubcategoriesDisplay from "@/lib/components/section/SubcategoriesDisplay";
import SearchMobile from "@/lib/components/ui/navbar/SearchMobile";
import ShippingAddressMobile from "@/lib/components/ui/navbar/ShippingAddressMobile";
import { NavbarVisibilityContextProvider } from "@/lib/contexts/NavbarVisibilityContext";

interface HomeProps {}

export const metadata: Metadata = {
  title: "Phúc Long Coffee & Tea",
  description:
    "Trải qua hơn 50 năm chắt chiu tinh hoa từ những búp trà xanh và hạt cà phê thượng hạng cùng mong muốn mang lại cho khách hàng những trải nghiệm giá trị nhất khi thưởng thức.",
};

async function fetchBanners(): Promise<Banner[]> {
  const endpoint = process.env.HOST + "/api/banners";

  const res = await fetch(endpoint, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Fetch banners failed");
  }

  return res.json();
}

async function fetchCategories(): Promise<Category[]> {
  const endpoint = process.env.HOST + "/api/categories";

  const res = await fetch(endpoint, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Fetch categories failed");
  }

  return res.json();
}

async function fetchFeaturedProducts(): Promise<Product[]> {
  const endpoint = process.env.HOST + "/api/products?featured=1&limit=4";

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
  const categoriesData = fetchCategories();
  const featuredProductsData = fetchFeaturedProducts();

  const [banners, featuredProducts, categories] = await Promise.all([
    bannersData,
    featuredProductsData,
    categoriesData,
  ]);

  return (
    <>
      {/* <div
        id="sticky-content"
        className="sticky top-0 z-0 flex max-h-screen flex-col overflow-y-auto md:relative md:max-h-full"
      > */}

      <HeroCarousel items={banners} />

      <div className="sticky top-0 z-50 flex h-28 flex-col bg-white pt-2 md:hidden">
        <ShippingAddressMobile />

        <SearchMobile />
      </div>

      <hr className=" md:hidden" />

      <CategoriesNav categories={categories} />

      <hr className="mb-4 md:mb-6 lg:mb-8" />
      {/* Featured section */}
      <FeaturedProductsDisplay featuredProducts={featuredProducts} />

      <hr className="my-4 md:my-6 lg:my-8" />
      {/* </div> */}

      <SubcategoriesDisplay />
    </>
  );
};

export default Home;

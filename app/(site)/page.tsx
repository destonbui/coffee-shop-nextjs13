import React from "react";

import { Metadata } from "next";

import HeroCarousel from "@/lib/components/section/HeroCarousel";

import CategoriesNav from "@/lib/components/section/CategoriesNav";
import { Product } from "@prisma/client";
import Image from "next/image";
import { toVND } from "@/lib/utils/numberToCurrency";
import { PlusIcon } from "@radix-ui/react-icons";

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
  const featuredProductsData: Promise<Product[]> = fetchFeaturedProducts();
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
      <section id="featured" className="mt-4 flex flex-col">
        <h2 className=" text-center font-baloo text-2xl  font-semibold capitalize text-theme-green-main">
          Sản phẩm nổi bật
        </h2>
        <p className="subtitle1 hidden px-[5%] text-center font-arimo text-gray-700 md:block">
          Trải qua hơn 50 năm chắt chiu tinh hoa từ những búp trà xanh và hạt cà
          phê thượng hạng cùng mong muốn mang lại cho khách hàng những trải
          nghiệm giá trị nhất khi thưởng thức.
        </p>

        <div
          id="featured-products-display"
          className="flex max-w-full gap-4 overflow-x-auto px-4 py-2"
        >
          {featuredProducts[0] &&
            featuredProducts.map((product) => {
              return (
                <div
                  key={product.id}
                  className="flex h-[120px] w-[250px] max-w-[350px] flex-shrink-0 rounded-md bg-theme-green-main/5 py-4 shadow"
                >
                  <div className="relative h-full w-[80px] flex-shrink-0 drop-shadow-sm">
                    <Image
                      src={product.image_url}
                      fill
                      style={{ objectFit: "contain" }}
                      alt={product.name}
                      placeholder="blur"
                      blurDataURL={product.image_blurUrl}
                    />
                  </div>
                  <div className="mr-4 flex flex-grow flex-col">
                    <p className="font-baloo text-base font-medium text-gray-700">
                      {product.name}
                    </p>
                    <div className="flex-grow" />
                    <div className="flex items-center gap-2">
                      <span className="flex-1  font-baloo text-xl font-bold text-theme-green-main">
                        {toVND(product.price)}
                      </span>
                      <button className="flex h-6 w-6 items-center justify-center rounded-md bg-theme-green-main text-white">
                        <PlusIcon />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </section>
    </>
  );
};

export default Home;

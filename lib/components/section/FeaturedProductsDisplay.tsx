import React from "react";

import Image from "next/image";
import { Product } from "@prisma/client";
import { toVND } from "@/lib/utils/numberToCurrency";
import { HeartIcon, PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";

type Props = {
  featuredProducts: Product[];
};

const FeaturedProductsDisplay = ({ featuredProducts }: Props) => {
  return (
    <section id="featured" className="mt-2 flex flex-col">
      <div className="mx-4 flex items-center">
        <h2 className="flex-grow font-baloo text-2xl font-semibold capitalize  text-theme-green-main md:text-center md:text-3xl lg:text-4xl">
          Sản phẩm nổi bật
        </h2>
        <Link
          href={"#"}
          className="font-baloo text-sm font-medium text-theme-green-main underline md:hidden "
        >
          Xem thêm
        </Link>
      </div>
      <p className="subtitle1 hidden px-[5%] text-center font-arimo text-gray-700 md:block">
        Trải qua hơn 50 năm chắt chiu tinh hoa từ những búp trà xanh và hạt cà
        phê thượng hạng cùng mong muốn mang lại cho khách hàng những trải nghiệm
        giá trị nhất khi thưởng thức.
      </p>

      <div
        id="featured-products-display"
        className="flex max-w-full gap-4 overflow-x-auto px-4 py-2 md:mt-4 xl:justify-center "
      >
        {featuredProducts &&
          featuredProducts.map((product) => {
            return (
              <div
                key={product.id}
                className="relative flex w-[250px] max-w-[350px] flex-shrink-0 overflow-hidden rounded-md bg-gray-100 pb-4 pt-6 shadow"
              >
                <div className="absolute left-0 top-0 rounded-br-md bg-yellow-500 px-2 font-baloo text-sm text-white shadow-sm shadow-yellow-600/20">
                  258 lượt mua
                </div>
                <div className="relative h-[80px] w-[80px] flex-shrink-0">
                  <Image
                    className="drop-shadow"
                    src={product.image_url}
                    fill
                    style={{ objectFit: "contain" }}
                    alt={product.name}
                    placeholder="blur"
                    blurDataURL={product.image_blurUrl}
                  />
                </div>
                <div className="mr-4 flex flex-grow flex-col">
                  <p className="line font-baloo text-base font-medium leading-tight text-gray-700">
                    {product.name}
                  </p>
                  <div className="flex-grow" />
                  {/* <div className="flex items-center gap-2 text-gray-500">
                    <HeartIcon />
                    125
                  </div> */}
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

      <Link
        href={"#"}
        className="mt-2 hidden text-center font-baloo text-base font-medium text-theme-green-main underline md:block "
      >
        Xem thêm
      </Link>
    </section>
  );
};

export default FeaturedProductsDisplay;

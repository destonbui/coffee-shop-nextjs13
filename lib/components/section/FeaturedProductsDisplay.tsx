import React from "react";

import Image from "next/image";
import { Product } from "@prisma/client";
import { toVND } from "@/lib/utils/numberToCurrency";
import { PlusIcon } from "@radix-ui/react-icons";

type Props = {
  featuredProducts: Product[];
};

const FeaturedProductsDisplay = ({ featuredProducts }: Props) => {
  return (
    <section id="featured" className="mt-4 flex flex-col">
      <h2 className=" text-center font-baloo text-2xl  font-semibold capitalize text-theme-green-main">
        Sản phẩm nổi bật
      </h2>
      <p className="subtitle1 hidden px-[5%] text-center font-arimo text-gray-700 md:block">
        Trải qua hơn 50 năm chắt chiu tinh hoa từ những búp trà xanh và hạt cà
        phê thượng hạng cùng mong muốn mang lại cho khách hàng những trải nghiệm
        giá trị nhất khi thưởng thức.
      </p>

      <div
        id="featured-products-display"
        className="flex max-w-full gap-4 overflow-x-auto px-4 py-2"
      >
        {featuredProducts &&
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
  );
};

export default FeaturedProductsDisplay;

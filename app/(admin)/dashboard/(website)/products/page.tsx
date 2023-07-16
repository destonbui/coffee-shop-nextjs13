import React from "react";

import AddProductButton from "@/lib/components/ui/products/AddProductButton";
import { actionFetchProducts } from "./actions";
import Image from "next/image";

interface Props {}

const Products = async (props: Props) => {
  const { products } = await actionFetchProducts();

  return (
    <>
      <h1 className="h4 text-theme-green-main">Products</h1>
      <p className="body1">Thêm, xóa, chỉnh sửa sản phẩm.</p>

      {/* Add banner dialog */}
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <h2 className="h6 flex-grow text-theme-green-main">Products</h2>
        <div className="flex items-center gap-4">
          <AddProductButton />
        </div>
      </div>

      <hr className="my-2 border-gray-300" />

      {/* Products display */}
      <div className="flex flex-wrap gap-2">
        {products?.map((product) => {
          return (
            <div
              key={product.name}
              className="flex w-[200px] flex-col rounded-md bg-white p-4 shadow"
            >
              <div className="flex justify-center py-4">
                <Image
                  src={product.image_url}
                  alt={product.name}
                  width={150}
                  height={150}
                />
              </div>

              <div className="flex flex-col">
                <h6 className="mt-4 text-lg font-semibold text-theme-green-main">
                  {product.name}
                </h6>
                <span>{product.price}</span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Products;

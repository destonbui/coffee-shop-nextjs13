import React from "react";

import AddProductButton from "@/lib/components/ui/products/AddProductButton";
import { actionFetchCategories, actionFetchProducts } from "./actions";

import CategoriesDisplay from "@/lib/components/ui/products/CategoriesDisplay";

interface Props {}

const Products = async (props: Props) => {
  const [{ categories }, { products }] = await Promise.all([
    actionFetchCategories(),
    actionFetchProducts(),
  ]);

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

      {/* Categories display */}
      {products && categories && (
        <CategoriesDisplay categories={categories} products={products} />
      )}
    </>
  );
};

export default Products;

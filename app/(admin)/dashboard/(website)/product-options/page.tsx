import React from "react";

import AddOptionButton from "@/lib/components/ui/options/AddOptionButton";

interface Props {}

const Products = async (props: Props) => {
  // const { categories, error } = await actionFetchCategories();

  // if (error) {
  //   throw new Error("Fetch categories failed");
  // }

  return (
    <>
      <h1 className="h4 text-theme-green-main">Product Options</h1>
      <p className="body1">
        Thêm, xóa, chỉnh sửa các mục lựa chọn và topping trên các sản phẩm thức
        uống.
      </p>

      {/* Add banner dialog */}
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <h2 className="h6 flex-grow text-theme-green-main">Options</h2>
        <div className="flex items-center gap-4">
          <AddOptionButton />
        </div>
      </div>

      <hr className="my-2 border-gray-300" />

      {/*  */}
    </>
  );
};

export default Products;

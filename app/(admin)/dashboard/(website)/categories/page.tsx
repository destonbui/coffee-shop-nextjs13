import React from "react";

import AddCategoryButton from "@/lib/components/ui/category/AddCategoryButton";
import { actionFetchCategories } from "./actions";
import CategoriesTableDisplay from "@/lib/components/ui/category/CategoriesTableDisplay";

interface Props {}

const Categories = async (props: Props) => {
  const { categories, error } = await actionFetchCategories();

  if (error) {
    throw new Error("Fetch categories failed");
  }

  return (
    <>
      <h1 className="h4 text-theme-green-main">Categories</h1>
      <p className="body1">Thêm, xóa, chỉnh sửa các danh mục sản phẩm.</p>

      {/* Add banner dialog */}
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <h2 className="h6 flex-grow text-theme-green-main">Categories</h2>
        <div className="flex items-center gap-4">
          <AddCategoryButton />
        </div>
      </div>

      <hr className="my-2 border-gray-300" />

      {!categories ? (
        "Error fetching categories"
      ) : categories[0] ? (
        <CategoriesTableDisplay categories={categories} />
      ) : (
        "There is no category to display"
      )}
    </>
  );
};

export default Categories;

import AddCategoryButton from "@/lib/components/ui/category/AddCategoryButton";
import React from "react";

interface Props {}

const loading = (props: Props) => {
  return (
    <>
      <h1 className="h4 text-theme-green-main">Categories</h1>
      <p className="body1">Thêm, xóa, chỉnh sửa các danh mục sản phẩm.</p>

      {/* Add banner dialog */}
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <h2 className="h6 flex-grow text-theme-green-main">Banners</h2>
        <div className="flex items-center gap-4">
          <AddCategoryButton />
        </div>
      </div>

      <hr className="my-2 border-gray-300" />

      <div className="flex items-center gap-2">
        <div className="relative h-6 w-6">
          {/* Loading spinner */}
          <div className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full ">
            <div
              className={`relative h-full w-full animate-spin bg-theme-green-main`}
            >
              <div className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-200">
                <div className="absolute right-0 top-0 h-5 w-5 translate-x-1/2 translate-y-1/2 bg-gray-200"></div>
              </div>
            </div>
          </div>
        </div>
        <span className="font-semibold text-gray-400/80">
          Loading categories...
        </span>
      </div>
    </>
  );
};

export default loading;

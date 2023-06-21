import React from "react";

import AddCategoryButton from "@/lib/components/ui/category/AddCategoryButton";

interface Props {}

const Categories = async (props: Props) => {
  // const { banners, error } = await actionFetchBanner();

  // if (error) {
  //   throw new Error("Fetch banners failed");
  // }

  if (true) {
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

        {/* Banners display
        {!banners[0] && (
          <div className="flex flex-wrap gap-4">
            <p className="body2 text-gray-700">Không có banner để hiển thị</p>
          </div>
        )}

        {banners[0] && <BannerDisplay banners={banners} />} */}
      </>
    );
  }
};

export default Categories;

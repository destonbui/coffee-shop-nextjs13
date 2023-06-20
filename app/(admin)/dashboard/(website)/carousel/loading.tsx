import AddBannerButton from "@/lib/components/ui/carousel/AddBannerButton";
import BannerItemSkeleton from "@/lib/components/ui/carousel/BannerItemSkeleton";
import React from "react";

interface Props {}

const loading = (props: Props) => {
  return (
    <>
      <h1 className="h4 text-theme-green-main">Website Hero Carousel</h1>
      <p className="body1">
        Thêm, chỉnh sửa hoặc thay đổi vị trí hiển thị của các banner trong
        carousel trên website
      </p>

      {/* Add banner dialog */}
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <h2 className="h6 flex-grow text-theme-green-main">Banners</h2>
        <div className="flex items-center gap-4">
          <AddBannerButton />
        </div>
      </div>

      <hr className="my-2 border-gray-300" />

      <div className="my-4 flex flex-wrap gap-4">
        {[1, 2, 3, 4].map((i) => {
          return <BannerItemSkeleton key={i} />;
        })}
      </div>
    </>
  );
};

export default loading;

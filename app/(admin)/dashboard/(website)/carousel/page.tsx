import React from "react";

import { Banner } from "@prisma/client";

import AddBannerButton from "@/lib/components/ui/carousel/AddBannerButton";
import BannerDisplay from "@/lib/components/ui/carousel/BannerDisplay";

interface Props {}

const HeroCarousel = async (props: Props) => {
  async function getBanners(): Promise<Banner[]> {
    const endpoint = `${process.env.HOST}/api/banners`;
    const result = await fetch(endpoint, {
      method: "GET",
      cache: "no-store",
    });

    if (!result.ok) {
      throw new Error("Failed to fetch data");
    }

    return result.json();
  }

  const banners = await getBanners();

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

          {/* <Button
            iconEl={<EditIcon className="body1 z-20 text-theme-green-main" />}
            variant="outline"
          >
            Sắp xếp vị trí
          </Button> */}
        </div>
      </div>

      <hr className="my-2 border-gray-300" />

      {/* Banners display */}
      {!banners[0] && (
        <div className="flex flex-wrap gap-4">
          <p className="body2 text-gray-700">Không có banner để hiển thị</p>
        </div>
      )}

      {banners[0] && <BannerDisplay banners={banners} />}
    </>
  );
};

export default HeroCarousel;

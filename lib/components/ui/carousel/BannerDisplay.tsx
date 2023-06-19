import { Banner } from "@prisma/client";

import React from "react";
import BannerItem from "./BannerItem";

interface Props {
  banners: Banner[];
}

const BannerDisplay = ({ banners }: Props) => {
  const totalBanners = banners.length;

  return (
    <div className="my-4 flex flex-wrap gap-4">
      {banners.map((banner, i) => {
        return (
          <BannerItem
            key={banner.id}
            data={banner}
            {...(i === 0
              ? { backwardPos: banners[i + 1].position + 1 }
              : i === totalBanners - 1
              ? { forwardPos: banners[i - 1].position - 1 }
              : {
                  forwardPos: banners[i - 1].position - 1,
                  backwardPos: banners[i + 1].position + 1,
                })}
          />
        );
      })}
    </div>
  );
};

export default BannerDisplay;

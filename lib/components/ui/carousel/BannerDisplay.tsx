import { Banner } from "@prisma/client";

import React from "react";
import BannerItem from "./BannerItem";

interface Props {
  banners: Banner[];
}

const BannerDisplay = ({ banners }: Props) => {
  return (
    <div className="mt-4 flex flex-wrap gap-4">
      {banners.map((banner) => {
        return <BannerItem key={banner.id} data={banner} />;
      })}
    </div>
  );
};

export default BannerDisplay;

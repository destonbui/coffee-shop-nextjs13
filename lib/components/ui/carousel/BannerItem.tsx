"use client";

import { Banner } from "@prisma/client";
import React from "react";
import Image from "next/image";

import { AspectRatio } from "@radix-ui/react-aspect-ratio";

interface Props {
  data: Banner;
}

const BannerItem = ({ data }: Props) => {
  return (
    <div className="flex w-[300px] flex-col gap-2 overflow-hidden rounded-md bg-gray-100 p-2 shadow-md">
      {/* <div className="-mx-2 -mt-2 flex h-[25px] flex-row-reverse">
        <button></button>
      </div> */}

      {/* details */}
      <AspectRatio ratio={12 / 5} className="-mx-2 -mt-2">
        <Image
          src={data.image_url}
          width={1280}
          height={534}
          alt={data.description}
          className="h-auto w-full"
        />
      </AspectRatio>
      <div className="mt-2 flex flex-col gap-1">
        <p>Position: {data.position}</p>
        <p>Description: {data.description}</p>
        <p>Link: {data.href ? data.href : "undefined"}</p>
      </div>
    </div>
  );
};

export default BannerItem;

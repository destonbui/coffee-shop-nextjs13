"use client";

import { Banner } from "@prisma/client";
import React from "react";
import Image from "next/image";

import { AspectRatio } from "@radix-ui/react-aspect-ratio";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

interface Props {
  data: Banner;
}

const BannerItem = ({ data }: Props) => {
  return (
    <div className="flex w-[300px] flex-col overflow-hidden rounded-md bg-gray-100 p-2 shadow-md">
      <div className="-mx-2 -mt-2 flex h-8 flex-row-reverse items-center gap-2 px-2">
        {/* Delete btn */}
        <button className="flex h-6 w-6 items-center justify-center rounded-full p-1 transition-all duration-300 ease-in-out hover:bg-red-100 active:scale-90 active:bg-red-300">
          <DeleteForeverIcon className="flex h-5 items-center justify-center text-red-700" />
        </button>

        {/* Display state chip */}
        <div
          className={`flex items-center gap-1 rounded-full border ${
            data.active ? "border-theme-green-main" : "border-gray-500"
          } px-2`}
        >
          <span className="text-sm font-normal">
            {data.active ? "Active" : "Inactive"}
          </span>
          <div
            className={`h-3 w-3 rounded-full ${
              data.active ? "bg-theme-green-main" : "bg-gray-400"
            } shadow-sm`}
          />
        </div>
      </div>

      {/* details */}
      <AspectRatio ratio={12 / 5} className="-mx-2">
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

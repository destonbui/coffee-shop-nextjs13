"use client";

import { Banner } from "@prisma/client";
import React from "react";
import Image from "next/image";

import { AspectRatio } from "@radix-ui/react-aspect-ratio";

import DeleteItemBtn from "./item/DeleteItemBtn";
import ActiveDisplay from "./item/ActiveDisplay";
import DetailDisplay from "./item/DetailDisplay";
import ChangePositionBtn from "./item/ChangePositionBtn";

interface Props {
  data: Banner;
  forwardPos?: number;
  backwardPos?: number;
}

const BannerItem = ({ data, forwardPos, backwardPos }: Props) => {
  return (
    <div className="flex w-[300px] flex-col overflow-hidden rounded-md bg-gray-100 p-2 shadow-md">
      <div className="-mx-2 -mt-2 flex h-8 flex-row-reverse items-center gap-2 px-2">
        {/* Delete btn */}
        <DeleteItemBtn id={data.id} />

        {/* Display state chip */}
        <ActiveDisplay id={data.id} active={data.active} />

        <div className="flex-grow" />

        <ChangePositionBtn
          id={data.id}
          direction="right"
          {...(backwardPos ? { newPos: backwardPos } : {})}
        />

        <ChangePositionBtn
          id={data.id}
          direction="left"
          {...(forwardPos ? { newPos: forwardPos } : {})}
        />
      </div>

      {/* details */}
      <AspectRatio ratio={12 / 5} className="-mx-2">
        <Image
          priority
          src={data.image_url}
          width={1280}
          height={534}
          alt={data.description}
          className="h-auto w-full"
        />
      </AspectRatio>

      {/* Banner details */}
      <div className="mt-4 flex flex-col gap-2">
        <DetailDisplay
          id={data.id}
          title="Description"
          value={data.description}
        />

        <DetailDisplay
          id={data.id}
          title="Link"
          value={data.href ? data.href : "undefined"}
        />
      </div>
    </div>
  );
};

export default BannerItem;

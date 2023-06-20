import React from "react";

interface Props {}

const BannerItemSkeleton = (props: Props) => {
  return (
    <div className="flex min-h-[270px] w-[300px] flex-col rounded-md bg-white px-2 pt-2 shadow-md">
      <div className="-mx-2 mt-6 h-[125px] animate-pulse bg-gray-400 " />

      <div className="mt-4 flex flex-col gap-2">
        <div className="mx-2 h-[10px] w-[75px] animate-pulse rounded-full bg-gray-400" />
        <div className="mx-2 h-[10px] w-[150px] animate-pulse rounded-full bg-gray-300" />
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <div className="mx-2 h-[10px] w-[50px] animate-pulse rounded-full bg-gray-400" />
        <div className="mx-2 h-[10px] w-[100px] animate-pulse rounded-full bg-gray-300" />
      </div>
    </div>
  );
};

export default BannerItemSkeleton;

import Image, { StaticImageData } from "next/image";
import React from "react";

export interface CategoryItemProps {
  src: string | StaticImageData;
  title: string;
}

const CategoryItem = ({ src, title }: CategoryItemProps) => {
  return (
    <div
      className={`flex flex-col gap-2 flex-shrink-0 justify-center w-[80px] md:w-[100px] py-2 rounded-md hover:bg-gray-100 hover:border-b-4 hover:border-theme-green-main bg-transparent transition duration-500 ease-in-out`}
    >
      <Image
        className="h-[40px] lg:h-[80px] w-auto pointer-events-none mx-auto"
        src={src}
        alt={title}
        height={116}
        width={116}
        priority
      />

      <span className="text-center text-sm md:text-base font-medium pointer-events-none text-theme-green-main font-baloo">
        {title}
      </span>
    </div>
  );
};

export default CategoryItem;

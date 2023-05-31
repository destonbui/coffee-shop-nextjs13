import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import React from "react";

export interface CategoryItemProps {
  src: string | StaticImageData;
  title: string;
  link: string;
}

const CategoryItem = ({ src, title, link }: CategoryItemProps) => {
  return (
    <Link href={link}>
      <div
        className={`flex flex-col gap-2 flex-shrink-0 justify-center w-[80px] py-2 rounded-md hover:bg-gray-100 hover:border-b-4 hover:border-theme-green-main bg-transparent transition duration-500 ease-in-out active:bg-gray-200 active:border-b-2`}
      >
        <Image
          className="h-[40px] lg:h-[60px] w-auto pointer-events-none mx-auto"
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
    </Link>
  );
};

export default CategoryItem;

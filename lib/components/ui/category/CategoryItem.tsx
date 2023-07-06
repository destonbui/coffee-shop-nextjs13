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
    <Link href={link} as={link}>
      <div
        className={`flex w-[80px] flex-shrink-0 flex-col justify-center gap-2 rounded-md bg-transparent pt-2 transition duration-150 ease-linear hover:border-b-4 hover:border-theme-green-main hover:bg-gray-100 hover:shadow-md hover:shadow-gray-900/25 active:border-b-2 active:bg-gray-200 active:shadow active:shadow-gray-900/25`}
      >
        <Image
          className="pointer-events-none mx-auto h-[40px] w-auto lg:h-[60px]"
          src={src}
          alt={title}
          height={116}
          width={116}
          priority
        />

        <span className="pointer-events-none text-center font-baloo text-sm font-medium text-theme-green-main md:text-base">
          {title}
        </span>
      </div>
    </Link>
  );
};

export default CategoryItem;

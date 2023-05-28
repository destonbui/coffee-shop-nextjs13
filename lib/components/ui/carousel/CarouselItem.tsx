"use client";

import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";

export interface CarouselItemProps {
  src: string | StaticImageData;
  alt: string;
  link: string;
  active?: Boolean;
}

const CarouselItem = ({ src, alt, link, active }: CarouselItemProps) => {
  const router = useRouter();

  return (
    <Image
      priority={true}
      className={`w-full h-auto top-0 cursor-pointer ${
        active
          ? "z-10 relative opacity-100 translate-x-0"
          : "z-0 absolute opacity-0 translate-x-full delay-700"
      } transition duration-700 ease-in-out`}
      onClick={() => {
        router.push(link);
      }}
      src={src}
      width={1280}
      height={534}
      placeholder="blur"
      alt={alt}
    />
  );
};

export default CarouselItem;

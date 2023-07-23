"use client";

import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";

export interface CarouselItemProps {
  src: string | StaticImageData;
  blurUrl: string;
  alt: string;
  link: string;
  active?: Boolean;
}

const CarouselItem = ({
  src,
  blurUrl,
  alt,
  link,
  active,
}: CarouselItemProps) => {
  const router = useRouter();

  return (
    <Image
      className={`top-0 h-auto w-full cursor-pointer ${
        active
          ? "relative z-10 translate-x-0 opacity-100"
          : "absolute z-0 translate-x-full opacity-0 delay-700"
      } transition duration-700 ease-in-out`}
      onClick={() => {
        router.push(link);
      }}
      src={src}
      width={1280}
      height={534}
      alt={alt}
      placeholder="blur"
      blurDataURL={blurUrl}
    />
  );
};

export default CarouselItem;

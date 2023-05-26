import React from "react";
import Image from "next/image";
import storeSvg from "@/public/building-store.svg";

interface Props {}

const StoreIcon = (props: Props) => {
  return (
    <Image
      className="h-9 w-auto cursor-pointer"
      src={storeSvg}
      width={24}
      height={24}
      alt="Shopping bag"
    />
  );
};

export default StoreIcon;

import React from "react";
import Image from "next/image";
import bagSvg from "@/public/shopping-bag.svg";

interface Props {}

const BagIcon = (props: Props) => {
  return (
    <Image
      className="pointer-events-none h-9 w-auto"
      src={bagSvg}
      width={24}
      height={24}
      alt="Shopping bag"
    />
  );
};

export default BagIcon;

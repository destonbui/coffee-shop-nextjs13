import React from "react";
import Image from "next/image";
import bagSvg from "@/public/shopping-bag.svg";

interface Props {}

const BagIcon = (props: Props) => {
  return (
    <Image
      className="h-9 w-auto pointer-events-none"
      src={bagSvg}
      width={24}
      height={24}
      alt="Shopping bag"
    />
  );
};

export default BagIcon;

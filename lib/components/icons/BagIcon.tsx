import React from "react";
import Image from "next/image";
import bagSvg from "@/public/shopping-bag.svg";

interface Props {}

const BagIcon = (props: Props) => {
  return (
    <Image
      src={bagSvg}
      fill
      style={{ objectFit: "contain" }}
      alt="Shopping bag"
    />
  );
};

export default BagIcon;

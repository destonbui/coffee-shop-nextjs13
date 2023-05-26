import React from "react";
import Image from "next/image";
import personSvg from "@/public/person-circle-outline.svg";

interface Props {}

const PersonIcon = ({}: Props) => {
  return (
    <Image
      className="h-8 w-auto cursor-pointer"
      src={personSvg}
      height={512}
      width={512}
      alt="location icon"
    />
  );
};

export default PersonIcon;

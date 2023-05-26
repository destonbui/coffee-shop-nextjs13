import React from "react";
import Image from "next/image";
import locationSvg from "@/public/location-outline.svg";

interface Props {}

const LocationIcon = ({}: Props) => {
  return (
    <Image
      className="h-6 w-auto cursor-pointer"
      src={locationSvg}
      height={512}
      width={512}
      alt="location icon"
    />
  );
};

export default LocationIcon;

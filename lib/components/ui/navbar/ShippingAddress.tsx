"use client";

import React from "react";
import { useState } from "react";
import Image from "next/image";

import deliveryImg from "@/public/delivery.png";

interface Props {}

const ShippingAddress = (props: Props) => {
  const [address, setAddress] = useState<string | null>(null);

  return (
    <div
      onClick={() => {
        setAddress("17 Lê Duẩn, phường Bến Nghé, quận 1, Hồ Chí Minh");
      }}
      className={`font-1 hidden h-10 w-[250px] cursor-pointer items-center gap-2 overflow-hidden rounded-full bg-gray-100 px-4 py-2 md:flex`}
    >
      <div onClick={() => {}} className="flex-shrink-0">
        <Image
          className="h-auto w-7"
          src={deliveryImg}
          width={512}
          height={512}
          placeholder="blur"
          alt="delivery image"
        />
      </div>

      <div className="pointer-events-none ml-2 flex flex-col overflow-hidden">
        <span
          className={`pt-1 font-arimo text-base font-bold leading-3 text-theme-green-main `}
        >
          {address ? "Giao hàng đến" : "Địa chỉ giao hàng"}
        </span>

        <span
          className={`w-[175px]  overflow-hidden text-ellipsis whitespace-nowrap font-arimo text-sm ${
            address ? "text-gray-700" : "text-gray-400"
          }`}
        >
          {address ? address : "Vui lòng nhập vị trí của bạn..."}
        </span>
      </div>
    </div>
  );
};

export default ShippingAddress;

"use client";

import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
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
      className={`md:flex overflow-hidden w-[250px] h-10 bg-gray-100 items-center py-2 px-4 rounded-full gap-2 font-1 hidden cursor-pointer`}
    >
      <motion.div
        onClick={() => {}}
        initial={{ scale: 1.2, pointerEvents: "none" }}
      >
        <Image
          className="w-7 h-auto"
          src={deliveryImg}
          width={512}
          height={512}
          placeholder="blur"
          alt="delivery image"
        />
      </motion.div>

      <div className="flex flex-col overflow-hidden ml-2 pointer-events-none">
        <span
          className={`pt-1 text-base ${
            !address ? "pb-1" : "leading-3"
          } font-bold text-theme-green-main `}
        >
          {address ? "Giao hàng đến:" : "Giao hàng"}
        </span>
        {address && (
          <span className="text-sm whitespace-nowrap text-ellipsis w-[175px] overflow-hidden">
            {address}
          </span>
        )}
      </div>
    </div>
  );
};

export default ShippingAddress;

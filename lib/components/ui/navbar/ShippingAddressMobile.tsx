"use client";

import React, { useContext } from "react";
import { useState } from "react";
import Image from "next/image";

import deliveryImg from "@/public/delivery.png";
import Cart from "./Cart";
import CartMobile from "./CartMobile";
import { NavbarVisibilityContext } from "@/lib/contexts/NavbarVisibilityContext";

interface Props {}

const ShippingAddressMobile = (props: Props) => {
  const [address, setAddress] = useState<string | null>(null);

  const visibilityContext = useContext(NavbarVisibilityContext);

  if (!visibilityContext) {
    throw new Error("No context");
  } else
    return (
      <div className="mx-4 flex items-center gap-2 md:hidden">
        <div
          onClick={() => {
            setAddress("17 Lê Duẩn, phường Bến Nghé, quận 1, Hồ Chí Minh");
          }}
          className={`font-1 flex h-12 flex-grow cursor-pointer items-center gap-2 overflow-hidden py-2`}
        >
          <div className="relative h-10 w-10 flex-shrink-0">
            <Image
              src={deliveryImg}
              fill
              style={{ objectFit: "contain" }}
              placeholder="blur"
              alt="delivery image"
            />
          </div>

          <div className="pointer-events-none mx-2 flex flex-grow flex-col overflow-hidden">
            <span
              className={`pt-1 font-arimo text-base font-bold leading-4 text-theme-green-main `}
            >
              {address ? "Giao hàng đến:" : "Địa chỉ giao hàng"}
            </span>

            <span
              className={`w-full overflow-hidden text-ellipsis whitespace-nowrap font-arimo text-sm ${
                address ? "text-gray-700" : "text-gray-400"
              }`}
            >
              {address ? address : "Vui lòng nhập vị trí của bạn..."}
            </span>
          </div>
        </div>
        {/* Cart */}
        <div
          id="cart-mobile"
          className={`scale-0 opacity-0 transition-all duration-300 ease-in-out ${
            !visibilityContext.isVisible && "scale-100 opacity-100"
          }`}
        >
          <CartMobile />
        </div>
      </div>
    );
};

export default ShippingAddressMobile;

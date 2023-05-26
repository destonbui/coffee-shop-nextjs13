"use client";

import React, { useState } from "react";
import BagIcon from "../icons/BagIcon";

interface Props {}

const Cart = (props: Props) => {
  const [itemsCount, setCount] = useState(0);

  return (
    <div
      className="relative pr-2 cursor-pointer"
      onClick={() => setCount((prev) => prev + 1)}
    >
      <BagIcon />
      <div
        className={` w-6 h-6 bg-theme-green-main text-white absolute top-[-4px] right-0 rounded-full flex items-center justify-center text-xs font-semibold font-0 pointer-events-none z-50`}
      >
        {itemsCount}
      </div>
    </div>
  );
};

export default Cart;

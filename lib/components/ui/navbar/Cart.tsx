"use client";

import React, { useState } from "react";
import BagIcon from "../../icons/BagIcon";

interface Props {}

const Cart = (props: Props) => {
  const [itemsCount, setCount] = useState(0);

  return (
    <div
      className="relative cursor-pointer pr-2"
      onClick={() => setCount((prev) => prev + 1)}
    >
      <div className=" relative h-9 w-9">
        <BagIcon />
      </div>
      <div
        className={` pointer-events-none absolute right-0 top-[-4px] z-50 flex h-6 w-6 items-center justify-center rounded-full bg-theme-green-main font-arimo text-xs font-semibold text-white`}
      >
        {itemsCount}
      </div>
    </div>
  );
};

export default Cart;

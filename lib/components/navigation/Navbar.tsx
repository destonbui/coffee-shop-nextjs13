import Image from "next/image";
import React from "react";

import logo from "@/public/phuclong-logo-main.png";

import Search from "../ui/navbar/Search";
import ShippingAddress from "../ui/navbar/ShippingAddress";
import Cart from "../ui/navbar/Cart";

import StoreIcon from "../icons/StoreIcon";

interface Props {}

const Navbar = (props: Props) => {
  return (
    <nav className="navbar_container ">
      <div className="flex items-center">
        <Image
          className="h-12 w-auto"
          src={logo}
          alt="Phúc Long Coffee & Tea"
          height={200}
          width={150}
        />

        <Search />

        <div className="flex-grow" />

        <div className="flex gap-4 items-center">
          <ShippingAddress />

          <StoreIcon />

          <Cart />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

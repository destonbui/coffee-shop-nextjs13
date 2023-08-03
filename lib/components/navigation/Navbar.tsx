"use client";
import Image from "next/image";
import { useRef, useEffect, useContext } from "react";

import logo from "@/public/phuclong-logo-main.png";

import Search from "../ui/navbar/Search";
import ShippingAddress from "../ui/navbar/ShippingAddress";
import Cart from "../ui/navbar/Cart";

import StoreIcon from "../icons/StoreIcon";
import { NavbarVisibilityContext } from "@/lib/contexts/NavbarVisibilityContext";

interface Props {}

const Navbar = (props: Props) => {
  const visibilityContext = useContext(NavbarVisibilityContext);

  const navRef = useRef(null);

  useEffect(() => {
    if (!visibilityContext) {
      throw new Error("useContext has to be use within the Provider");
    } else {
      const observer = new IntersectionObserver((entries) => {
        let entry = entries[0];

        if (entry.isIntersecting) {
          visibilityContext.setVisible(true);
        } else {
          visibilityContext.setVisible(false);
        }
      });

      navRef.current && observer.observe(navRef.current);
    }
  });
  return (
    <nav ref={navRef} className="navbar_container">
      <div className="flex items-center">
        <Image
          className="h-12 w-auto"
          src={logo}
          alt="Phúc Long Coffee & Tea"
          height={200}
          width={150}
          placeholder="blur"
        />

        <Search />

        <div className="flex-grow" />

        <div className="flex items-center gap-4">
          <ShippingAddress />

          <StoreIcon />

          <Cart />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

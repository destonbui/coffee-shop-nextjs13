import Image from "next/image";
import logo from "@/public/phuclong-logo-main.png";
import React from "react";
import Search from "../ui/Search";

interface Props {}

const Navbar = (props: Props) => {
  return (
    <nav className="navbar_container ">
      <Image
        src={logo}
        alt="Phúc Long Coffee & Tea"
        height={50}
        width={70}
        placeholder="blur"
      />
      <Search />
    </nav>
  );
};

export default Navbar;

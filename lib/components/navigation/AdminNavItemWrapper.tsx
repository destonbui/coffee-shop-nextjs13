"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import React from "react";

interface Props {
  title: string;
  href: string;
  children: React.ReactNode;
  image?: boolean;
}

const AdminNavItemWrapper = ({
  title,
  href,
  children,
  image = false,
}: Props) => {
  const pathname = usePathname();

  const active = pathname === href;

  const activeProps = {
    href: href,
    className: "group relative flex cursor-pointer items-center",
    "data-active": true,
  };
  const linkProps = {
    href: href,
    className: "group relative flex cursor-pointer items-center",
  };

  return (
    <Link as="image" {...(active ? activeProps : linkProps)}>
      <div className="absolute left-0 h-0 w-[5px] flex-shrink-0 rounded-r-md  opacity-0 transition-all group-data-[active]:h-9 group-data-[active]:bg-theme-green-main group-data-[active]:opacity-100" />
      <div className="ml-2 mr-2 flex flex-grow items-center gap-3 rounded-md bg-gray-100 px-2 py-2 transition duration-300 ease-in-out hover:bg-gray-200 ">
        {children}
        <span className="subtitle1 flex-shrink-0 text-gray-800">{title}</span>
      </div>
    </Link>
  );
};

export default AdminNavItemWrapper;

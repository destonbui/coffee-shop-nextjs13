"use client";

import Image from "next/image";
import React from "react";
import { Session } from "next-auth";

import HomeIcon from "@mui/icons-material/Home";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";
import CategoryIcon from "@mui/icons-material/Category";
import EmojiFoodBeverageIcon from "@mui/icons-material/EmojiFoodBeverage";

import AdminNavItemWrapper from "./AdminNavItemWrapper";

interface Props {
  session: Session | null;
}

const muiIconProps = {
  sx: { fontSize: "24px" },
  className: "text-theme-green-main",
};

const AdminSidebar = ({ session }: Props) => {
  return (
    <div className="hidden w-[200px] flex-col gap-1 overflow-x-hidden bg-gray-100 pt-4 transition-all duration-300 ease-in-out md:flex">
      {/* Dashboard nav item */}
      <AdminNavItemWrapper title="Dashboard" href="/dashboard">
        <HomeIcon {...muiIconProps} />
      </AdminNavItemWrapper>

      {/* Admin info display */}
      <AdminNavItemWrapper
        title={session?.user.name as string}
        href="/dashboard/profile"
      >
        <Image
          src={session?.user.image as string}
          width={24}
          height={24}
          alt="Admin avatar"
          className="rounded-full"
        />
      </AdminNavItemWrapper>

      {/* Section divider */}
      <hr className="mx-4 my-2 border-gray-300" />

      {/* Orders handling navigation */}

      {/* Orders */}
      <AdminNavItemWrapper title="Orders" href="/dashboard/orders">
        <ReceiptLongIcon {...muiIconProps} />
      </AdminNavItemWrapper>

      {/* POS */}
      <AdminNavItemWrapper title="Point Of Sale" href="/dashboard/pos">
        <PointOfSaleIcon {...muiIconProps} />
      </AdminNavItemWrapper>

      {/* Section divider */}
      <hr className="mx-4 my-2 border-gray-300" />

      {/* Web banner */}
      <AdminNavItemWrapper title="Hero Carousel" href="/dashboard/carousel">
        <ViewCarouselIcon {...muiIconProps} />
      </AdminNavItemWrapper>

      {/* Products categories */}
      <AdminNavItemWrapper title="Categories" href="/dashboard/categories">
        <CategoryIcon {...muiIconProps} />
      </AdminNavItemWrapper>

      {/* Products */}
      <AdminNavItemWrapper title="Products" href="/dashboard/products">
        <EmojiFoodBeverageIcon {...muiIconProps} />
      </AdminNavItemWrapper>
    </div>
  );
};

export default AdminSidebar;

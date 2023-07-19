"use client";

import React from "react";

import { Pencil1Icon } from "@radix-ui/react-icons";

import * as Dialog from "@radix-ui/react-dialog";
import ProductEditDialog from "./ProductEditDialog";
import { Product } from "@prisma/client";

interface Props {
  data: Product;
}

const ProductEditButton = ({ data }: Props) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="relative  rounded-full text-theme-green-main opacity-0 transition-all duration-200 ease-in-out group-hover:opacity-100">
          <Pencil1Icon />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="Dialog_Overlay" />
        <ProductEditDialog data={data} />
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ProductEditButton;

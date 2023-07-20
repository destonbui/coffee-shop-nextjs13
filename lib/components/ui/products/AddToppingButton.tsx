"use client";

import React from "react";

import { PlusIcon } from "@radix-ui/react-icons";

import * as Dialog from "@radix-ui/react-dialog";

import ProductAddToppingDialog from "./ProductAddToppingDialog";
import { Topping, ToppingOfProduct } from "@prisma/client";

interface Props {
  toppingsOfProduct: (ToppingOfProduct & {
    topping: Topping;
  })[];
  productId: string;
}

const AddToppingButton = ({ productId, toppingsOfProduct }: Props) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="rounded-full bg-gray-100 p-1 text-theme-green-main transition-all duration-200 ease-in-out hover:bg-gray-200 hover:shadow">
          <PlusIcon className="scale-80" />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="Dialog_Overlay" />
        <ProductAddToppingDialog
          productId={productId}
          toppingsOfProduct={toppingsOfProduct}
        />
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default AddToppingButton;

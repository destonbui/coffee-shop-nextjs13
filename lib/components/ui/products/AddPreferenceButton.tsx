"use client";

import React from "react";

import { PlusIcon } from "@radix-ui/react-icons";

import * as Dialog from "@radix-ui/react-dialog";

import ProductAddPreferenceDialog from "./ProductAddPreferenceDialog";
import { OptionOfProduct, Option } from "@prisma/client";

interface Props {
  optionsOfProduct: (OptionOfProduct & {
    option: Option;
  })[];
  productId: string;
}

const AddPreferenceButton = ({ optionsOfProduct, productId }: Props) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="rounded-full bg-gray-100 p-1 text-theme-green-main transition-all duration-200 ease-in-out hover:bg-gray-200 hover:shadow">
          <PlusIcon className="scale-80" />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="Dialog_Overlay" />
        <ProductAddPreferenceDialog
          productId={productId}
          optionsOfProduct={optionsOfProduct}
        />
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default AddPreferenceButton;

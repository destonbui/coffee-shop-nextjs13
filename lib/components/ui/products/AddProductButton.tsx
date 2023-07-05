"use client";

import React from "react";

import { PlusIcon } from "@radix-ui/react-icons";

import Button from "@/lib/components/ui/Button";

import * as Dialog from "@radix-ui/react-dialog";
import ProductAddDialog from "./ProductAddDialog";

interface Props {}

const AddProductButton = (props: Props) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button iconEl={<PlusIcon className="relative z-20" />}>
          Thêm product
        </Button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="Dialog_Overlay" />
        <ProductAddDialog />
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default AddProductButton;

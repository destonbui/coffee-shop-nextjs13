"use client";

import React from "react";

import { PlusIcon } from "@radix-ui/react-icons";

import Button from "@/lib/components/ui/Button";

import * as Dialog from "@radix-ui/react-dialog";

import CategoryAddDialog from "./CategoryAddDialog";

interface Props {}

const AddCategoryButton = (props: Props) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button iconEl={<PlusIcon className="relative z-20" />}>
          Thêm category
        </Button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="Dialog_Overlay" />
        <CategoryAddDialog />
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default AddCategoryButton;

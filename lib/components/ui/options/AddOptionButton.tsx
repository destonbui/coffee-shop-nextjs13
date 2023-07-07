"use client";

import React from "react";

import { PlusIcon } from "@radix-ui/react-icons";

import Button from "@/lib/components/ui/Button";

import * as Dialog from "@radix-ui/react-dialog";
import OptionAddDialog from "./OptionAddDialog";

interface Props {}

const AddOptionButton = (props: Props) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button iconEl={<PlusIcon className="relative z-20" />}>
          Thêm option
        </Button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="Dialog_Overlay" />
        <OptionAddDialog />
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default AddOptionButton;

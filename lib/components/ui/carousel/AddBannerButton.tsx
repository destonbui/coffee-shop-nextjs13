"use client";

import React from "react";

import { PlusIcon } from "@radix-ui/react-icons";

import Button from "@/lib/components/ui/Button";

import * as Dialog from "@radix-ui/react-dialog";
import CarouselAddDialog from "@/lib/components/ui/carousel/CarouselAddDialog";

interface Props {}

const AddBannerButton = (props: Props) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button iconEl={<PlusIcon className="relative z-20" />}>
          Thêm banner
        </Button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="Dialog_Overlay" />
        <CarouselAddDialog />
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default AddBannerButton;

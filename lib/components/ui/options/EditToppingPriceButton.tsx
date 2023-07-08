"use client";

import React from "react";

import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon, Pencil2Icon } from "@radix-ui/react-icons";
import { Tooltip } from "@mui/material";
import Button from "../Button";
import { actionUpdateToppingPrice } from "@/app/(admin)/dashboard/(website)/product-options/actions";
import { useRouter } from "next/navigation";

type Props = {
  currentPrice: number;
  id: string;
  title: string;
};

const EditToppingPriceButton = ({ title, id, currentPrice }: Props) => {
  const [price, setPrice] = React.useState<number>(currentPrice);

  const closeBtnRef = React.useRef<HTMLButtonElement>(null);
  const router = useRouter();

  const handleEditPrice: React.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();
    const { error } = await actionUpdateToppingPrice({ newPrice: price }, id);

    if (error) {
      throw new Error("Update price failed");
    }

    router.refresh();
    closeBtnRef.current?.click();
  };
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Tooltip title="Edit price">
          <button>
            <Pencil2Icon className="text-theme-green-main" />
          </button>
        </Tooltip>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="Dialog_Overlay" />
        <Dialog.Content className="fixed left-1/2 top-1/2 max-h-[600px]  w-[500px] -translate-x-1/2 -translate-y-1/2 overflow-auto rounded-md bg-white p-4">
          <div className="flex items-center border-b border-theme-green-main pb-2">
            <Dialog.Title className="flex-grow text-xl font-semibold uppercase tracking-widest text-theme-green-darker">
              Edit {title} price
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                ref={closeBtnRef}
                className="group flex items-center justify-center rounded-full bg-gray-300 p-1 transition-all duration-300 ease-in-out hover:bg-theme-green-main"
              >
                <Cross2Icon className="text-theme-green-darker transition-all duration-300 ease-in-out group-hover:text-white" />
              </button>
            </Dialog.Close>
          </div>

          <form onSubmit={handleEditPrice} className="mt-4 flex flex-col gap-4">
            <input
              value={price}
              onChange={(e) => {
                let newVal =
                  Number(e.target.value) < 0 ? 0 : Number(e.target.value);
                setPrice(newVal);
              }}
              className="body1 rounded-md border-2 border-gray-300 px-2 py-1 outline-none focus:border-theme-green-main"
              type="number"
              id="topping-price"
              name="topping-price"
              placeholder="Enter topping price"
              step={1000}
              required
            />

            <Button disabled={price === currentPrice} type="submit">
              SET NEW PRICE
            </Button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default EditToppingPriceButton;

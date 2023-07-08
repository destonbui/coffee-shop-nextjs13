"use client";

import { actionDeleteTopping } from "@/app/(admin)/dashboard/(website)/product-options/actions";
import { Tooltip } from "@mui/material";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  id: string;
};

const DeleteToppingButton = ({ id }: Props) => {
  const router = useRouter();
  return (
    <Tooltip title="Delete topping">
      <button
        onClick={async () => {
          const { error } = await actionDeleteTopping({ id: id });

          if (error) {
            throw new Error("Delete preference failed");
          }

          router.refresh();
        }}
        className="rounded-full p-1 text-red-600 opacity-0 transition-opacity duration-200 ease-in-out group-hover:bg-red-50 group-hover:opacity-100"
      >
        <Cross2Icon />
      </button>
    </Tooltip>
  );
};

export default DeleteToppingButton;

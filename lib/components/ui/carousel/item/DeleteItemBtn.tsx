"use client";

import Tooltip from "@mui/material/Tooltip";
import { Cross2Icon } from "@radix-ui/react-icons";

import React from "react";
import { actionDeleteBanner } from "@/app/(admin)/dashboard/(website)/carousel/actions";

interface Props {
  id: string;
}

const DeleteItemBtn = ({ id }: Props) => {
  return (
    <Tooltip title="Delete banner" enterDelay={300}>
      <button
        onClick={async () => {
          const { deleteBanner, error } = await actionDeleteBanner(id);

          if (error) {
            throw new Error("Delete banner failed");
          }
        }}
        className="flex h-6 w-6 items-center justify-center rounded-full p-1 transition-all duration-300 ease-in-out hover:bg-red-100 active:scale-90 active:bg-red-300"
      >
        <Cross2Icon className="flex items-center justify-center text-red-700" />
      </button>
    </Tooltip>
  );
};

export default DeleteItemBtn;

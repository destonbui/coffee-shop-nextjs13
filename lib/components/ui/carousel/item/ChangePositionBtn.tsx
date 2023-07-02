"use client";

import React from "react";

import Tooltip from "@mui/material/Tooltip";

import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";

import { actionUpdateBannerPosition } from "@/app/(admin)/dashboard/(website)/carousel/actions";

interface Props {
  id: string;
  newPos?: number;
  direction: "left" | "right";
}

const ChangePositionBtn = ({ id, newPos, direction }: Props) => {
  return (
    <Tooltip
      title={
        newPos ? `Move ${direction === "left" ? "forward" : "backward"}` : ""
      }
      enterDelay={300}
    >
      <button
        onClick={async () => {
          if (newPos) {
            const { updateBanner, error } = await actionUpdateBannerPosition(
              id,
              newPos
            );

            if (error) {
              throw new Error("Update banner position failed");
            }
          }
        }}
        className={`flex h-6 w-6 items-center justify-center rounded-full ${
          newPos
            ? "text-theme-green-main transition-all duration-300 ease-in-out hover:bg-theme-green-lighter/40"
            : "cursor-default text-gray-500"
        }`}
      >
        {direction === "left" && (
          <ChevronLeftIcon className="h-[1rem] w-[1rem]" />
        )}
        {direction === "right" && (
          <ChevronRightIcon className="h-[1rem] w-[1rem]" />
        )}
      </button>
    </Tooltip>
  );
};

export default ChangePositionBtn;

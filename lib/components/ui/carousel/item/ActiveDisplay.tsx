"use client";

import React from "react";

import Tooltip from "@mui/material/Tooltip";
import { actionToggleBannerActive } from "@/app/(admin)/dashboard/(website)/carousel/actions";

interface Props {
  active: boolean;
  id: string;
}

const ActiveDisplay = ({ active, id }: Props) => {
  return (
    <Tooltip title="Toggle banner display" enterDelay={300}>
      <div
        onClick={async () => {
          const { updateBanner: updatedBanner, error } =
            await actionToggleBannerActive(id, active);

          if (error) {
            throw new Error("Update banner active failed");
          }
        }}
        className={`flex cursor-pointer items-center gap-1 rounded-full border ${
          active ? "border-theme-green-main" : "border-gray-500"
        } px-2`}
      >
        <span className="text-sm font-normal">
          {active ? "Active" : "Inactive"}
        </span>
        <div
          className={`h-3 w-3 rounded-full ${
            active ? "bg-theme-green-main" : "bg-gray-400"
          } shadow-sm`}
        />
      </div>
    </Tooltip>
  );
};

export default ActiveDisplay;

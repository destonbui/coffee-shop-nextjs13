"use client";

import React from "react";

import * as Popover from "@radix-ui/react-popover";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";

import { Cross1Icon, Pencil2Icon } from "@radix-ui/react-icons";

type Props = {};

const CategoryEditMenu = (props: Props) => {
  const closeBtnRef = React.useRef<HTMLButtonElement | null>(null);

  return (
    <Popover.Root>
      {/* Trigger */}
      <Popover.Trigger asChild>
        <button className="group relative rounded-full p-1 text-sm text-white">
          <DotsHorizontalIcon className="h-5 w-5 text-gray-400 transition-all duration-150 ease-in-out group-hover:text-gray-700" />
        </button>
      </Popover.Trigger>

      {/* Popover */}
      <Popover.Portal>
        <Popover.Content
          side="bottom"
          align="end"
          className="w-[120px] overflow-hidden rounded-md bg-white py-1   shadow-lg"
        >
          <Popover.Close className="absolute" ref={closeBtnRef} />
          <div className="flex flex-col gap-1">
            <button className="flex items-center gap-4 px-4 py-1 text-left text-sm text-gray-700 transition-all duration-200 ease-in-out hover:bg-gray-400/10">
              <div>
                <Pencil2Icon className="text-gray-700" />
              </div>
              EDIT
            </button>

            <hr className="mx-2 border-gray-200" />

            <button
              onClick={() => {
                closeBtnRef.current?.click();
              }}
              className="flex items-center gap-4 px-4 py-1 text-left text-sm text-red-500 transition-all duration-200 ease-in-out hover:bg-red-400/10"
            >
              <div>
                <Cross1Icon className="text-red-500" />
              </div>
              DELETE
            </button>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default CategoryEditMenu;

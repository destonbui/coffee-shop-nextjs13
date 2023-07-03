"use client";

import React from "react";

import * as Popover from "@radix-ui/react-popover";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";

import { Cross1Icon, Pencil2Icon } from "@radix-ui/react-icons";
import { Category } from "@prisma/client";
import CategoryEditDialog from "./edit-menu/CategoryEditDialog";
import CategoryDeleteDialog from "./edit-menu/CategoryDeleteDialog";
import SubcategoryEditDialog from "./edit-menu/SubcategoryEditDialog";

type Props = {
  category: Category;
};

const CategoryEditMenu = ({ category }: Props) => {
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
          className="overflow-hidden rounded-md bg-white py-1   shadow-lg"
        >
          <Popover.Close className="absolute" ref={closeBtnRef} />
          <div className="flex flex-col gap-1">
            {/* Edit */}
            <CategoryEditDialog data={category} />

            <SubcategoryEditDialog data={category} />

            <hr className="mx-2 border-gray-200" />

            {/* Delete */}
            <CategoryDeleteDialog data={category} />
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default CategoryEditMenu;

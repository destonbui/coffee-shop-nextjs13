"use client";

import React from "react";
import * as Select from "@radix-ui/react-select";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";
import { actionFetchCategories } from "@/app/(admin)/dashboard/(website)/products/actions";
import { Category } from "@prisma/client";

type Props = {
  category?: string;
  handleChangeCategory: (value: string) => void;
};

const CategorySelect = ({ category, handleChangeCategory }: Props) => {
  const [categories, setCategories] = React.useState<Category[] | null>(null);

  React.useEffect(() => {
    async function fetchCategories() {
      const { categories: categoriesFromDB } = await actionFetchCategories();

      if (categoriesFromDB) {
        setCategories(categoriesFromDB);
      }
    }

    fetchCategories();
  }, []);

  return (
    <Select.Root value={category} onValueChange={handleChangeCategory}>
      <Select.Trigger
        id="product-category"
        className="group flex items-center rounded-md border-2 border-gray-300 px-2 py-1 text-gray-700 focus:border-theme-green-main"
        aria-label="Category"
      >
        <Select.Value placeholder="Select a category..." />

        <Select.Icon className="flex flex-grow flex-row-reverse text-theme-green-main">
          <ChevronDownIcon className="scale-125 group-data-[state=closed]:block group-data-[state=open]:hidden" />
          <ChevronUpIcon className="scale-125 group-data-[state=open]:block group-data-[state=closed]:hidden" />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          position="popper"
          sideOffset={4}
          className="max-h-[var(--radix-select-content-available-height)] w-[var(--radix-select-trigger-width)] rounded-md border-2 border-theme-green-main bg-white shadow-md"
        >
          <Select.Viewport className="py-2">
            <Select.Group>
              {categories &&
                categories.map((category) => {
                  return (
                    <Select.Item
                      className="relative flex cursor-pointer items-center gap-2 px-8 hover:bg-gray-100"
                      key={category.name}
                      value={category.name}
                    >
                      <Select.ItemIndicator className="absolute left-2 scale-125 text-theme-green-main">
                        <CheckIcon />
                      </Select.ItemIndicator>
                      <Select.ItemText>{category.name}</Select.ItemText>
                    </Select.Item>
                  );
                })}
            </Select.Group>
          </Select.Viewport>
          <Select.ScrollDownButton className="SelectScrollButton">
            <ChevronDownIcon />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

export default CategorySelect;

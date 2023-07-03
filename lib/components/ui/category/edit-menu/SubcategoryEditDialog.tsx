"use client";

import React from "react";

import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon, Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";
import { Category } from "@prisma/client";
import Button from "../../Button";

import { useRouter } from "next/navigation";
import {
  actionAddSubcategory,
  actionDeleteSubcategory,
  actionUpdateCategorySubcategory,
} from "@/app/(admin)/dashboard/(website)/categories/actions";
import { Tooltip } from "@mui/material";

type Props = {
  data: Category;
};

const SubcategoryEditDialog = ({ data }: Props) => {
  const [subcategory, setSubcategory] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);

  const closeBtnRef = React.useRef<HTMLButtonElement | null>(null);
  const router = useRouter();

  const handleAdd = async (val: string) => {
    setLoading(true);
    const { subcategory, error } = await actionAddSubcategory({
      name: val,
      categoryName: data.name,
    });

    if (error) {
      throw new Error("Add subcategory failed!");
    } else {
      // Update category's subcategory names

      const names = data.subcategories_names;

      const newNames = [...names, val];

      const { category, error } = await actionUpdateCategorySubcategory(
        { newSubcategoryNames: newNames },
        data.id
      );

      if (error) {
        throw new Error("Update category subcategory failed!");
      }
    }

    setSubcategory("");
    setLoading(false);
    router.refresh();
  };

  const handleDelete = async (subcategoryName: string) => {
    const { subcategory, error } = await actionDeleteSubcategory({
      subcategoryName: subcategoryName,
    });

    if (error) {
      throw new Error("Delete subcategory failed!");
    } else {
      // update category's subcategory names

      const names = data.subcategories_names;

      const newNames = names.filter((name) => {
        return name !== subcategoryName;
      });

      const { category, error } = await actionUpdateCategorySubcategory(
        { newSubcategoryNames: newNames },
        data.id
      );

      if (error) {
        throw new Error("Update category subcategory failed!");
      }
    }

    router.refresh();
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="flex items-center gap-4 px-4 py-1 text-left text-sm text-gray-700 transition-all duration-200 ease-in-out hover:bg-gray-400/10">
          <div>
            <Pencil2Icon className="text-gray-700" />
          </div>
          Edit subcategory
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="Dialog_Overlay" />
        <Dialog.Content className="fixed left-1/2 top-1/2 max-h-[600px] min-h-[300px] w-[500px] -translate-x-1/2 -translate-y-1/2 overflow-auto rounded-md bg-white p-4">
          {/* Title & Close button */}
          <div className="flex items-center border-b border-theme-green-main pb-2">
            <Dialog.Title className="flex-grow text-xl font-semibold uppercase tracking-widest text-theme-green-darker">
              Edit Subcategory
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

          {/* Subcategories */}
          <div className="mt-4 flex flex-col gap-1">
            <label className="h6 text-gray-700" htmlFor="subcategory">
              New Subcategory
            </label>
            <div className="flex gap-2">
              <div className="relative flex-grow">
                {/* Loading spinner */}
                <div className="absolute right-2 top-1/2 h-6 w-6 -translate-y-1/2 overflow-hidden rounded-full ">
                  <div
                    className={`relative opacity-0 ${
                      loading ? "animate-spin opacity-100" : ""
                    } h-full w-full bg-theme-green-main`}
                  >
                    <div className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white">
                      <div className="absolute right-0 top-0 h-5 w-5 translate-x-1/2 translate-y-1/2 bg-white"></div>
                    </div>
                  </div>
                </div>

                <input
                  value={subcategory}
                  onChange={(e) => {
                    setSubcategory(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    let key = e.key;
                    if (!loading) {
                      if (key === "Enter") {
                        if (subcategory !== "") {
                          handleAdd(subcategory);
                        }
                      }
                    }
                  }}
                  className="body1 w-full rounded-md border-2 border-gray-300 px-2 py-1 outline-none focus:border-theme-green-main"
                  type="text"
                  name="subcategory"
                  id="subcategory"
                  spellCheck={false}
                  placeholder="Enter new subcategory name"
                />
              </div>

              <Button
                disabled={subcategory === "" || loading}
                onClick={(e) => {
                  handleAdd(subcategory);
                }}
              >
                Add
              </Button>
            </div>

            <span className="mt-2 font-semibold text-theme-green-main">
              Subcategories
            </span>
            <ul className="list list-inside list-none">
              {data.subcategories_names[0] &&
                data.subcategories_names.map((name) => {
                  return (
                    <li
                      className="group flex h-8 items-center gap-2"
                      key={name}
                    >
                      <div className="h-2 w-2 rounded-full bg-theme-green-main" />
                      <p className="body1 pb-1">{name}</p>
                      <Tooltip title="Delete subcategory" enterDelay={300}>
                        <button
                          onClick={() => {
                            handleDelete(name);
                          }}
                          className="text-red-600 opacity-0 transition-all duration-200 ease-in-out group-hover:opacity-100"
                        >
                          <TrashIcon />
                        </button>
                      </Tooltip>
                    </li>
                  );
                })}

              {!data.subcategories_names[0] && (
                <li>No subcategory to display</li>
              )}
            </ul>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default SubcategoryEditDialog;

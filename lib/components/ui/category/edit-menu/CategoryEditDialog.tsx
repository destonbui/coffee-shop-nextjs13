"use client";

import React from "react";

import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon, Pencil2Icon } from "@radix-ui/react-icons";
import { Category } from "@prisma/client";
import Button from "../../Button";
import { actionUpdateCategoryInfo } from "@/app/(admin)/dashboard/(website)/categories/actions";
import { useRouter } from "next/navigation";

type Props = {
  data: Category;
};

type updateData = {
  name?: string;
  imgUrl?: string;
  desc?: string;
};

const CategoryEditDialog = ({ data }: Props) => {
  const [name, setName] = React.useState<string>(data.name);
  const [imgUrl, setImgUrl] = React.useState<string>(data.image_url);
  const [desc, setDesc] = React.useState<string>(
    data.description ? data.description : ""
  );

  const closeBtnRef = React.useRef<HTMLButtonElement | null>(null);
  const router = useRouter();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const newData: updateData = {};

    if (name !== data.name) {
      newData.name = name;
    }
    if (imgUrl !== data.image_url) {
      newData.imgUrl = imgUrl;
    }
    if (desc !== "" && desc !== data.description) {
      newData.desc = desc;
    }

    const { category, error } = await actionUpdateCategoryInfo(
      newData,
      data.id
    );

    if (error) {
      throw new Error("Update category failed!");
    }

    closeBtnRef.current?.click();
    router.refresh();
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="flex items-center gap-4 px-4 py-1 text-left text-sm text-gray-700 transition-all duration-200 ease-in-out hover:bg-gray-400/10">
          <div>
            <Pencil2Icon className="text-gray-700" />
          </div>
          Edit category info
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="Dialog_Overlay" />
        <Dialog.Content className="fixed left-1/2 top-1/2 max-h-[600px] min-h-[300px] w-[500px] -translate-x-1/2 -translate-y-1/2 overflow-auto rounded-md bg-white p-4">
          {/* Title & Close button */}
          <div className="flex items-center border-b border-theme-green-main pb-2">
            <Dialog.Title className="flex-grow text-xl font-semibold uppercase tracking-widest text-theme-green-darker">
              Edit Category
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

          <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
            {/* Name */}
            <div className="flex flex-col gap-1">
              <label className="h6 text-gray-700" htmlFor="category-name">
                Name*
              </label>
              <input
                className="body1 rounded-md border-2 border-gray-300 px-2 py-1 outline-none focus:border-theme-green-main"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                name="category-name"
                spellCheck={false}
                id="category-name"
                placeholder="Enter category name"
                required
              />
            </div>

            {/* Img */}
            <div className="flex flex-col gap-1">
              <label className="h6 text-gray-700" htmlFor="category-img">
                Image URL*
              </label>
              <input
                className="body1 rounded-md border-2 border-gray-300 px-2 py-1 outline-none focus:border-theme-green-main"
                value={imgUrl}
                type="url"
                onChange={(e) => {
                  setImgUrl(e.target.value);
                }}
                name="category-img"
                spellCheck={false}
                id="category-img"
                placeholder="Enter category image URL"
                required
              />
            </div>

            {/* Desc */}
            <div className="flex flex-col gap-1">
              <label className="h6 text-gray-700" htmlFor="category-desc">
                Description
              </label>
              <textarea
                className="body1 rounded-md border-2 border-gray-300 px-2 py-1 outline-none focus:border-theme-green-main"
                rows={3}
                value={desc}
                onChange={(e) => {
                  setDesc(e.target.value);
                }}
                name="category-desc"
                spellCheck={false}
                id="category-desc"
                placeholder="Enter category description"
              />
            </div>

            {/* Subcategories */}
            {/* <div className="flex flex-col gap-1">
              <label className="h6 text-gray-700" htmlFor="subcategory">
                New Subcategory
              </label>
              <div className="flex gap-2">
                <input
                  className="body1 flex-grow rounded-md border-2 border-gray-300 px-2 py-1 outline-none focus:border-theme-green-main"
                  type="text"
                  name="subcategory"
                  id="subcategory"
                  placeholder="Enter new subcategory name"
                />
                <Button>Add</Button>
              </div>

              <span className="mt-2 font-semibold text-theme-green-main">
                Subcategories
              </span>
              <ul className="list list-inside list-disc">
                {data.subcategories_names[0] &&
                  data.subcategories_names.map((name) => {
                    return <li key={name}>{name}</li>;
                  })}

                {!data.subcategories_names[0] && (
                  <li>No subcategory to display</li>
                )}
              </ul>
            </div> */}

            <Button type="submit">Save</Button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default CategoryEditDialog;

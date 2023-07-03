"use client";

import React from "react";

import * as Dialog from "@radix-ui/react-dialog";
import { Cross1Icon } from "@radix-ui/react-icons";
import { Category } from "@prisma/client";
import { actionDeleteCategory } from "@/app/(admin)/dashboard/(website)/categories/actions";
import { useRouter } from "next/navigation";

type Props = {
  data: Category;
};

const CategoryDeleteDialog = ({ data }: Props) => {
  const closeBtnRef = React.useRef<HTMLButtonElement | null>(null);
  const router = useRouter();

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="flex items-center gap-4 px-4 py-1 text-left text-sm text-red-500 transition-all duration-200 ease-in-out hover:bg-red-400/10">
          <div>
            <Cross1Icon className="text-red-500" />
          </div>
          Delete category
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="Dialog_Overlay" />
        <Dialog.Content className="fixed left-1/2 top-1/2 max-h-[600px] w-[500px] -translate-x-1/2 -translate-y-1/2 overflow-auto rounded-md bg-white p-4">
          {/* Title & Close button */}
          <div className="flex items-center border-b border-red-500/20 pb-2">
            <Dialog.Title className="flex-grow text-xl font-semibold uppercase tracking-widest text-red-600">
              Delete {`"${data.name}"`} Category?
            </Dialog.Title>
          </div>

          <div className="mt-2 flex flex-col">
            <Dialog.Description className="body1 text-gray-700">
              Are you sure you want to delete <b>{`"${data.name}"`}</b>{" "}
              category? All <b>subcategories</b> and <b>products</b> will also
              be deleted permanently.
            </Dialog.Description>

            <div className="mt-4 flex h-10 gap-2">
              <div className="flex w-1/2 flex-col">
                <Dialog.Close asChild>
                  <button
                    ref={closeBtnRef}
                    className="body1 border-gray-00 h-full rounded-md border border-gray-700 bg-white text-gray-700 transition-all duration-200 ease-in-out hover:bg-gray-100"
                  >
                    CANCEL
                  </button>
                </Dialog.Close>
              </div>
              <div className="flex w-1/2 flex-col">
                <button
                  onClick={async () => {
                    const { category, error } = await actionDeleteCategory({
                      id: data.id,
                    });

                    if (error) {
                      throw new Error(`Delete ${data.name} failed.`);
                    }

                    router.refresh();
                  }}
                  className="body1 border-gray-00 h-full rounded-md   bg-red-600 text-white transition-all duration-200 ease-in-out hover:bg-red-700"
                >
                  DELETE
                </button>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default CategoryDeleteDialog;

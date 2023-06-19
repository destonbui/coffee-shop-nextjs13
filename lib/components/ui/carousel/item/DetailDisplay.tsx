"use client";

import React from "react";

import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";

import * as Dialog from "@radix-ui/react-dialog";

import CloseIcon from "@mui/icons-material/Close";
import Button from "../../Button";
import { actionUpdateBannerDetail } from "@/app/(admin)/dashboard/(website)/carousel/actions";
import { useRouter } from "next/navigation";

interface Props {
  id: string;
  title: string;
  value: string;
}

const DetailDisplay = ({ id, title, value }: Props) => {
  const currentVal = value === "undefined" ? "" : value;
  const [newVal, setNewVal] = React.useState<string>(
    value === "undefined" ? "" : value
  );
  const closeBtnRef = React.useRef<HTMLButtonElement | null>(null);
  const router = useRouter();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const { updateBanner, error } = await actionUpdateBannerDetail(
      id,
      `${title.toLowerCase() === "description" ? "description" : "link"}`,
      newVal
    );

    if (error) {
      throw new Error("Update banner detail failed");
    }

    closeBtnRef.current?.click();
    router.refresh();
  };

  return (
    <div className="flex flex-col px-2">
      {/* title */}
      <div className="group flex w-full items-center gap-2">
        <h6 className="subtitle2 text-theme-green-main">{title}</h6>

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <Tooltip
              title={`Edit ${title.toLowerCase()}`}
              placement="bottom-start"
              enterDelay={300}
              arrow
            >
              <button className=" hidden h-5 w-5 items-center justify-center rounded-full text-theme-green-main transition-all duration-300 ease-in-out hover:bg-theme-green-lighter/40 active:bg-theme-green-lighter/80 group-hover:flex">
                <EditIcon className="h-4 w-4 " />
              </button>
            </Tooltip>
          </Dialog.Trigger>

          {/* Popup */}
          <Dialog.Portal>
            <Dialog.Overlay className="Dialog_Overlay" />
            <Dialog.Content className="fixed left-1/2 top-1/2 w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-4">
              <div className="flex items-center border-b border-theme-green-main pb-2">
                <Dialog.Title className="flex-grow text-xl font-semibold uppercase tracking-widest text-theme-green-darker">
                  {`Edit ${title}`}
                </Dialog.Title>
                <Dialog.Close asChild>
                  <button
                    ref={closeBtnRef}
                    className="group flex items-center justify-center rounded-full bg-gray-300 p-1 transition-all duration-300 ease-in-out hover:bg-theme-green-main"
                  >
                    <CloseIcon
                      sx={{ fontSize: "16px" }}
                      className="text-theme-green-darker transition-all duration-300 ease-in-out group-hover:text-white"
                    />
                  </button>
                </Dialog.Close>
              </div>

              {/* form */}
              <form
                onSubmit={handleSubmit}
                className="mt-4 flex flex-col gap-4"
              >
                <div className="flex flex-col">
                  <label
                    htmlFor="newVal-input"
                    className="h6 mb-1 text-gray-800"
                  >
                    {`Please enter new ${title.toLowerCase()}*`}
                  </label>
                  <input
                    onChange={(e) => {
                      setNewVal(e.target.value);
                    }}
                    value={newVal}
                    placeholder={`Please enter new ${title.toLowerCase()}`}
                    id="newVal-input"
                    name="newVal-input"
                    type={title.toLowerCase() === "link" ? "url" : "text"}
                    className="body1 rounded-md border-2 border-gray-300 px-2 py-1 outline-none focus:border-theme-green-main"
                    required
                  />
                </div>
                <Button type="submit" disabled={currentVal === newVal}>
                  CONFIRM EDIT
                </Button>
              </form>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
      {/* value */}
      <p className="body1">{value}</p>
    </div>
  );
};

export default DetailDisplay;

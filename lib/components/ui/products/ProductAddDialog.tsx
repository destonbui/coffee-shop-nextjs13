"use client";

import * as Dialog from "@radix-ui/react-dialog";

import React from "react";

import Button from "@/lib/components/ui/Button";
import { Cross2Icon } from "@radix-ui/react-icons";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { actionAddCategory } from "@/app/(admin)/dashboard/(website)/categories/actions";

interface Props {}

function formatBytes(bytes: number, decimals = 2) {
  if (!+bytes) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

const ProductAddDialog = React.forwardRef(function CarouselAddDialog(
  props: Props,
  refs
) {
  const [previewSrc, setSrc] = React.useState<null | string>(null);
  const [file, setFile] = React.useState<null | Blob>(null);
  const [name, setName] = React.useState<string>("");
  const [btnState, setBtnState] = React.useState<
    "ADD" | "UPLOADING" | "UPLOADED"
  >("ADD");

  const closeBtnRef = React.useRef<HTMLButtonElement>(null);

  const router = useRouter();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    // setBtnState("UPLOADING");

    // const formData = new FormData();

    // if (file) {
    //   formData.append("file", file);
    // }

    // const result = await fetch("/api/image/upload", {
    //   method: "POST",
    //   body: formData,
    // });

    // if (!result.ok) {
    //   throw new Error(
    //     "Something went wrong when calling upload api, please check your console."
    //   );
    // } else {
    //   const data: { success: boolean; error?: string; filepath?: string } =
    //     await result.json();

    //   if (!data.success) {
    //     throw new Error(data.error);
    //   }

    //   if (data.filepath) {
    //     const { category, error } = await actionAddCategory({
    //       filePath: data.filepath,
    //       name: name,
    //     });

    //     if (error) {
    //       throw new Error("Add category failed!");
    //     }

    //     if (category) {
    //       setBtnState("UPLOADED");

    //       closeBtnRef.current?.click();
    //       router.refresh();
    //     }
    //   }
    // }
  };

  return (
    <Dialog.Content className="fixed left-1/2 top-1/2 max-h-[600px] min-h-[300px] w-[500px] -translate-x-1/2 -translate-y-1/2 overflow-auto rounded-md bg-white p-4">
      <div className="flex items-center border-b border-theme-green-main pb-2">
        <Dialog.Title className="flex-grow text-xl font-semibold uppercase tracking-widest text-theme-green-darker">
          Thêm product
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

      <form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
        {/* Input */}
        <div className="mt-4 flex flex-col gap-6">
          <div className="flex flex-col">
            <label htmlFor="file-input" className="h6 text-gray-800">
              Product image upload*
            </label>
            {!file && (
              <div className="relative mt-1 h-[250px] w-full border border-dashed border-gray-500 pb-0">
                <div className="body2 pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-500">
                  Click or Drag your file here
                </div>
                <input
                  className="h-full w-full opacity-0"
                  type="file"
                  name="file-input"
                  id="file-input"
                  accept="image/png"
                  required
                  onChange={(e) => {
                    const files = e.target.files;

                    if (files && files[0]) {
                      setSrc(window.URL.createObjectURL(files[0] as Blob));
                      setFile(files[0]);
                    }
                  }}
                />
              </div>
            )}
            {previewSrc && (
              <div className="flex justify-center">
                <Image
                  className="mt-1"
                  id="img-preview"
                  src={previewSrc ? previewSrc : ""}
                  height={100}
                  width={100}
                  alt="User chosen image."
                />
              </div>
            )}
            {!file && (
              <p className="subtitle2 text-gray-500">
                *Chọn file hình .png với kích thước không quá 2mb và tỉ lệ hình
                là 1:1.
              </p>
            )}

            {file && (
              <div className="mt-1 flex flex-col gap-2">
                <p className="subtitle2 text-center text-gray-500">
                  File name: {file.name}, size: {formatBytes(file.size)}
                </p>
                <Button
                  onClick={() => {
                    setFile(null);
                    setSrc(null);
                  }}
                  variant="outline"
                  color="error"
                  iconEl={<Cross2Icon className="mt-[1px] text-red-700" />}
                >
                  REMOVE IMAGE
                </Button>
              </div>
            )}
          </div>

          {/* Name */}
          <div className="flex flex-col">
            <label htmlFor="img-desc" className="h6 mb-1 text-gray-800">
              Name*
            </label>
            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="body1 rounded-md border-2 border-gray-300 px-2 py-1 outline-none focus:border-theme-green-main"
              type="text"
              id="img-desc"
              name="img-desc"
              placeholder="Enter product name"
              required
            />
          </div>

          {/* Desc */}
          <div className="flex flex-col">
            <label htmlFor="img-desc" className="h6 mb-1 text-gray-800">
              Description*
            </label>
            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="body1 rounded-md border-2 border-gray-300 px-2 py-1 outline-none focus:border-theme-green-main"
              type="text"
              id="img-desc"
              name="img-desc"
              placeholder="Enter product description"
              required
            />
          </div>

          {/* Submit */}
          <div className="flex flex-col">
            <button
              disabled={btnState !== "ADD"}
              type="submit"
              className="body1 rounded-md bg-theme-green-main px-2 py-1 text-white shadow hover:shadow-md hover:brightness-90"
            >
              {btnState}
            </button>
          </div>
        </div>
      </form>
    </Dialog.Content>
  );
});

export default ProductAddDialog;

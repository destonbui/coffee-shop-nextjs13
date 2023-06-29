"use client";

import { actionAddBanner } from "@/app/(admin)/dashboard/(website)/carousel/actions";

import * as Dialog from "@radix-ui/react-dialog";
import * as AspectRatio from "@radix-ui/react-aspect-ratio";

import React from "react";

import Button from "@/lib/components/ui/Button";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Props {}

function formatBytes(bytes: number, decimals = 2) {
  if (!+bytes) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

const CarouselAddDialog = React.forwardRef(function CarouselAddDialog(
  props: Props,
  refs
) {
  const [previewSrc, setSrc] = React.useState<null | string>(null);
  const [file, setFile] = React.useState<null | Blob>(null);
  const [desc, setDesc] = React.useState<string>("");
  const [link, setLink] = React.useState<string>("");
  const [btnState, setBtnState] = React.useState<
    "ADD" | "UPLOADING" | "UPLOADED"
  >("ADD");

  const closeBtnRef = React.useRef<HTMLButtonElement>(null);

  const router = useRouter();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setBtnState("UPLOADING");

    const formData = new FormData();

    if (file) {
      formData.append("file", file);
    }

    const result = await fetch("/api/image/upload", {
      method: "POST",
      body: formData,
    });

    if (!result.ok) {
      throw new Error(
        "Something went wrong when calling upload api, please check your console."
      );
    } else {
      const data: { success: boolean; error?: string; filepath?: string } =
        await result.json();

      if (!data.success) {
        throw new Error(data.error);
      }

      if (data.filepath) {
        const { banner, error } = await actionAddBanner({
          filePath: data.filepath,
          desc: desc,
          position: Date.now(),
          ...(link !== "" ? { link } : {}),
        });

        if (error) {
          throw new Error("Add category failed!");
        }

        if (banner) {
          setBtnState("UPLOADED");

          closeBtnRef.current?.click();
          router.refresh();
        }
      }
    }
  };

  return (
    <Dialog.Content className="fixed left-1/2 top-1/2 max-h-[600px] min-h-[300px] w-[500px] -translate-x-1/2 -translate-y-1/2 overflow-auto rounded-md bg-white p-4">
      <div className="flex items-center border-b border-theme-green-main pb-2">
        <Dialog.Title className="flex-grow text-xl font-semibold uppercase tracking-widest text-theme-green-darker">
          Thêm banner
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

      <form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
        {/* Input */}
        <div className="mt-4 flex flex-col gap-6">
          <div>
            <label htmlFor="file-input" className="h6 text-gray-800">
              Image upload*
            </label>
            {!file && (
              <AspectRatio.Root
                ratio={12 / 5}
                className="relative mt-1 border border-dashed border-gray-500"
              >
                <div className="body2 pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-500">
                  Click or Drag your file here
                </div>
                <input
                  className="h-full w-full opacity-0"
                  type="file"
                  name="file-input"
                  id="file-input"
                  accept="image/*"
                  required
                  onChange={(e) => {
                    const files = e.target.files;

                    if (files) {
                      setSrc(window.URL.createObjectURL(files[0]));
                      setFile(files[0]);
                    }
                  }}
                />
              </AspectRatio.Root>
            )}
            {previewSrc && (
              <Image
                priority
                className="mt-1"
                id="img-preview"
                src={previewSrc}
                height={534}
                width={1280}
                alt="User chosen image."
              />
            )}
            {!file && (
              <p className="subtitle2 text-gray-500">
                *Chọn file hình với kích thước không quá 5mb và kích thước hình
                ảnh thấp nhất là 1280x534.
              </p>
            )}

            {file && (
              <div className="mt-1 flex flex-col gap-2">
                <p className="subtitle2 text-gray-500">
                  File name: {file.name}, size: {formatBytes(file.size)}
                </p>
                <Button
                  onClick={() => {
                    setFile(null);
                    setSrc(null);
                  }}
                  variant="outline"
                  color="error"
                  iconEl={<CloseIcon className="body1 text-red-700" />}
                >
                  Remove image
                </Button>
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="img-desc" className="h6 mb-1 text-gray-800">
              Image description*
            </label>
            <input
              value={desc}
              onChange={(e) => {
                setDesc(e.target.value);
              }}
              className="body1 rounded-md border-2 border-gray-300 px-2 py-1 outline-none focus:border-theme-green-main"
              type="text"
              id="img-desc"
              name="img-desc"
              placeholder="Enter image description."
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="img-link" className="h6 mb-1 text-gray-800">
              Link
            </label>
            <input
              value={link}
              onChange={(e) => {
                setLink(e.target.value);
              }}
              className="body1 rounded-md border-2 border-gray-300 px-2 py-1 outline-none focus:border-theme-green-main"
              type="url"
              id="img-link"
              name="img-link"
              placeholder="Enter link to detail post."
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

export default CarouselAddDialog;

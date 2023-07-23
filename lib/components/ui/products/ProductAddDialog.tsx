"use client";

import * as Dialog from "@radix-ui/react-dialog";

import React from "react";

import Button from "@/lib/components/ui/Button";
import { Cross2Icon } from "@radix-ui/react-icons";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { actionAddProduct } from "@/app/(admin)/dashboard/(website)/products/actions";

import CategorySelect from "./CategorySelect";
import SubcategorySelect from "./SubcategorySelect";
import { blobToDataUrl } from "@/lib/utils/thumbhash";

interface Props {}

function formatBytes(bytes: number, decimals = 2) {
  if (!+bytes) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

const ProductAddDialog = React.forwardRef(function ProductAddDialog(
  props: Props,
  refs
) {
  const [previewSrc, setSrc] = React.useState<null | string>(null);
  const [file, setFile] = React.useState<null | Blob>(null);
  const [name, setName] = React.useState<string>("");
  const [desc, setDesc] = React.useState<string>("");
  const [price, setPrice] = React.useState<number>(0);
  const [upsizePrice, setUpsizePrice] = React.useState<number>(0);
  const [tagInput, setTagInput] = React.useState<string>("");
  const [tags, setTags] = React.useState<string[] | undefined>();

  const [category, setCategory] = React.useState<string | undefined>();
  const [subcategory, setSubcategory] = React.useState<string | undefined>();

  const [btnState, setBtnState] = React.useState<
    "ADD" | "UPLOADING" | "UPLOADED"
  >("ADD");

  const closeBtnRef = React.useRef<HTMLButtonElement>(null);

  const router = useRouter();

  const handleAddTag = () => {
    if (tagInput !== "") {
      const newTag = tagInput.toUpperCase().replace(/^a-zA-Z0-9]/g, "");

      if (!tags) {
        setTags([newTag]);
        setTagInput("");
      } else {
        if (!tags.includes(newTag)) {
          setTags((prev) => [...(prev ? prev : []), newTag]);
          setTagInput("");
        } else {
          setTagInput("");
        }
      }
    }
  };

  const canSubmit = name !== "" && file && price !== 0 && category;

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
        const blurUrl = await blobToDataUrl(file as Blob);

        const { product, error } = await actionAddProduct({
          img_url: data.filepath,
          blurUrl: blurUrl,
          name,
          desc,
          price,
          upsize_price: upsizePrice,
          tags,
          category_name: category ? category : "ERROR",
          subcategory_name: subcategory,
        });
        if (error) {
          throw new Error("Add category failed!");
        }
        if (product) {
          setBtnState("UPLOADED");
          closeBtnRef.current?.click();
          router.refresh();
        }
      }
    }
  };

  React.useEffect(() => {
    return () => {
      previewSrc && window.URL.revokeObjectURL(previewSrc);
    };
  });

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

      <p className="mt-2 text-gray-400">
        Tạo sản phẩm mới với đầy đủ thông tin sản phẩm. Các user preferences
        hoặc topping có thể được thêm vào sau khi tạo sản phẩm.
      </p>

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

                    if (files) {
                      if (previewSrc) {
                        setSrc(null);
                        window.URL.revokeObjectURL(previewSrc);
                      }
                      setSrc(window.URL.createObjectURL(files[0]));
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
                  height={250}
                  width={250}
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
            <label htmlFor="product-name" className="h6 mb-1 text-gray-800">
              Name*
            </label>
            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="body1 rounded-md border-2 border-gray-300 px-2 py-1 outline-none focus:border-theme-green-main"
              type="text"
              id="product-name"
              name="product-name"
              placeholder="Enter product name"
              required
            />
          </div>

          {/* Category */}
          <div className=" flex flex-col">
            <label htmlFor="product-category" className="h6 mb-1 text-gray-800">
              Category*
            </label>

            <CategorySelect
              category={category}
              handleChangeCategory={(value) => {
                setCategory(value);
              }}
            />
          </div>

          {/* Subcategory */}
          <div className="flex flex-col">
            <label htmlFor="product-category" className="h6 mb-1 text-gray-800">
              Subcategory
            </label>

            <SubcategorySelect
              category={category}
              subcategory={subcategory}
              handleChangeSubcategory={(value) => {
                setSubcategory(value);
              }}
            />
          </div>

          {/* Desc */}
          <div className="flex flex-col">
            <label htmlFor="product-desc" className="h6 mb-1 text-gray-800">
              Description
            </label>
            <textarea
              value={desc}
              onChange={(e) => {
                setDesc(e.target.value);
              }}
              className="body1 rounded-md border-2 border-gray-300 px-2 py-1 outline-none focus:border-theme-green-main"
              rows={3}
              id="product-desc"
              name="product-desc"
              placeholder="Enter product description"
            />
          </div>

          {/* price */}
          <div className="flex flex-col">
            <label htmlFor="product-price" className="h6 mb-1 text-gray-800">
              Price*
            </label>
            <input
              value={price}
              onChange={(e) => {
                let newVal =
                  Number(e.target.value) < 0 ? 0 : Number(e.target.value);
                setPrice(newVal);
              }}
              className="body1 rounded-md border-2 border-gray-300 px-2 py-1 outline-none focus:border-theme-green-main"
              type="number"
              step={1000}
              id="product-price"
              name="product-price"
              placeholder="Enter product price"
              required
            />
          </div>

          {/* Upsize */}
          <div className="flex flex-col">
            <label htmlFor="product-upsize" className="h6 mb-1 text-gray-800">
              Upsize price*
            </label>
            <input
              value={upsizePrice}
              onChange={(e) => {
                let newVal =
                  Number(e.target.value) < 0 ? 0 : Number(e.target.value);
                setUpsizePrice(newVal);
              }}
              className="body1 rounded-md border-2 border-gray-300 px-2 py-1 outline-none focus:border-theme-green-main"
              type="number"
              step={1000}
              id="product-upsize"
              name="product-upsize"
              placeholder="Enter product upsize price"
            />
          </div>

          {/* Tags */}
          <div className="flex flex-col">
            <label htmlFor="product-upsize" className="h6 mb-1 text-gray-800">
              Tags
            </label>
            <div className="flex gap-2">
              <input
                value={tagInput}
                onChange={(e) => {
                  setTagInput(e.target.value);
                }}
                className="body1 flex-grow rounded-md border-2 border-gray-300 px-2 py-1 outline-none focus:border-theme-green-main"
                type="text"
                id="product-upsize"
                name="product-upsize"
                placeholder="Enter tags. Ex: new / featured"
              />
              <Button
                onClick={() => {
                  handleAddTag();
                }}
              >
                Add tag
              </Button>
            </div>
            <div className="mt-2 flex gap-2">
              {tags &&
                tags.map((tag, i) => {
                  return (
                    <div
                      className="flex items-center gap-1 rounded-full border border-theme-green-main px-4 text-gray-700"
                      key={tag}
                    >
                      <span>{tag}</span>
                      <button
                        onClick={() => {
                          setTags((prev) => {
                            if (prev) {
                              return prev.filter((currentTag) => {
                                return tag !== currentTag;
                              });
                            }
                          });
                        }}
                        className="text-red-700"
                      >
                        <Cross2Icon />
                      </button>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Submit */}
          <div className="flex flex-col">
            <Button disabled={!canSubmit} type="submit">
              {btnState}
            </Button>
          </div>
        </div>
      </form>
    </Dialog.Content>
  );
});

export default ProductAddDialog;

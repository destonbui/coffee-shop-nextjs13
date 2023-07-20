"use client";

import * as Dialog from "@radix-ui/react-dialog";

import React from "react";

import Button from "@/lib/components/ui/Button";
import { Cross2Icon } from "@radix-ui/react-icons";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { actionUpdateProduct } from "@/app/(admin)/dashboard/(website)/products/actions";

import CategorySelect from "./CategorySelect";
import SubcategorySelect from "./SubcategorySelect";
import { Product } from "@prisma/client";
import { ProductUpdateData } from "@/lib/prisma/products";

interface Props {
  data: Product;
}

const ProductEditDialog = React.forwardRef(function ProductEditDialog(
  { data }: Props,
  refs
) {
  const [name, setName] = React.useState<string>(data.name);
  const [desc, setDesc] = React.useState<string>(data.description ?? "");
  const [price, setPrice] = React.useState<number>(data.price);
  const [upsizePrice, setUpsizePrice] = React.useState<number>(
    data.upsize_price ?? 0
  );
  const [tagInput, setTagInput] = React.useState<string>("");
  const [tags, setTags] = React.useState<string[]>(data.tags);

  const [category, setCategory] = React.useState<string>(data.category_name);
  const [subcategory, setSubcategory] = React.useState<string | undefined>(
    data.subcategory_name ?? undefined
  );

  const [changes, setChanges] = React.useState<string[]>([]);

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

  const canSubmit = name !== "" && price !== 0 && category && changes[0];

  React.useEffect(() => {
    const tagsStringify = JSON.stringify(tags.sort());
    const currentTagsStringify = JSON.stringify(data.tags.sort());

    if (tagsStringify !== currentTagsStringify) {
      if (!changes.includes("tags")) {
        setChanges((prev) => [...prev, "tags"]);
      }
    } else {
      setChanges((prev) => {
        return prev.filter((item) => {
          return item !== "tags";
        });
      });
    }
  }, [tags]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const updateData: ProductUpdateData = {};

    changes.map((change) => {
      if (change === "name") {
        updateData.name = name;
      }
      if (change === "desc") {
        updateData.desc = desc;
      }
      if (change === "category") {
        updateData.category = category;
      }
      if (change === "subcategory") {
        updateData.subcategory = subcategory;
      }
      if (change === "price") {
        updateData.price = price;
      }
      if (change === "upsize_price") {
        updateData.upsize_price = upsizePrice;
      }
      if (change === "tags") {
        updateData.tags = tags;
      }
    });

    const { product } = await actionUpdateProduct(updateData, data.id);

    closeBtnRef.current?.click();
    router.refresh();
  };

  return (
    <Dialog.Content className="fixed left-1/2 top-1/2 max-h-[600px] min-h-[300px] w-[500px] -translate-x-1/2 -translate-y-1/2 overflow-auto rounded-md bg-white p-4">
      <div className="flex items-center border-b border-theme-green-main pb-2">
        <Dialog.Title className="flex-grow text-xl font-semibold uppercase tracking-widest text-theme-green-darker">
          Edit product
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
              Product image*
            </label>

            <div className="flex justify-center">
              <Image
                className="mt-1"
                id="img-preview"
                src={data.image_url}
                height={250}
                width={250}
                alt="User chosen image."
              />
            </div>
          </div>

          {/* Name */}
          <div className="flex flex-col">
            <label htmlFor="product-name" className="h6 mb-1 text-gray-800">
              Name*
            </label>
            <input
              value={name}
              onChange={(e) => {
                if (e.target.value !== data.name) {
                  if (!changes.includes("name")) {
                    setChanges((prev) => [...prev, "name"]);
                  }
                } else {
                  setChanges((prev) => {
                    return prev.filter((item) => {
                      return item !== "name";
                    });
                  });
                }
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
                if (value !== data.category_name) {
                  if (!changes.includes("category")) {
                    setChanges((prev) => [...prev, "category", "subcategory"]);
                  }
                } else {
                  setChanges((prev) => {
                    return prev.filter((item) => {
                      if (subcategory !== data.subcategory_name) {
                        return item !== "category";
                      } else {
                        return item !== "category" && item !== "subcategory";
                      }
                    });
                  });
                }
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
                if (value !== data.subcategory_name) {
                  if (!changes.includes("subcategory")) {
                    setChanges((prev) => [...prev, "subcategory"]);
                  }
                } else {
                  setChanges((prev) => {
                    return prev.filter((item) => {
                      return item !== "subcategory";
                    });
                  });
                }
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
                if (
                  e.target.value !== (data.description ? data.description : "")
                ) {
                  if (!changes.includes("desc")) {
                    setChanges((prev) => [...prev, "desc"]);
                  }
                } else {
                  setChanges((prev) => {
                    return prev.filter((item) => {
                      return item !== "desc";
                    });
                  });
                }
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

                if (newVal !== data.price) {
                  if (!changes.includes("price")) {
                    setChanges((prev) => [...prev, "price"]);
                  }
                } else {
                  setChanges((prev) => {
                    return prev.filter((item) => {
                      return item !== "price";
                    });
                  });
                }
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

                if (newVal !== data.upsize_price) {
                  if (!changes.includes("upsize_price")) {
                    setChanges((prev) => [...prev, "upsize_price"]);
                  }
                } else {
                  setChanges((prev) => {
                    return prev.filter((item) => {
                      return item !== "upsize_price";
                    });
                  });
                }
                setUpsizePrice(newVal);
              }}
              className="body1 rounded-md border-2 border-gray-300 px-2 py-1 outline-none focus:border-theme-green-main"
              type="number"
              step={1000}
              id="product-upsize"
              name="product-upsize"
              placeholder="Enter product upsize price"
              required
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
              {tags[0] &&
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
                            return [];
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
              CONFIRM EDIT
            </Button>
          </div>
        </div>
      </form>
    </Dialog.Content>
  );
});

export default ProductEditDialog;

"use client";

import * as Dialog from "@radix-ui/react-dialog";
import * as Tabs from "@radix-ui/react-tabs";

import React from "react";

import Button from "@/lib/components/ui/Button";
import { Cross2Icon } from "@radix-ui/react-icons";

import { useRouter } from "next/navigation";
import {
  actionAddOptionPreference,
  actionAddOptionTopping,
} from "@/app/(admin)/dashboard/(website)/product-options/actions";

interface Props {}

const OptionAddDialog = React.forwardRef(function CarouselAddDialog(
  props: Props,
  refs
) {
  const [refName, setRefName] = React.useState<string>("");
  const [toppingName, setToppingName] = React.useState<string>("");
  const [toppingPrice, setToppingPrice] = React.useState<number>(0);
  const [adding, setAdding] = React.useState<boolean>(false);

  const closeBtnRef = React.useRef<HTMLButtonElement>(null);

  const router = useRouter();

  const handleSubmitRef: React.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();

    setAdding(true);

    const { preference, error } = await actionAddOptionPreference({
      name: refName,
    });

    if (error) {
      throw new Error("Add option reference failed");
    }

    router.refresh();
    closeBtnRef.current?.click();
  };
  const handleSubmitTopping: React.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();

    const { topping, error } = await actionAddOptionTopping({
      name: toppingName,
      price: toppingPrice,
    });

    if (error) {
      throw new Error("Add option topping failed");
    }

    if (topping) {
      setAdding(false);
      router.refresh();
      closeBtnRef.current?.click();
    }
  };

  return (
    <Dialog.Content className="fixed left-1/2 top-1/2 max-h-[600px] min-h-[300px] w-[500px] -translate-x-1/2 -translate-y-1/2 overflow-auto rounded-md bg-white p-4">
      <div className="flex items-center border-b border-theme-green-main pb-2">
        <Dialog.Title className="flex-grow text-xl font-semibold uppercase tracking-widest text-theme-green-darker">
          Thêm option
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

      <Tabs.Root className="mt-2 flex flex-col" defaultValue="tab1">
        <Tabs.List
          className="flex h-[50px] overflow-hidden rounded-t-md border-b border-gray-300"
          aria-label="Manage your account"
        >
          <Tabs.Trigger
            className="flex-1 bg-white text-lg text-gray-400 transition-colors duration-200 ease-in-out  data-[state=active]:border-b-2 data-[state=active]:border-theme-green-main data-[state=active]:text-theme-green-main"
            value="tab1"
          >
            Preference
          </Tabs.Trigger>

          <Tabs.Trigger
            className="flex-1 bg-white text-lg text-gray-400 transition-colors duration-200 ease-in-out  data-[state=active]:border-b-2 data-[state=active]:border-theme-green-main data-[state=active]:text-theme-green-main"
            value="tab2"
          >
            Topping
          </Tabs.Trigger>
        </Tabs.List>

        {/* Tab 1 content */}
        <Tabs.Content className="flex flex-col" value="tab1">
          <p className="body1 mt-2 text-sm text-gray-400">
            Thêm option thuộc loại user preference như độ ngọt, đá,... Các lựa
            chọn: LESS | NORMAL | MORE. Mặc định: NORMAL
          </p>

          <form onSubmit={handleSubmitRef} className="mt-4 flex flex-col gap-4">
            <div className="flex flex-col">
              <label
                htmlFor="opt-ref-name"
                className="subtitle1 mb-1 text-gray-800"
              >
                Name*
              </label>
              <input
                value={refName}
                onChange={(e) => {
                  setRefName(e.target.value);
                }}
                className="body1 rounded-md border-2 border-gray-300 px-2 py-1 outline-none focus:border-theme-green-main"
                type="text"
                id="opt-ref-name"
                name="opt-ref-name"
                placeholder="Enter reference option name"
                required
              />
            </div>

            <Button disabled={refName === "" || adding} type="submit">
              {adding ? "ADDING" : "ADD"}
            </Button>
          </form>
        </Tabs.Content>

        {/* Tab 2 content */}
        <Tabs.Content className="flex flex-col" value="tab2">
          <p className="body1 mt-2 text-sm text-gray-400">
            Thêm option thuộc loại topping
          </p>

          <form
            onSubmit={handleSubmitTopping}
            className="mt-4 flex flex-col gap-4"
          >
            <div className="flex flex-col gap-2">
              <div className="flex flex-col">
                <label
                  htmlFor="opt-top-name"
                  className="subtitle1 mb-1 text-gray-800"
                >
                  Name*
                </label>
                <input
                  value={toppingName}
                  onChange={(e) => {
                    setToppingName(e.target.value);
                  }}
                  className="body1 rounded-md border-2 border-gray-300 px-2 py-1 outline-none focus:border-theme-green-main"
                  type="text"
                  id="opt-top-name"
                  name="opt-top-name"
                  placeholder="Enter topping option name"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="opt-top-price"
                  className="subtitle1 mb-1 text-gray-800"
                >
                  Price*
                </label>
                <input
                  value={toppingPrice}
                  onChange={(e) => {
                    let newVal =
                      Number(e.target.value) < 0 ? 0 : Number(e.target.value);
                    setToppingPrice(newVal);
                  }}
                  className="body1 rounded-md border-2 border-gray-300 px-2 py-1 outline-none focus:border-theme-green-main"
                  type="number"
                  id="opt-top-price"
                  name="opt-top-price"
                  placeholder="Enter topping option price"
                  step={1000}
                  required
                />
              </div>
            </div>

            <Button
              disabled={toppingName === "" || toppingPrice === 0 || adding}
              type="submit"
            >
              {adding ? "ADDING" : "ADD"}
            </Button>
          </form>
        </Tabs.Content>
      </Tabs.Root>
    </Dialog.Content>
  );
});

export default OptionAddDialog;

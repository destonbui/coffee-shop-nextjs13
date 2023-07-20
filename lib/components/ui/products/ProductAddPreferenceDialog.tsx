"use client";

import * as Dialog from "@radix-ui/react-dialog";

import React from "react";

import { Cross2Icon } from "@radix-ui/react-icons";

import { useRouter } from "next/navigation";
import { Option, OptionOfProduct } from "@prisma/client";
import { actionFetchPreferences } from "@/app/(admin)/dashboard/(website)/product-options/actions";
import Button from "../Button";
import { actionConnectPreferences } from "@/app/(admin)/dashboard/(website)/products/actions";

interface Props {
  optionsOfProduct: (OptionOfProduct & {
    option: Option;
  })[];
  productId: string;
}

const ProductAddPreferenceDialog = React.forwardRef(
  function ProductAddPreferenceDialog(
    { optionsOfProduct, productId }: Props,
    refs
  ) {
    const [preferences, setPreferences] = React.useState<Option[] | null>(null);
    const [selectedPreferences, setSelectedPreferences] = React.useState<
      string[]
    >([]);

    const optionIds = optionsOfProduct.map((optionOfProduct) => {
      return optionOfProduct.optionId;
    });

    React.useEffect(() => {
      async function fetchPreferences() {
        const { preferences: preferencesFromDb } =
          await actionFetchPreferences();

        if (preferencesFromDb) {
          setPreferences(
            preferencesFromDb.filter((preference) => {
              return !optionIds.includes(preference.id);
            })
          );
        }
      }

      fetchPreferences();
    }, []);

    const closeBtnRef = React.useRef<HTMLButtonElement>(null);

    const router = useRouter();

    const handleSubmit = async () => {
      const { product } = await actionConnectPreferences({
        productId: productId,
        preferenceIds: selectedPreferences,
      });

      if (product) {
        closeBtnRef.current?.click();
        router.refresh();
      }
    };

    return (
      <Dialog.Content className="fixed left-1/2 top-1/2 max-h-[600px] w-[500px] -translate-x-1/2 -translate-y-1/2 overflow-auto rounded-md bg-white p-4">
        <div className="flex items-center border-b border-theme-green-main pb-2">
          <Dialog.Title className="flex-grow text-xl font-semibold uppercase tracking-widest text-theme-green-darker">
            Add preferences
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
          Select all preferences that you want to connect
        </p>

        <div className="mt-4 flex flex-col gap-2">
          {!preferences ? (
            <span>Loading preferences...</span>
          ) : preferences[0] ? (
            preferences.map((preference) => {
              return (
                <div className="flex items-center" key={preference.id}>
                  <input
                    className="Checkbox"
                    id={preference.name}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedPreferences((prev) => [
                          ...prev,
                          preference.id,
                        ]);
                      } else {
                        setSelectedPreferences((prev) =>
                          prev.filter((id) => {
                            return id !== preference.id;
                          })
                        );
                      }
                    }}
                    type="checkbox"
                  ></input>
                  <span className="ml-2 font-medium text-gray-700">
                    {preference.name}
                  </span>
                </div>
              );
            })
          ) : (
            <p className="mt-2 text-gray-700">No preference to add</p>
          )}

          <div mt-2 />
          <Button
            onClick={() => handleSubmit()}
            disabled={!selectedPreferences[0]}
          >
            ADD
          </Button>
        </div>
      </Dialog.Content>
    );
  }
);

export default ProductAddPreferenceDialog;

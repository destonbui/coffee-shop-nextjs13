"use client";

import * as Dialog from "@radix-ui/react-dialog";

import React from "react";

import { Cross2Icon } from "@radix-ui/react-icons";

import { useRouter } from "next/navigation";
import { Topping, ToppingOfProduct } from "@prisma/client";
import { actionFetchToppings } from "@/app/(admin)/dashboard/(website)/product-options/actions";
import { actionConnectToppings } from "@/app/(admin)/dashboard/(website)/products/actions";
import Button from "../Button";
import { toVND } from "@/lib/utils/numberToCurrency";

interface Props {
  toppingsOfProduct: (ToppingOfProduct & {
    topping: Topping;
  })[];
  productId: string;
}

const ProductAddToppingDialog = React.forwardRef(
  function ProductAddPreferenceDialog(
    { toppingsOfProduct, productId }: Props,
    refs
  ) {
    const [toppings, setToppings] = React.useState<Topping[] | null>(null);
    const [selectedToppings, setSelectedToppings] = React.useState<string[]>(
      []
    );

    const toppingIds = toppingsOfProduct.map((toppingOfProduct) => {
      return toppingOfProduct.toppingId;
    });

    React.useEffect(() => {
      async function fetchPreferences() {
        const { toppings: toppingsFromDb } = await actionFetchToppings();

        if (toppingsFromDb) {
          setToppings(
            toppingsFromDb.filter((topping) => {
              return !toppingIds.includes(topping.id);
            })
          );
        }
      }

      fetchPreferences();
    }, []);

    const closeBtnRef = React.useRef<HTMLButtonElement>(null);

    const router = useRouter();

    const handleSubmit = async () => {
      const { product } = await actionConnectToppings({
        productId: productId,
        toppingIds: selectedToppings,
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
            Add toppings
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
          Select all toppings that you want to connect
        </p>

        <div className="mt-4 flex flex-col gap-2">
          {!toppings ? (
            <span>Loading preferences...</span>
          ) : toppings[0] ? (
            toppings.map((topping) => {
              return (
                <div className="flex items-center" key={topping.id}>
                  <input
                    className="Checkbox"
                    id={topping.name}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedToppings((prev) => [...prev, topping.id]);
                      } else {
                        setSelectedToppings((prev) =>
                          prev.filter((id) => {
                            return id !== topping.id;
                          })
                        );
                      }
                    }}
                    type="checkbox"
                  ></input>
                  <span className="ml-2 font-medium text-gray-700">
                    {topping.name} {toVND(topping.price)}
                  </span>
                </div>
              );
            })
          ) : (
            <p className="mt-2 text-gray-700">No topping to add</p>
          )}

          <div mt-2 />
          <Button
            onClick={() => handleSubmit()}
            disabled={!selectedToppings[0]}
          >
            ADD
          </Button>
        </div>
      </Dialog.Content>
    );
  }
);

export default ProductAddToppingDialog;

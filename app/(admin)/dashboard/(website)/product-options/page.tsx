import React from "react";

import AddOptionButton from "@/lib/components/ui/options/AddOptionButton";
import { actionFetchPreferences, actionFetchToppings } from "./actions";
import PreferenceValue from "@/lib/components/ui/options/PreferenceValue";
import { Cross2Icon } from "@radix-ui/react-icons";
import DeletePreferenceButton from "@/lib/components/ui/options/DeletePreferenceButton";

interface Props {}

const Products = async (props: Props) => {
  const [referencesData, toppingsData] = await Promise.all([
    actionFetchPreferences(),
    actionFetchToppings(),
  ]);

  const { preferences, error: preferenceError } = referencesData;
  const { toppings, error: toppingError } = toppingsData;

  if (preferenceError || toppingError) {
    throw new Error("Fetch options data failed");
  }

  return (
    <>
      <h1 className="h4 text-theme-green-main">Product Options</h1>
      <p className="body1">
        Thêm, xóa, chỉnh sửa các mục lựa chọn và topping trên các sản phẩm thức
        uống.
      </p>

      {/* Add banner dialog */}
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <h2 className="h6 flex-grow text-theme-green-main">Options</h2>
        <div className="flex items-center gap-4">
          <AddOptionButton />
        </div>
      </div>

      <hr className="my-2 border-gray-300" />

      {/* Display options */}

      <div className="mt-4 flex flex-col">
        <div className="flex min-h-[500px] rounded-md bg-white shadow">
          {/* Preferences */}
          <div className="flex-1 p-4">
            <h6 className="h6 text-gray-700">Preferences</h6>
            <p className="body1 text-gray-400">
              Các option mà khách hàng có thể điều chỉnh theo sở thích.
            </p>

            {preferences && (
              <div className="mt-4 flex flex-col gap-4">
                {preferences.map((preference, i) => {
                  return (
                    <div key={i} className="group">
                      <div className="flex gap-4">
                        <span className="uppercase text-theme-green-main">
                          {preference.name}
                        </span>
                        <span className="text-gray-300">Default value</span>
                        <div className="flex-grow" />
                        <DeletePreferenceButton id={preference.id} />
                      </div>
                      <div className=" mt-1 flex rounded-md border border-gray-300 bg-white text-gray-700">
                        <PreferenceValue
                          val="NONE"
                          currentVal={preference.value}
                          id={preference.id}
                        />
                        <PreferenceValue
                          val="LESS"
                          currentVal={preference.value}
                          id={preference.id}
                        />
                        <PreferenceValue
                          val="NORMAL"
                          currentVal={preference.value}
                          id={preference.id}
                        />
                        <PreferenceValue
                          val="MORE"
                          currentVal={preference.value}
                          id={preference.id}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="w-[1px] bg-gray-300" />

          {/* Toppings */}
          <div className="flex-1 p-4">
            <h6 className="h6 text-gray-700">Toppings</h6>
            <p className="body1 text-gray-400">
              Các topping mà khách hàng thêm vào thức uống của mình.
            </p>

            {toppings && (
              <div className="mt-4 flex flex-col gap-4">
                {toppings.map((topping, i) => {
                  return (
                    <div key={i}>
                      <span className="subtitle1 text-theme-green-main">
                        {topping.name}
                        {topping.price}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;

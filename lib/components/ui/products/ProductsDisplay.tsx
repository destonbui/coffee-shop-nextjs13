"use client";

import {
  Option,
  OptionOfProduct,
  Product,
  Topping,
  ToppingOfProduct,
} from "@prisma/client";
import React from "react";

import Image from "next/image";
import { toVND } from "@/lib/utils/numberToCurrency";

import { Cross1Icon, PlusIcon } from "@radix-ui/react-icons";
import ProductEditButton from "./ProductEditButton";

type Props = {
  productsFromDb: (Product & {
    options: (OptionOfProduct & {
      option: Option;
    })[];
    toppings: (ToppingOfProduct & {
      topping: Topping;
    })[];
  })[];
  currentCategory: string;
  currentSubcategory: string;
};

const ProductsDisplay = ({
  productsFromDb,
  currentCategory,
  currentSubcategory,
}: Props) => {
  const [products, setProducts] = React.useState<
    (Product & {
      options: (OptionOfProduct & {
        option: Option;
      })[];
      toppings: (ToppingOfProduct & {
        topping: Topping;
      })[];
    })[]
  >(productsFromDb);

  React.useEffect(() => {
    if (currentCategory === "All") {
      setProducts(productsFromDb);
    } else {
      if (currentSubcategory === "All") {
        const filteredProducts = productsFromDb.filter((product) => {
          return product.category_name === currentCategory;
        });

        setProducts(filteredProducts);
      } else {
        const filteredProducts = productsFromDb.filter((product) => {
          return product.subcategory_name === currentSubcategory;
        });

        setProducts(filteredProducts);
      }
    }
  }, [currentCategory, currentSubcategory, productsFromDb]);

  console.log(productsFromDb);

  return (
    <div className="flex flex-wrap gap-4">
      {products.map((product) => {
        return (
          <div
            className="group flex min-w-[400px] flex-col overflow-hidden rounded-md bg-white  shadow"
            key={product.id}
          >
            {/* Category display */}
            <div className="flex gap-2 bg-gray-100 px-4 py-2">
              <span className="text-base text-gray-700">Tags:</span>
              {product.tags[0] ? (
                product.tags.map((tag) => {
                  return (
                    <span
                      key={tag}
                      className="pointer-events-none flex items-center justify-center rounded-full bg-theme-green-main px-2 text-sm text-gray-100"
                    >
                      {tag}
                    </span>
                  );
                })
              ) : (
                <span className="text-base text-gray-400">No tag</span>
              )}

              <div className="flex-grow" />
              <button className="relative rounded-full text-red-700">
                <Cross1Icon />
              </button>
            </div>
            {/* Basic product info display */}
            <div className="flex ">
              <div className="flex w-[150px] justify-center py-4">
                <Image
                  className="drop-shadow-lg"
                  src={product.image_url}
                  alt={product.name}
                  width={150}
                  height={150}
                />
              </div>

              <div className=" mr-4 flex flex-grow flex-col py-4">
                <div className="flex gap-2">
                  <h6 className="text-lg text-gray-700 ">{product.name}</h6>
                  {/* Edit product */}
                  <ProductEditButton data={product} />
                </div>
                <span className=" text-2xl font-bold text-theme-green-main">
                  {toVND(product.price)}
                </span>

                {/* Sizes display */}
                {product.upsize_price && (
                  <>
                    <span className="mb-1 mt-4 font-semibold tracking-wide text-theme-green-main">
                      Sizes
                    </span>
                    <div className="flex gap-2">
                      <div
                        data-active={true}
                        className="group relative flex w-[75px] flex-1 flex-col items-center overflow-hidden rounded-lg border border-gray-300 data-[active=true]:border-theme-green-main data-[active=true]:bg-gray-100"
                      >
                        <p className="py-1 text-gray-700">M</p>
                        <div className="flex h-full w-full items-center justify-center bg-gray-200 px-2 py-1 group-data-[active=true]:bg-theme-green-main group-data-[active=true]:text-gray-200">
                          <span className="text-xs">+{toVND(0)}</span>
                        </div>
                      </div>

                      <div
                        data-active={false}
                        className="group relative flex min-w-[75px] flex-1 flex-col items-center overflow-hidden rounded-lg border border-gray-300 data-[active=true]:bg-gray-100"
                      >
                        <p className="py-1 text-gray-700">L</p>
                        <div className="flex h-full w-full items-center justify-center bg-gray-200 px-2 py-1 group-data-[active=true]:bg-theme-green-main group-data-[active=true]:text-gray-200">
                          <span className="text-xs">
                            +{toVND(product.upsize_price)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            <hr />

            <div className="flex min-h-[100px] px-4 py-2">
              {/*  */}
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-semibold tracking-wide text-theme-green-main">
                    Preferences
                  </p>
                  {/* Add preference button */}
                  <button className="rounded-full bg-gray-100 p-1 text-theme-green-main transition-all duration-200 ease-in-out hover:bg-gray-200 hover:shadow">
                    <PlusIcon className="scale-80" />
                  </button>
                </div>
                <ul>
                  {product.options.map((optionRef) => {
                    return (
                      <li key={optionRef.option.name}>
                        {optionRef.option.name}
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/*  */}
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-semibold tracking-wide text-theme-green-main">
                    Toppings
                  </p>
                  {/* Add toppings button */}
                  <button className="rounded-full bg-gray-100 p-1 text-theme-green-main transition-all duration-200 ease-in-out hover:bg-gray-200 hover:shadow">
                    <PlusIcon className="scale-80" />
                  </button>
                </div>
                <ul>
                  {product.toppings.map((toppingRef) => {
                    return (
                      <li key={toppingRef.topping.name}>
                        {toppingRef.topping.name}
                        {toVND(toppingRef.topping.price)}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductsDisplay;

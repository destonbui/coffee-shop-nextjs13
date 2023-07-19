"use client";

import {
  Category,
  OptionOfProduct,
  Product,
  Option,
  ToppingOfProduct,
  Topping,
} from "@prisma/client";
import React from "react";
import ProductsDisplay from "./ProductsDisplay";
import Image from "next/image";

type Props = {
  categories: Category[];
  products: (Product & {
    options: (OptionOfProduct & {
      option: Option;
    })[];
    toppings: (ToppingOfProduct & {
      topping: Topping;
    })[];
  })[];
};

const CategoriesDisplay = ({ products, categories }: Props) => {
  const [currentCategory, setCurrentCategory] = React.useState<string>("All");
  const [subcategories, setSubcategories] = React.useState<string[]>([]);
  const [currentSubcategory, setCurrentSubcategory] =
    React.useState<string>("All");

  React.useEffect(() => {
    setCurrentSubcategory("All");
  }, [currentCategory]);

  return (
    <div className="mt-4 w-full">
      {/* Categories display */}
      <div className="mb-4 flex h-[100px] gap-4">
        <div
          onClick={() => {
            setCurrentCategory("All");
            setCurrentSubcategory("All");
            setSubcategories([]);
          }}
          key={"All"}
          data-active={currentCategory === "All"}
          className={`flex w-[90px] flex-shrink-0 cursor-pointer flex-col items-center justify-center gap-2 rounded-md bg-transparent bg-white pt-2 transition duration-150 ease-linear hover:border-b-4 hover:border-theme-green-main hover:bg-gray-50 hover:shadow-md hover:shadow-gray-900/25 active:border-b-2 active:bg-gray-100 active:shadow active:shadow-gray-900/25 data-[active=true]:border data-[active=true]:border-theme-green-main data-[active=true]:bg-gray-100`}
        >
          <span className="text-lg font-medium text-theme-green-main md:text-base">
            All
          </span>
        </div>
        {categories.map((category) => {
          return (
            <div
              onClick={() => {
                setCurrentCategory(category.name);
                setSubcategories([...category.subcategories_names]);
              }}
              data-active={currentCategory == category.name}
              key={category.name}
              className={`flex w-[90px] flex-shrink-0 cursor-pointer flex-col items-center justify-center gap-2 rounded-md bg-transparent bg-white pt-2 transition duration-150 ease-linear hover:border-b-4 hover:border-theme-green-main hover:bg-gray-50 hover:shadow-md hover:shadow-gray-900/25 active:border-b-2 active:bg-gray-100 active:shadow active:shadow-gray-900/25 data-[active=true]:border data-[active=true]:border-theme-green-main data-[active=true]:bg-gray-100`}
            >
              <Image
                className="pointer-events-none mx-auto h-[40px] w-auto lg:h-[60px]"
                src={category.image_url}
                alt={category.name}
                height={116}
                width={116}
                priority
              />

              <span className="pointer-events-none text-center font-baloo text-sm font-medium text-theme-green-main md:text-base">
                {category.name}
              </span>
            </div>
          );
        })}
      </div>

      {/* Subcategories display */}
      <div className="mb-4 flex items-center gap-2">
        {subcategories[0] && (
          <button
            onClick={() => {
              setCurrentSubcategory("All");
            }}
            data-active={currentSubcategory === "All"}
            key={"All"}
            className="rounded-full bg-white px-4 py-1 font-medium text-theme-green-main data-[active=true]:bg-theme-green-main data-[active=true]:text-white"
          >
            All
          </button>
        )}
        {subcategories[0] &&
          subcategories.map((subcategory) => {
            return (
              <button
                onClick={() => {
                  setCurrentSubcategory(subcategory);
                }}
                data-active={currentSubcategory === subcategory}
                key={subcategory}
                className="rounded-full bg-white px-4 py-1 font-medium text-theme-green-main data-[active=true]:bg-theme-green-main data-[active=true]:text-white"
              >
                {subcategory}
              </button>
            );
          })}
      </div>

      <hr className="mb-4 border-gray-300" />

      {/* Products display */}
      {products && (
        <ProductsDisplay
          productsFromDb={products}
          currentCategory={currentCategory}
          currentSubcategory={currentSubcategory}
        />
      )}
    </div>
  );
};

export default CategoriesDisplay;

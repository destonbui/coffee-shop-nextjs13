import React from "react";

import CategoryItem from "../ui/category/CategoryItem";

import { Category } from "@prisma/client";

interface Props {
  categories: Category[];
}

const CategoriesNav = ({ categories }: Props) => {
  return (
    <section className="mt-2 flex h-[100px] items-center justify-start gap-1 overflow-x-scroll scroll-smooth pl-4 sm:justify-center md:gap-4 md:overflow-x-auto md:pl-0 lg:h-[150px] lg:gap-8">
      {categories.map((category, i) => {
        return (
          <CategoryItem
            key={i}
            blurUrl={category.image_blurUrl}
            src={category.image_url}
            title={category.name}
            link={"#"}
          />
        );
      })}
    </section>
  );
};

export default CategoriesNav;

import React from "react";

import coffeeCup from "@/public/coffee-cup.png";
import coffeeBean from "@/public/coffee-bean.png";
import teaBag from "@/public/tea-bag.png";
import bakery from "@/public/bakery.png";
import moonCake from "@/public/moon-cake.png";
import gift from "@/public/gift.png";

import CategoryItem from "../ui/category/CategoryItem";

import { CategoryItemProps } from "../ui/category/CategoryItem";

interface Props {}

const categories: CategoryItemProps[] = [
  { src: coffeeCup, title: "Thức uống", link: "products/drinks" },
  { src: coffeeBean, title: "Cà Phê", link: "products/coffee-beans" },
  { src: teaBag, title: "Trà", link: "products/tea" },
  { src: bakery, title: "Bakery", link: "products/bakery" },
  { src: moonCake, title: "Trung Thu", link: "products/moon-cake" },
  { src: gift, title: "Quà Tặng", link: "products/gifts" },
];

const CategoriesNav = (props: Props) => {
  return (
    <section className="h-[100px] lg:h-[150px] flex items-center justify-start sm:justify-center lg:gap-8 pl-2 mt-2 overflow-x-scroll md:overflow-auto scroll-smooth">
      {categories.map((category, i) => {
        return (
          <CategoryItem
            key={i}
            src={category.src}
            title={category.title}
            link={category.link}
          />
        );
      })}
    </section>
  );
};

export default CategoriesNav;

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
  { src: coffeeCup, title: "Thức Uống", link: "products/drinks" },
  { src: coffeeBean, title: "Cà Phê", link: "products/coffee-beans" },
  { src: teaBag, title: "Trà", link: "products/tea" },
  { src: bakery, title: "Bakery", link: "products/bakery" },
  { src: moonCake, title: "Trung Thu", link: "products/moon-cake" },
  { src: gift, title: "Quà Tặng", link: "products/gifts" },
];

const CategoriesNav = (props: Props) => {
  return (
    <section className="mt-2 flex h-[100px] items-center justify-start gap-1 overflow-x-scroll scroll-smooth pl-4 sm:justify-center md:gap-4 md:overflow-x-auto md:pl-0 lg:h-[150px] lg:gap-8">
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

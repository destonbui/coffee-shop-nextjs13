import React from "react";

import coffeeCup from "@/public/coffee-cup.png";
import coffeeBean from "@/public/coffee-bean.png";
import teaBag from "@/public/tea-bag.png";
import bakery from "@/public/bakery.png";
import moonCake from "@/public/moon-cake.png";
import gift from "@/public/gift.png";

import CategoryItem from "../ui/category/CategoryItem";

import { CategoryItemProps } from "../ui/category/CategoryItem";
import Link from "next/link";

interface Props {}

const categories: CategoryItemProps[] = [
  { src: coffeeCup, title: "Thức uống" },
  { src: coffeeBean, title: "Cà Phê" },
  { src: teaBag, title: "Trà" },
  { src: bakery, title: "Bakery" },
  { src: moonCake, title: "Trung Thu" },
  { src: gift, title: "Quà Tặng" },
];

const CategoriesNav = (props: Props) => {
  return (
    <section className="h-[100px] lg:h-[150px] flex items-center justify-start sm:justify-center lg:gap-4 mt-2 pl-1 lg:mt-8 overflow-x-scroll md:overflow-auto scroll-smooth">
      {categories.map((category, i) => {
        return (
          <Link key={i} href="#">
            <CategoryItem src={category.src} title={category.title} />
          </Link>
        );
      })}
    </section>
  );
};

export default CategoriesNav;

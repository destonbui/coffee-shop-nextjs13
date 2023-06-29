import React from "react";

import Image from "next/image";
import { Category } from "@prisma/client";

type Props = {
  categories: Category[];
};

const CategoriesTableDisplay = ({ categories }: Props) => {
  return (
    <div className="mb-4 flex w-full flex-nowrap overflow-x-auto rounded-md">
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Total products</th>
            <th>Subcategories</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, i) => {
            return (
              <tr key={category.id}>
                <td>
                  <Image
                    src={category.image_url}
                    alt={category.name}
                    width={100}
                    height={100}
                    className="h-[50px] w-auto"
                  />
                </td>
                <td>
                  <span>{category.name}</span>
                </td>
                <td>
                  <span>{category.products_total}</span>
                </td>
                <td>
                  <span>
                    {category.subcategories_names[0]
                      ? category.subcategories_names
                      : "[]"}
                  </span>
                </td>
                <td>
                  <span>{category.description}</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CategoriesTableDisplay;

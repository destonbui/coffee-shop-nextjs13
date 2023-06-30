import React from "react";

import Image from "next/image";
import { Category } from "@prisma/client";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";

type Props = {
  categories: Category[];
};

const CategoriesTableDisplay = ({ categories }: Props) => {
  return (
    <div className="mb-4 w-full overflow-x-auto rounded-md shadow-md">
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
                <td>
                  <button className="group relative rounded-full p-1 text-sm text-white">
                    <DotsHorizontalIcon className="h-5 w-5 text-gray-400 transition-all duration-150 ease-in-out group-hover:text-gray-700" />
                  </button>
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

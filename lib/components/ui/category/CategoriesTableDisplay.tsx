import React from "react";

import Image from "next/image";
import { Category } from "@prisma/client";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import CategoryEditMenu from "./CategoryEditMenu";

type Props = {
  categories: Category[];
};

const CategoriesTableDisplay = ({ categories }: Props) => {
  return (
    <div className="mb-4 w-full overflow-x-auto rounded-md shadow-md">
      <table>
        <thead>
          <tr>
            <th className="min-w-[80px]">Image</th>
            <th className="min-w-[200px]">Name</th>
            <th className="min-w-[200px]">Total products</th>
            <th className="min-w-[200px]">Subcategories</th>
            <th className="min-w-[400px] max-w-[500px]">Description</th>
            <th className="min-w-[80px]"></th>
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
                      ? `[${category.subcategories_names.join(",\n")}]`
                      : "Empty"}
                  </span>
                </td>
                <td>
                  <span>
                    {category.description
                      ? category.description
                      : "No description"}
                  </span>
                </td>
                <td>
                  <CategoryEditMenu category={category} />
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

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
            <th id="col-normal">Image</th>
            <th id="col-normal">Name</th>
            <th id="col-normal">Total products</th>
            <th id="col-normal">Subcategories</th>
            <th id="col-normal">Description</th>
            <th id="col-extra"></th>
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
                  <CategoryEditMenu />
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

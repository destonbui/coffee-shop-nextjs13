"use server";

import prisma from "@/lib/prisma";
import { getCategories } from "@/lib/prisma/categories";
import {
  ProductUpdateData,
  getProducts,
  getProductsByCategory,
  updateProduct,
} from "@/lib/prisma/products";

type AddProductData = {
  img_url: string;
  name: string;
  category_name: string;
  subcategory_name?: string;
  desc?: string;
  price: number;
  upsize_price: number;
  tags?: string[];
};

export async function actionAddProduct({
  img_url,
  name,
  category_name,
  subcategory_name,
  desc,
  price,
  upsize_price,
  tags,
}: AddProductData) {
  try {
    const product = await prisma.product.create({
      data: {
        image_url: img_url,
        name,
        category_name,
        price,
        upsize_price,
        ...(subcategory_name ? { subcategory_name } : {}),
        ...(desc ? { description: desc } : {}),
        ...(tags ? { tags } : {}),
      },
    });

    return { product };
  } catch (error) {
    return { error };
  }
}

export async function actionFetchCategories() {
  const { categories, error } = await getCategories();

  if (error) {
    throw new Error("Fetch categories failed");
  }
  return { categories };
}

export async function actionFetchSubcategories({
  category_name,
}: {
  category_name: string;
}) {
  try {
    const subcategories = await prisma.subcategory.findMany({
      where: {
        category_name: category_name,
      },
    });

    return { subcategories };
  } catch (error) {
    return { error };
  }
}

export async function actionFetchProductsByCategory({
  category_name,
}: {
  category_name: string;
}) {
  const { products, error } = await getProductsByCategory({ category_name });

  if (error) {
    throw new Error("Fetch products by category failed");
  }

  return { products };
}

export async function actionFetchProducts() {
  const { products, error } = await getProducts();

  if (error) {
    throw new Error("Fetch products failed");
  }

  return { products };
}

export async function actionUpdateProduct(data: ProductUpdateData, id: string) {
  const { product, error } = await updateProduct(data, id);

  if (error) {
    throw new Error("Update product failed");
  }

  return { product };
}

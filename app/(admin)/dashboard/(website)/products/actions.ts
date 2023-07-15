"use server";

import prisma from "@/lib/prisma";

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
  try {
    const categories = await prisma.category.findMany();

    return { categories };
  } catch (error) {
    return { error };
  }
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

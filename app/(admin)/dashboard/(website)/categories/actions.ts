"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

type addCategoryProps = {
  filePath: string;
  name: string;
};

export async function actionAddCategory({ filePath, name }: addCategoryProps) {
  try {
    const category = await prisma.category.create({
      data: {
        image_url: filePath,
        name: name,
      },
    });

    return { category };
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

export async function actionDeleteCategory({ id }: { id: string }) {
  try {
    const category = await prisma.category.delete({ where: { id: id } });

    return { category };
  } catch (error) {
    return { error };
  }
}

export async function actionUpdateCategoryInfo(
  data: {
    name?: string;
    imgUrl?: string;
    desc?: string;
  },
  id: string
) {
  try {
    const category = await prisma.category.update({
      where: {
        id: id,
      },
      data: {
        ...(data.name ? { name: data.name } : {}),
        ...(data.desc ? { description: data.desc } : {}),
        ...(data.imgUrl ? { image_url: data.imgUrl } : {}),
      },
    });

    return { category };
  } catch (error) {
    return { error };
  }
}

export async function actionAddSubcategory({
  name,
  categoryName,
}: {
  name: string;
  categoryName: string;
}) {
  try {
    const subcategory = await prisma.subcategory.create({
      data: {
        name: name,
        category_name: categoryName,
      },
    });

    return { subcategory };
  } catch (error) {
    return { error };
  }
}

export async function actionUpdateCategorySubcategory(
  { newSubcategoryNames }: { newSubcategoryNames: string[] },
  id: string
) {
  try {
    const category = await prisma.category.update({
      where: { id: id },
      data: {
        subcategories_names: newSubcategoryNames,
      },
    });

    return { category };
  } catch (error) {
    return { error };
  }
}

export async function actionDeleteSubcategory({
  subcategoryName,
}: {
  subcategoryName: string;
}) {
  try {
    const subcategory = await prisma.subcategory.delete({
      where: {
        name: subcategoryName,
      },
    });

    return { subcategory };
  } catch (error) {
    return { error };
  }
}

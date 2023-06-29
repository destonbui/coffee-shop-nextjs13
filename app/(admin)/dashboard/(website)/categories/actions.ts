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

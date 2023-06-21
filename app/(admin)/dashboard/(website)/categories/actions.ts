"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

type addCategoryProps = {
    filePath: string,
    name: string
}

export async function actionAddCategory() {

}
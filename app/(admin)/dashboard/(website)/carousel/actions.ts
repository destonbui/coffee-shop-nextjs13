"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

type addBannerProps = {
  filePath: string;
  desc: string;
  link?: string;
  position: number;
};

export async function actionAddBanner({
  filePath,
  desc,
  link,
  position,
}: addBannerProps) {
  try {
    const banner = await prisma.banner.create({
      data: {
        image_url: filePath,
        description: desc,
        position: position,
        ...(link ? { href: link } : {}),
      },
    });

    revalidatePath("/");
    return { banner };
  } catch (error) {
    return { error };
  }
}

export async function actionFetchBanner() {
  try {
    const banners = await prisma.banner.findMany({
      orderBy: {
        position: "asc",
      },
    });

    return { banners };
  } catch (error) {
    return { error };
  }
}

export async function actionToggleBannerActive(
  id: string,
  currentState: boolean
) {
  try {
    const updateBanner = await prisma.banner.update({
      where: {
        id: id,
      },
      data: {
        active: !currentState,
      },
    });

    revalidatePath("/");

    return { updateBanner };
  } catch (error) {
    return { error };
  }
}

export async function actionDeleteBanner(id: string) {
  try {
    const deleteBanner = await prisma.banner.delete({
      where: {
        id: id,
      },
    });

    revalidatePath("/");
    return { deleteBanner };
  } catch (error) {
    return { error };
  }
}

export async function actionUpdateBannerPosition(id: string, newPos: number) {
  try {
    const updateBanner = await prisma.banner.update({
      where: { id: id },
      data: {
        position: newPos,
      },
    });

    revalidatePath("/");
    return { updateBanner };
  } catch (error) {
    return { error };
  }
}

export async function actionUpdateBannerDetail(
  id: string,
  field: "description" | "link",
  newVal: string
) {
  try {
    const updateBanner = await prisma.banner.update({
      where: {
        id: id,
      },
      data: {
        ...(field === "description"
          ? { description: newVal }
          : { href: newVal }),
      },
    });

    revalidatePath("/");
    return { updateBanner };
  } catch (error) {
    return { error };
  }
}

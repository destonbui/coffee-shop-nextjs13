"use server";

import prisma from "@/lib/prisma";

export async function actionAddOptionReference({ name }: { name: string }) {
  try {
    const reference = await prisma.option.create({
      data: {
        name: name,
      },
    });

    return { reference };
  } catch (error) {
    return { error };
  }
}

export async function actionAddOptionTopping({
  name,
  price,
}: {
  name: string;
  price: number;
}) {
  try {
    const topping = await prisma.topping.create({
      data: {
        name: name,
        price: price,
      },
    });

    return { topping };
  } catch (error) {
    return { error };
  }
}

export async function actionFetchReferences() {
  try {
    const references = await prisma.option.findMany();

    return { references };
  } catch (error) {
    return { error };
  }
}

export async function actionFetchToppings() {
  try {
    const toppings = await prisma.option.findMany();

    return { toppings };
  } catch (error) {
    return { error };
  }
}

"use server";

import prisma from "@/lib/prisma";
import { OptionValue } from "@prisma/client";

export async function actionAddOptionPreference({ name }: { name: string }) {
  try {
    const preference = await prisma.option.create({
      data: {
        name: name,
      },
    });

    return { preference };
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

export async function actionFetchPreferences() {
  try {
    const preferences = await prisma.option.findMany();

    return { preferences };
  } catch (error) {
    return { error };
  }
}

export async function actionFetchToppings() {
  try {
    const toppings = await prisma.topping.findMany();

    return { toppings };
  } catch (error) {
    return { error };
  }
}

export async function actionUpdatePreferenceValue(
  {
    newVal,
  }: {
    newVal: "NONE" | "LESS" | "NORMAL" | "MORE";
  },
  id: string
) {
  try {
    const preference = await prisma.option.update({
      where: { id: id },
      data: {
        value: newVal,
      },
    });

    return { preference };
  } catch (error) {
    return { error };
  }
}

export async function actionDeletePreference({ id }: { id: string }) {
  try {
    const preference = await prisma.option.delete({ where: { id: id } });

    return { preference };
  } catch (error) {
    return { error };
  }
}

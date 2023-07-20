import prisma from "./index";

export async function getToppings() {
  try {
    const toppings = await prisma.topping.findMany();

    return { toppings };
  } catch (error) {
    return { error };
  }
}

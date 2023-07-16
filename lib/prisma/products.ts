import prisma from "./index";

export async function getProducts() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { price: "asc" },
      include: { options: true, toppings: true },
    });

    return { products };
  } catch (error) {
    return { error };
  }
}

export async function getProductsByCategory({
  category_name,
}: {
  category_name: string;
}) {
  try {
    const products = await prisma.product.findMany({
      where: { category_name },
      orderBy: { price: "asc" },
      include: { options: true, toppings: true },
    });

    return { products };
  } catch (error) {
    return { error };
  }
}

import prisma from "./index";

export async function getCategories() {
  try {
    const categories = await prisma.category.findMany();
    return { categories };
  } catch (error) {
    return { error };
  }
}

import prisma from "./index";

export async function getOptions() {
  try {
    const options = await prisma.option.findMany();

    return { options };
  } catch (error) {
    return { error };
  }
}

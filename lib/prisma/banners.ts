import prisma from "./index";

export async function getBanners() {
  try {
    const banners = await prisma.banner.findMany({
      orderBy: {
        position: "asc",
      },
      where: {
        active: true,
      },
    });
    return { banners };
  } catch (error) {
    return { error };
  }
}

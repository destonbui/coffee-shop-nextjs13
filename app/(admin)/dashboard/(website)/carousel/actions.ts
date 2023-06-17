"use server";

import prisma from "@/lib/prisma";

type addBannerProps = {
  filePath: string;
  desc: string;
  link?: string;
};

export async function addBanner({ filePath, desc, link }: addBannerProps) {
  const banner = await prisma.banner.create({
    data: {
      image_url: filePath,
      description: desc,
      ...(link ? { href: link } : {}),
    },
  });

  return JSON.stringify(banner);
}

export async function fetchBanner() {
  const banners = await prisma.banner.findMany();

  return banners;
}

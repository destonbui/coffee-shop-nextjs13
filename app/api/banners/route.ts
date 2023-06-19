import { NextRequest, NextResponse } from "next/server";
import { getBanners } from "@/lib/prisma/banners";

export async function GET() {
  const { banners, error } = await getBanners();

  if (error) {
    throw new Error("Fetch data from db failed");
  }

  return NextResponse.json(banners);
}

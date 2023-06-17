import { NextRequest, NextResponse } from "next/server";
import { getBanners } from "@/lib/prisma/banners";

import { revalidateTag } from "next/cache";

export async function GET(request: NextRequest) {
  const tag = request.nextUrl.searchParams.get("tag");

  if (tag) {
    revalidateTag(tag);
    return NextResponse.json({ revalidated: true, now: Date.now() });
  }

  const { banners, error } = await getBanners();

  if (error) {
    throw new Error("Fetch data from db failed");
  }

  return NextResponse.json(banners);
}

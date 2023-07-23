import { NextResponse } from "next/server";

import { getProductsFromApi } from "@/lib/prisma/products";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const featured = searchParams.get("featured");
  const limit = searchParams.get("limit");
  const category = searchParams.get("category");
  const subcategory = searchParams.get("subcategory");

  const { products, error } = await getProductsFromApi({
    ...(featured && { featured: Boolean(featured) }),
    ...(Boolean(Number(limit)) && { limit: Number(limit) }),
    ...(category && { category }),
    ...(subcategory && { subcategory }),
  });

  if (!products && error) {
    throw new Error("Fetch products failed");
  }

  return NextResponse.json(products);
}

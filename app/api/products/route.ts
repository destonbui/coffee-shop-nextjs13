import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const featured = searchParams.get("featured");
  const limit = searchParams.get("limit");
  const category = searchParams.get("category");
  const subcategory = searchParams.get("subcategory");

  type GetFeaturedProductsProps = {
    featured?: boolean;
    limit?: number;
    category?: string;
    subcategory?: string;
  };
  async function getFeatured({
    featured,
    limit,
    category,
    subcategory,
  }: GetFeaturedProductsProps) {
    try {
      const products = await prisma.product.findMany({
        where: {
          ...(featured && { tags: { has: "FEATURED" } }),
          ...(category && { category_name: category }),
          ...(subcategory && { subcategory_name: subcategory }),
        },
        ...(limit && { take: Number(limit) }),
      });

      return { products };
    } catch (error) {
      return { error };
    }
  }

  const { products, error } = await getFeatured({
    ...(featured && { featured: Boolean(featured) }),
    ...(Boolean(Number(limit)) && { limit: Number(limit) }),
    ...(category && { category }),
    ...(subcategory && { subcategory }),
  });

  if (!products && error) {
    return NextResponse.error();
  }

  return NextResponse.json(products);
}

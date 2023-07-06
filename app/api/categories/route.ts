import { getCategories } from "@/lib/prisma/categories";
import { NextResponse } from "next/server";

export async function GET() {
  const { categories, error } = await getCategories();

  if (error) {
    throw new Error("Fetch categories failed");
  }

  return NextResponse.json(categories);
}

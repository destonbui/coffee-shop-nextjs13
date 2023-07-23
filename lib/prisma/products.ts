import prisma from "./index";

export async function getProducts() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { price: "asc" },
      include: {
        options: { include: { option: true } },
        toppings: { include: { topping: true } },
      },
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
      include: {
        options: { include: { option: true } },
        toppings: { include: { topping: true } },
      },
    });

    return { products };
  } catch (error) {
    return { error };
  }
}

export type ProductUpdateData = {
  name?: string;
  category?: string;
  subcategory?: string;
  desc?: string;
  price?: number;
  upsize_price?: number;
  tags?: string[];
};

/**
 * Prisma function that update the target {id} with the new {data}.
 * @param data new data of the product you want to update
 * @param id the product's id @
 */
export async function updateProduct(data: ProductUpdateData, id: string) {
  try {
    const product = await prisma.product.update({
      where: { id },
      data: {
        ...(data.name && { name: data.name }),
        ...(data.category && { category_name: data.category }),
        ...(data.subcategory && { subcategory_name: data.subcategory }),
        ...(data.desc && { description: data.desc }),
        ...(data.price && { price: data.price }),
        ...(data.upsize_price && { upsize_price: data.upsize_price }),
        ...(data.tags && { tags: data.tags }),
      },
    });

    return { product };
  } catch (error) {
    return { error };
  }
}

export type ConnectPreferencesProps = {
  productId: string;
  preferenceIds: string[];
};
export async function connectPreferences({
  productId,
  preferenceIds,
}: ConnectPreferencesProps) {
  try {
    const product = await prisma.product.update({
      where: { id: productId },
      data: {
        options: {
          createMany: {
            data: preferenceIds.map((id) => {
              return { optionId: id };
            }),
          },
        },
      },
    });

    return { product };
  } catch (error) {
    return { error };
  }
}

export type ConnectToppingsProps = {
  productId: string;
  toppingIds: string[];
};
export async function connectToppings({
  productId,
  toppingIds,
}: ConnectToppingsProps) {
  try {
    const product = await prisma.product.update({
      where: { id: productId },
      data: {
        toppings: {
          createMany: {
            data: toppingIds.map((id) => {
              return { toppingId: id };
            }),
          },
        },
      },
    });

    return { product };
  } catch (error) {
    return { error };
  }
}

export async function deleteProduct({ productId }: { productId: string }) {
  try {
    const product = await prisma.product.delete({ where: { id: productId } });

    return { product };
  } catch (error) {
    return { error };
  }
}

type GetProductsProps = {
  featured?: boolean;
  limit?: number;
  category?: string;
  subcategory?: string;
};
export async function getProductsFromApi({
  featured,
  limit,
  category,
  subcategory,
}: GetProductsProps) {
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

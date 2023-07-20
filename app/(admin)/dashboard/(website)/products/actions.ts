"use server";

import prisma from "@/lib/prisma";
import { getCategories } from "@/lib/prisma/categories";
import { getOptions } from "@/lib/prisma/options";
import {
  ConnectPreferencesProps,
  ConnectToppingsProps,
  ProductUpdateData,
  connectPreferences,
  connectToppings,
  deleteProduct,
  getProducts,
  getProductsByCategory,
  updateProduct,
} from "@/lib/prisma/products";
import { getToppings } from "@/lib/prisma/toppings";

type AddProductData = {
  img_url: string;
  name: string;
  category_name: string;
  subcategory_name?: string;
  desc?: string;
  price: number;
  upsize_price: number;
  tags?: string[];
};

export async function actionAddProduct({
  img_url,
  name,
  category_name,
  subcategory_name,
  desc,
  price,
  upsize_price,
  tags,
}: AddProductData) {
  try {
    const product = await prisma.product.create({
      data: {
        image_url: img_url,
        name,
        category_name,
        price,
        ...(upsize_price !== 0 ? { upsize_price: upsize_price } : {}),
        ...(subcategory_name ? { subcategory_name } : {}),
        ...(desc ? { description: desc } : {}),
        ...(tags ? { tags } : {}),
      },
    });

    return { product };
  } catch (error) {
    return { error };
  }
}

export async function actionFetchCategories() {
  const { categories, error } = await getCategories();

  if (error) {
    throw new Error("Fetch categories failed");
  }
  return { categories };
}

export async function actionFetchSubcategories({
  category_name,
}: {
  category_name: string;
}) {
  try {
    const subcategories = await prisma.subcategory.findMany({
      where: {
        category_name: category_name,
      },
    });

    return { subcategories };
  } catch (error) {
    return { error };
  }
}

export async function actionFetchProductsByCategory({
  category_name,
}: {
  category_name: string;
}) {
  const { products, error } = await getProductsByCategory({ category_name });

  if (error) {
    throw new Error("Fetch products by category failed");
  }

  return { products };
}

export async function actionFetchProducts() {
  const { products, error } = await getProducts();

  if (error) {
    throw new Error("Fetch products failed");
  }

  return { products };
}

export async function actionUpdateProduct(data: ProductUpdateData, id: string) {
  const { product, error } = await updateProduct(data, id);

  if (error) {
    throw new Error("Update product failed");
  }

  return { product };
}

export async function actionConnectPreferences({
  productId,
  preferenceIds,
}: ConnectPreferencesProps) {
  const { product, error } = await connectPreferences({
    productId,
    preferenceIds,
  });

  if (error) {
    console.log(error);
    throw new Error("Connect preferences failed");
  }

  return { product };
}

export async function actionConnectToppings({
  productId,
  toppingIds,
}: ConnectToppingsProps) {
  const { product, error } = await connectToppings({ productId, toppingIds });

  if (error) {
    throw new Error("Connect toppings failed");
  }

  return { product };
}

export async function actionFetchToppings() {
  const { toppings, error } = await getToppings();

  if (error) {
    throw new Error("Fetch toppings failed");
  }

  return { toppings };
}

export async function actionFetchPreferences() {
  const { options: preferences, error } = await getOptions();

  if (error) {
    throw new Error("Fetch options failed");
  }

  return { preferences };
}

type DeleteToppingProps = {
  productId: string;
  toppingRefId: string;
};

export async function actionDeleteTopping({
  productId,
  toppingRefId,
}: DeleteToppingProps) {
  async function deleteTopping({
    productId,
    toppingRefId,
  }: DeleteToppingProps) {
    try {
      const topping = await prisma.product.update({
        where: { id: productId },
        data: {
          toppings: { delete: { id: toppingRefId } },
        },
      });

      return { topping };
    } catch (error) {
      return { error };
    }
  }

  const { topping, error } = await deleteTopping({ toppingRefId, productId });

  if (error) {
    throw new Error("Delete topping failed");
  }

  return { topping };
}

type DeletePreferenceProps = {
  productId: string;
  preferenceRefId: string;
};

export async function actionDeletePreference({
  productId,
  preferenceRefId,
}: DeletePreferenceProps) {
  async function deleteTopping({
    productId,
    preferenceRefId,
  }: DeletePreferenceProps) {
    try {
      const preference = await prisma.product.update({
        where: { id: productId },
        data: {
          options: { delete: { id: preferenceRefId } },
        },
      });

      return { preference };
    } catch (error) {
      return { error };
    }
  }

  const { preference, error } = await deleteTopping({
    preferenceRefId,
    productId,
  });

  if (error) {
    throw new Error("Delete topping failed");
  }

  return { preference };
}

export async function actionDeleteProduct({
  productId,
}: {
  productId: string;
}) {
  const { product, error } = await deleteProduct({ productId });

  if (error) {
    throw new Error("Delete product failed");
  }

  return { product };
}

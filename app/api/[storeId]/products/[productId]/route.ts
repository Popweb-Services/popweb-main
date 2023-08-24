import { NextResponse } from "next/server"
import { z } from "zod"

import prismadb from "@/lib/prismadb"
import { getAuthSession } from "@/lib/session"
import {
  createCategoryFormSchema,
  createProductFormSchema,
  shippingRateFormSchema,
} from "@/lib/validators/store-validators"

interface IParams {
  params: {
    storeId: string
    productId: string
  }
}

export async function PATCH(request: Request, { params }: IParams) {
  try {
    const session = await getAuthSession()
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }
    const userStore = await prismadb.store.findUnique({
      where: {
        id: params.storeId,
        userId: session.user.id,
      },
    })
    if (!userStore) {
      return new NextResponse("Forbbiden", { status: 403 })
    }
    const body = await request.json()
    const {
      name,
      price,
      description,
      imageUrls,
      mainImageUrl,
      options,
      quantity,
      variants,
      category,
      costAtPrice,
      priceAfterDiscount,
      unit,
    } = createProductFormSchema.parse(body)
    await prismadb.productOption.deleteMany({
      where: {
        id: params.productId,
      },
    })
    await prismadb.variant.deleteMany({
      where: {
        id: params.productId,
      },
    })
    await prismadb.product.delete({
      where: {
        id: params.productId,
      },
    })
    const product = await prismadb.product.create({
      data: {
        storeId: params.storeId,
        name,
        description,
        mainImageUrl,
        images: imageUrls && {
          createMany: { data: imageUrls.map((url) => ({ imageUrl: url })) },
        },
        categoryId: category,
        quantity,
        price,
        priceAfterDiscount,
        costAtPrice,
        unit,
        options: options && {
          createMany: {
            data: options.map((option) => ({
              name: option.name,
              values: option.values.map((value) => value.value),
            })),
          },
        },
      },
    })
    if (variants.length !== 0) {
      await prismadb.variant.updateMany({
        where: {
          productId: params.productId,
        },
        data: variants?.map((variant) => ({
          productId: product.id,
          options: variant.options,
          price: variant.price,
          quantity: variant.quantity,
        })),
      })
    }
    return new NextResponse("Product Updated", { status: 200 })
  } catch (error) {
    console.log("[PRODUCT_PATCH]", error)
    if (error instanceof z.ZodError) {
      return new NextResponse(error.message, { status: 422 })
    }
    return new NextResponse("Internal server error", { status: 500 })
  }
}

export async function DELETE(_request: Request, { params }: IParams) {
  try {
    const session = await getAuthSession()
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }
    const userStore = await prismadb.store.findUnique({
      where: {
        id: params.storeId,
        userId: session.user.id,
      },
    })
    if (!userStore) {
      return new NextResponse("Forbbiden", { status: 403 })
    }
    await prismadb.product.delete({
      where: {
        id: params.productId,
      },
    })
    return new NextResponse("Product deleted", { status: 200 })
  } catch (error) {
    console.log("[PRODUCT_DELETE]", error)
    return new NextResponse("Internal sever error", { status: 500 })
  }
}

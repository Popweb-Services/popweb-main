import { NextResponse } from "next/server"
import { z } from "zod"

import prismadb from "@/lib/prismadb"
import { getAuthSession } from "@/lib/session"
import { createProductFormSchema } from "@/lib/validators/store-validators"

interface IParams {
  params: {
    storeId: string
  }
}

export async function POST(request: Request, { params }: IParams) {
  try {
    const session = await getAuthSession()
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }
    const userStore = await prisma?.store.findUnique({
      where: { id: params.storeId, userId: session.user.id },
    })
    if (!userStore) {
      return new NextResponse("Forbidden", { status: 403 })
    }
    const body = await request.json()
    const {
      name,
      description,
      price,
      imageUrls,
      mainImageUrl,
      options,
      quantity,
      category,
      costAtPrice,
      priceAfterDiscount,
      unit,
      variants,
    } = createProductFormSchema.parse(body)

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
      const newVariants = await prismadb.variant.createMany({
        data: variants?.map((variant) => ({
          productId: product.id,
          options: variant.options,
          price: variant.price,
          quantity: variant.quantity,
        })),
      })
    }
    return new NextResponse("product created", { status: 200 })
  } catch (error) {
    console.log("PRODUCTS_POST]", error)
    if (error instanceof z.ZodError) {
      return new NextResponse("Invaldi request data passed", { status: 422 })
    }
    return new NextResponse("Internal Server error", { status: 500 })
  }
}

export async function GET(_request: Request, { params }: IParams) {
  try {
    const shippingRates = await prismadb.shippingRate.findMany({
      where: {
        storeId: params.storeId,
      },
    })
    return NextResponse.json(shippingRates, { status: 200 })
  } catch (error) {
    console.log("[SHIPPINH_RATES_GET]", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

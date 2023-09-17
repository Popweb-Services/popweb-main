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
      isFeatured,
      variants,
      features,
    } = createProductFormSchema.parse(body)
    console.log(body)
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
        isDiscounted: priceAfterDiscount ? true : false,
        isFeatured,
        unit,
      },
    })
    if (options.length !== 0) {
      await prismadb.productOption.createMany({
        data: options.map((option) => ({
          storeId: params.storeId,
          name: option.name,
          values: option.values.map((value) => value.value),
        })),
      })
    }
    if (features && features?.length !== 0) {
      await prismadb.productFeature.createMany({
        data: features?.map((feature) => ({
          name: feature.name,
          value: feature.value,
          productId: product.id,
        })),
      })
    }
    if (variants.length !== 0) {
      await prismadb.variant.createMany({
        data: variants?.map((variant) => ({
          storeId: params.storeId,
          productId: product.id,
          options: variant.options,
          price: variant.price,
          priceAfterDiscount: variant.priceAfterDiscount,
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

export async function GET(request: Request, { params }: IParams) {
  try {
    const { searchParams } = new URL(request.url)
    const categoryId = searchParams.get("categoryId")
    const isDiscounted = searchParams.get("isDiscounted")
    const isFeatured = searchParams.get("isFeatured")

    if (!params.storeId) {
      return new NextResponse("invalid store id", { status: 400 })
    }
    const products = await prismadb.product.findMany({
      where: {
        storeId: params.storeId,
        isFeatured: isFeatured === "true" ? true : false,
        isDiscounted: isDiscounted === "true" ? true : false,
        isArchived: false,
      },
    })

    return NextResponse.json(products, { status: 200 })
  } catch (error) {
    console.log("[PRODUCTS_GET]", error)
  }
}

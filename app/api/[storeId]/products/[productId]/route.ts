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
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders })
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
      isFeatured,
      unit,
      features,
    } = createProductFormSchema.parse(body)
    const product = await prismadb.product.update({
      where: {
        id: params.productId,
      },
      data: {
        name,
        price,
        description,
        mainImageUrl,
        categoryId: category,
        costAtPrice,
        isFeatured,
        unit,
        priceAfterDiscount,
        quantity,
      },
    })
    //  delete product images
    await prismadb.image.deleteMany({
      where: {
        productId: params.productId,
      },
    })
    // create new images
    await prismadb.image.createMany({
      data: imageUrls.map((url) => ({
        productId: params.productId,
        imageUrl: url,
      })),
    })
    if (options.length !== 0) {
      // delete options
      await prismadb.productOption.deleteMany({
        where: {
          productId: params.productId,
        },
      })
      // create new options
      await prismadb.productOption.createMany({
        data: options.map((option) => ({
          name: option.name,
          values: option.values.map((value) => value.value),
          productId: params.productId,
          storeId: params.storeId,
        })),
      })
    }
    if (features && features.length !== 0) {
      // delete features
      await prismadb.productFeature.deleteMany({
        where: {
          productId: params.productId,
        },
      })
      // create new features
      await prismadb.productFeature.createMany({
        data: features.map((feature) => ({
          name: feature.name,
          value: feature.value,
          productId: params.productId,
        })),
      })
    }
    if (variants.length !== 0) {
      // delete variants
      await prismadb.variant.deleteMany({
        where: {
          productId: params.productId,
        },
      })
      // create new variants for product
      await prismadb.variant.createMany({
        data: variants.map((variant) => ({
          quantity: variant.quantity,
          options: variant.options,
          price: variant.price,
          priceAfterDiscount: variant.priceAfterDiscount,
          storeId: params.storeId,
          productId: params.productId,
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

export async function GET(request: Request, { params }: IParams) {
  try {
    const product = await prismadb.product.findUnique({
      where: {
        storeId: params.storeId,
        id: params.productId,
      },
      include: {
        variants: true,
        options: true,
        images: true,
        category: true,
        features: true,
      },
    })
    return NextResponse.json(product, { status: 200, headers: corsHeaders })
  } catch (error) {
    console.log("[PRODUCT_GET]", error)
    return new NextResponse("Internal server error", {
      status: 500,
      headers: corsHeaders,
    })
  }
}

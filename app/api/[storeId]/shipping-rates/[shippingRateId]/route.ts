import { NextResponse } from "next/server"
import { z } from "zod"

import prismadb from "@/lib/prismadb"
import { getAuthSession } from "@/lib/session"
import {
  createCategoryFormSchema,
  shippingRateFormSchema,
} from "@/lib/validators/store-validators"

interface IParams {
  params: {
    storeId: string
    shippingRateId: string
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
    const { name, price, description, minPrice } =
      shippingRateFormSchema.parse(body)
    await prismadb.shippingRate.update({
      where: { id: params.shippingRateId },
      data: {
        name,
        description,
        price,
        minPrice,
      },
    })
    return new NextResponse("Shipping rate Updated", { status: 200 })
  } catch (error) {
    console.log(error)
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
    await prismadb.shippingRate.delete({
      where: {
        id: params.shippingRateId,
      },
    })
    return new NextResponse("Shipping rate deleted", { status: 200 })
  } catch (error) {
    console.log(error)
    return new NextResponse("Internal sever error", { status: 500 })
  }
}

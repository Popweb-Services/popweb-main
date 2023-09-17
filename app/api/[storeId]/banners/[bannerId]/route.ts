import { NextResponse } from "next/server"
import { z } from "zod"

import prismadb from "@/lib/prismadb"
import { getAuthSession } from "@/lib/session"
import {
  createBannerFormSchema,
  createCategoryFormSchema,
  shippingRateFormSchema,
} from "@/lib/validators/store-validators"

interface IParams {
  params: {
    storeId: string
    bannerId: string
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
    const { name, imageUrl } = createBannerFormSchema.parse(body)
    await prismadb.banner.update({
      where: { id: params.bannerId },
      data: {
        name,
        imageUrl,
      },
    })
    return new NextResponse("Banner Updated", { status: 200 })
  } catch (error) {
    console.log("[BANNER_PATCH]", error)
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
    await prismadb.banner.delete({
      where: {
        id: params.bannerId,
      },
    })
    return new NextResponse("Shipping rate deleted", { status: 200 })
  } catch (error) {
    console.log(error)
    return new NextResponse("Internal sever error", { status: 500 })
  }
}

export async function GET(request: Request, { params }: IParams) {
  try {
    if (params.bannerId === "null") {
      return NextResponse.json(null, { status: 200 })
    }
    const banner = await prismadb.banner.findUnique({
      where: {
        storeId: params.storeId,
        id: params.bannerId,
      },
    })
    return NextResponse.json(banner)
  } catch (error) {
    console.log("[BANNER_GET]", error)
  }
}

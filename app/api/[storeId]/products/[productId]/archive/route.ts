import { NextResponse } from "next/server"

import prismadb from "@/lib/prismadb"
import { getAuthSession } from "@/lib/session"

interface IParams {
  params: {
    storeId: string
    productId: string
  }
}

export async function PATCH(_request: Request, { params }: IParams) {
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

    const product = await prismadb.product.findUnique({
      where: {
        id: params.productId,
      },
    })
    if (!product) {
      return new NextResponse("Invalid product ID", { status: 400 })
    }
    await prismadb.product.update({
      where: {
        id: params.productId,
      },
      data: {
        isArchived: !product?.isArchived,
      },
    })
    return new NextResponse("Product Archived", { status: 200 })
  } catch (error) {
    console.log('[PRODUCT_ARCHIVE_PATHC]',error)
    return new NextResponse("Internal server error", { status: 500 })
  }
}

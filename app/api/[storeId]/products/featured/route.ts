import { NextResponse } from "next/server"

import prismadb from "@/lib/prismadb"

interface IParams {
  params: {
    storeId: string
  }
}

export async function GET(
  request: Request,
  { params }: IParams
): Promise<NextResponse> {
  try {
    if (!params.storeId) {
      return new NextResponse("invalid store id", { status: 400 })
    }
    const products = await prismadb.product.findMany({
      where: {
        storeId: params.storeId,
        isFeatured: true,
      },
      include: {
        variants: true,
      },
    })

    return NextResponse.json(products, { status: 200 })
  } catch (error) {
    console.log("[PRODUCTS_GET]", error)
    return new NextResponse("internal server error", { status: 500 })
  }
}

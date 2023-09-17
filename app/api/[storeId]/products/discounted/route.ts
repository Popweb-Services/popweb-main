import { NextResponse } from "next/server"

import prismadb from "@/lib/prismadb"

export async function GET(_request: Request) {
  try {
    const products = await prismadb.product.findMany({
      where: {
        isDiscounted: true,
        isArchived: false,
      },
      include: {
        variants: true,
      },
    })
    return NextResponse.json(products, { status: 200 })
  } catch (error) {
    console.log("[DISCOUNTED_GET]", error)
    return new NextResponse("Internal server error", { status: 500 })
  }
}

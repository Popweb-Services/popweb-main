import { NextResponse } from "next/server"

import prismadb from "@/lib/prismadb"

export async function GET(
  request: Request,
  { params }: { params: { variantId: string } }
) {
  try {
    const variant = await prismadb.variant.findUnique({
      where: {
        id: params.variantId,
      },
    })
    return NextResponse.json(variant, { status: 200 })
  } catch (error) {
    console.log("[VARIANT_GET]", error)
    return new NextResponse("internal server error", { status: 500 })
  }
}

import { NextResponse } from "next/server"

import prismadb from "@/lib/prismadb"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST,PATCH, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders })
}
export async function GET(_request: Request): Promise<NextResponse> {
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
    return NextResponse.json(products, { status: 200, headers: corsHeaders })
  } catch (error) {
    console.log("[DISCOUNTED_GET]", error)
    return new NextResponse("Internal server error", {
      status: 500,
      headers: corsHeaders,
    })
  }
}

import { NextResponse } from "next/server"

import prismadb from "@/lib/prismadb"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders })
}
export async function GET(
  request: Request,
  { params }: { params: { storeId: string } }
): Promise<NextResponse> {
  try {
    const url = new URL(request.url)
    const queryParam = url.searchParams.get("query")
    if (!queryParam) {
      return new NextResponse("Invalid query", { status: 400 })
    }
    const allProducts = await prismadb.product.findMany({
      where: {
        storeId: params.storeId,
      },
      include: {
        category: true,
      },
    })
    const filteredProducts = allProducts.filter(
      (product) =>
        product.name.includes(queryParam) ||
        product.category?.name.includes(queryParam)
    )
    const allCategories = await prismadb.category.findMany({
      where: { storeId: params.storeId },
    })
    const filteredCategories = allCategories.filter((category) =>
      category.name.includes(queryParam)
    )
    const results = {
      products: filteredProducts,
      categories: filteredCategories,
    }
    return NextResponse.json(results, { status: 200, headers: corsHeaders })
  } catch (error) {
    console.log("[SEARCH_GET]", error)
    return new NextResponse("internal server error", { status: 500 })
  }
}

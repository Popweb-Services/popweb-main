import { NextResponse } from "next/server"
import { Category, Product, Variant } from "@prisma/client"

import prismadb from "@/lib/prismadb"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST,PATCH, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders })
}

type ProductType = Product & {
  variants: Variant[]
}

export async function GET(
  request: Request,
  { params }: { params: { storeId: string; categoryId: string } }
): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url)
    console.log(searchParams.get("discounted"))
    console.log(searchParams.get("available"))
    const category = await prismadb.category.findUnique({
      where: {
        id: params.categoryId,
      },
      include: {
        products: {
          include: {
            variants: true,
          },
        },
        subcategories: {
          include: {
            products: {
              include: {
                variants: true,
              },
            },
            subcategories: {
              include: {
                products: {
                  include: {
                    variants: true,
                  },
                },
                subcategories: true,
              },
            },
          },
        },
      },
    })
    let products: ProductType[] = []
    category?.products.map((product) => products.push(product))
    category?.subcategories.map((subCategory) => {
      subCategory.products.map((product) => products.push(product))
      subCategory.subcategories.map((subSubCategory) =>
        subSubCategory.products.map((product) => products.push(product))
      )
    })
    console.log(searchParams.get("cheapest"))
    if (searchParams.get("cheapest") === "true") {
      products = products.sort((a, b) => {
        if (a.priceAfterDiscount && b.priceAfterDiscount) {
          return a.priceAfterDiscount - b.priceAfterDiscount
        } else if (a.price && b.priceAfterDiscount) {
          return a.price - b.priceAfterDiscount
        } else if (a.price && b.price) {
          return a.price - b.price
        } else if (a.priceAfterDiscount && b.price) {
          return a.priceAfterDiscount - b.price
        }
        return a.price - b.price
      })
    }
    if (searchParams.get("available") === "true") {
      products = products.filter((product) => {
        if (product.variants.length > 0) {
          const variantsCount = product.variants.reduce((total, variant) => {
            return total + variant.quantity
          }, 0)
          if (variantsCount > 0) {
            return true
          } else {
            return false
          }
        } else {
          if (product.quantity > 0) {
            return true
          } else {
            return false
          }
        }
      })
    }
    if (searchParams.get("discounted") === "true") {
      products = products.filter(
        (product) =>
          product.priceAfterDiscount &&
          product.priceAfterDiscount > 0 &&
          product.priceAfterDiscount < product.price
      )
    }
    console.log(products)
    return NextResponse.json(products, { status: 200, headers: corsHeaders })
  } catch (error) {
    console.log("[PRODUCTS_CATEGORY]", error)
    return new NextResponse("Internal server error", {
      status: 500,
      headers: corsHeaders,
    })
  }
}

import { cookies, headers } from "next/headers"
import { NextResponse } from "next/server"
import { z } from "zod"

import prismadb from "@/lib/prismadb"
import { addToCartValidator } from "@/lib/validators/cart-validators"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,PATCH ,POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders })
}
export async function POST(
  request: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const body = await request.json()
    const { productId, variantId, customerId, deviceId } =
      addToCartValidator.parse(body)

    if (!deviceId && !customerId) {
      return new NextResponse("invalid request data passed", {
        status: 400,
        headers: corsHeaders,
      })
    }
    await prismadb.cartItem.create({
      data: {
        quantity: 1,
        productId,
        variantId,
        deviceId,
        customerId,
        storeId: params.storeId,
      },
    })
    return new NextResponse("item added to cart", {
      status: 200,
      headers: corsHeaders,
    })
  } catch (error) {
    console.log("[CART_POST]", error)
    if (error instanceof z.ZodError) {
      return new NextResponse(error.message, {
        status: 422,
        headers: corsHeaders,
      })
    }
    return new NextResponse("internal server error", {
      status: 500,
      headers: corsHeaders,
    })
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const deviceId = searchParams.get("deviceId")
    const customerId = searchParams.get("customerId")
    if (deviceId && !customerId) {
      const cartItems = await prismadb.cartItem.findMany({
        where: {
          deviceId,
        },
        include: {
          product: {
            include: {
              options: true,
              variants: true,
            },
          },
          variant: true,
        },
      })
      return NextResponse.json(cartItems, { status: 200, headers: corsHeaders })
    }
    if (customerId && !deviceId) {
      const cartItems = await prismadb.cartItem.findMany({
        where: {
          customerId,
        },
        include: {
          product: {
            include: {
              options: true,
              variants: true,
            },
          },
          variant: true,
        },
      })
      return NextResponse.json(cartItems, { status: 200, headers: corsHeaders })
    }
    return new NextResponse("invalid data passed", {
      status: 400,
      headers: corsHeaders,
    })
  } catch (error) {
    console.log("[CART_ITEMS_GET]", error)
    return new NextResponse("internal server error", {
      status: 500,
      headers: corsHeaders,
    })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const deviceId = searchParams.get("deviceId")
    const customerId = searchParams.get("customerId")
    if (deviceId && !customerId) {
      await prismadb.cartItem.deleteMany({
        where: {
          deviceId,
        },
      })
      return new NextResponse("cart items deleted", {
        status: 200,
        headers: corsHeaders,
      })
    } else if (customerId && !deviceId) {
      await prismadb.cartItem.deleteMany({
        where: {
          customerId,
        },
      })
      return new NextResponse("cart items deleted", {
        status: 200,
        headers: corsHeaders,
      })
    }
    return new NextResponse("invalid request data passed", {
      status: 400,
      headers: corsHeaders,
    })
  } catch (error) {
    console.log("[CART_ITEMS_DELETE]", error)
    return new NextResponse("internal server error", {
      status: 500,
      headers: corsHeaders,
    })
  }
}

export async function PATCH(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const deviceId = searchParams.get("deviceId")
    const customerId = searchParams.get("customerId")
    if (!customerId || !deviceId) {
      return new NextResponse("invalid request data passed", {
        status: 400,
        headers: corsHeaders,
      })
    }
    await prismadb.cartItem.updateMany({
      where: {
        deviceId,
      },
      data: {
        customerId,
        deviceId: null,
      },
    })
    return new NextResponse("cart items updated", {
      status: 200,
      headers: corsHeaders,
    })
  } catch (error) {
    console.log("[CART_PATCH]", error)
    return new NextResponse("internal server error", {
      status: 500,
      headers: corsHeaders,
    })
  }
}

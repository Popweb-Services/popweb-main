import { NextResponse } from "next/server"

import prismadb from "@/lib/prismadb"
import { orderValidator } from "@/lib/validators/order"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders })
}
export async function POST(
  request: Request,
  { params }: { params: { storeId: string } }
): Promise<NextResponse> {
  try {
    const body = await request.json()
    const { cartItems, customerAddressId, customerId, shippingRateId } =
      orderValidator.parse(body)
    const order = await prismadb.order.create({
      data: {
        storeId: params.storeId,
        customerAddressId,
        customerId,
        shippingRateId,
      },
    })
    cartItems.map(async (item) => {
      await prismadb.order.update({
        where: {
          id: order.id,
        },
        data: {
          cartItems: {
            connect: item.id,
          },
        },
      })
    })
    return NextResponse.json(order, { status: 200, headers: corsHeaders })
  } catch (error) {
    console.log(error)
    return new NextResponse("internal server error", {
      status: 500,
      headers: corsHeaders,
    })
  }
}

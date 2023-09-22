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
export async function PATCH(
  _request: Request,
  { params }: { params: { storeId: string; cartItemId: string } }
) {
  try {
    const cartItem = await prismadb.cartItem.update({
      where: {
        id: params.cartItemId,
      },
      data: {
        quantity: { decrement: 1 },
      },
    })
    if(cartItem.quantity === 0 ){
        await prismadb.cartItem.delete({
            where:{
                id:cartItem.id
            }
        })
    }
    return new NextResponse("cart item quantity updated", {
      status: 200,
      headers: corsHeaders,
    })
  } catch (error) {
    console.log("[CART_ITEM_PATCH]", error)
    return new NextResponse("internal server error", {
      status: 500,
      headers: corsHeaders,
    })
  }
}

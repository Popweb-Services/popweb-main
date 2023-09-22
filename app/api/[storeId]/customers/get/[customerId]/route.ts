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
export async function GET(
  request: Request,
  { params }: { params: { customerId: string; storeId: string } }
) {
  try {
    const customer = await prismadb.customer.findUnique({
      where: {
        id: params.customerId,
      },
    })
    return NextResponse.json(customer, { status: 200, headers: corsHeaders })
  } catch (error) {
    console.log("GET_CUSTOMER", error)
    return new NextResponse("internal server error", {
      status: 500,
      headers: corsHeaders,
    })
  }
}

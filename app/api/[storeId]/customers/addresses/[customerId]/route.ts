import { NextResponse } from "next/server"
import { ZodError } from "zod"

import prismadb from "@/lib/prismadb"
import { addressValidator } from "@/lib/validators/address"

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
    const addresses = await prismadb.customerAddress.findMany({
      where: {
        customerId: params.customerId,
      },
      orderBy: {
        createdAt: "desc",
      },
    })
    return NextResponse.json(addresses, { status: 200, headers: corsHeaders })
  } catch (error) {
    console.log(error)
    return new NextResponse("internal server error", {
      status: 500,
      headers: corsHeaders,
    })
  }
}

export async function POST(
  request: Request,
  { params }: { params: { customerId: string; storeId: string } }
) {
  try {
    const body = await request.json()
    console.log(body)
    const {
      address,
      city,
      postCode,
      province,
      recieverName,
      recieverPhoneNumber,
    } = addressValidator.parse(body)
    await prismadb.customerAddress.create({
      data: {
        address,
        city,
        postCode: postCode.toString(),
        province,
        recieverPhoneNumber,
        recieverName,
        customerId: params.customerId,
      },
    })
    return new NextResponse("address added", {
      status: 200,
      headers: corsHeaders,
    })
  } catch (error) {
    console.log("[ADDRESS_POST]", error)
    if (error instanceof ZodError) {
      return new NextResponse("invalid request data passed", {
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

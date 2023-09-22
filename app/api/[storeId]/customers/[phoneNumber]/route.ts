import { URL } from "next/dist/compiled/@edge-runtime/primitives/url"
import { NextResponse } from "next/server"
import bcrypt from "bcrypt"

import prismadb from "@/lib/prismadb"
import { customerAuthenticationValidator } from "@/lib/validators/customer-validators"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT,PATCH, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders })
}

export async function POST(
  request: Request,
  { params }: { params: { storeId: string; phoneNumber: string } }
): Promise<NextResponse> {
  try {
    const body = await request.json()
    const { code } = customerAuthenticationValidator.parse(body)
    const customer = await prismadb.customer.findUnique({
      where: {
        customerIdentifier: {
          phone: params.phoneNumber,
          storeId: params.storeId,
        },
      },
    })
    if (!customer) {
      return new NextResponse("Invalid credentials", {
        status: 401,
        headers: corsHeaders,
      })
    }
    const comparedPassword = await bcrypt.compare(code, customer.hashedOTP)
    if (!comparedPassword) {
      return new NextResponse("Invalid credentials", {
        status: 401,
        headers: corsHeaders,
      })
    }
    return NextResponse.json(customer, { status: 200, headers: corsHeaders })
  } catch (error) {
    console.log(error)
    return new NextResponse("internal server error", { status: 500 })
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { storeId: string; phoneNumber: string } }
) {
  try {
    const body = await request.json()
    const { name } = body
    await prismadb.customer.update({
      where: {
        customerIdentifier: {
          phone: params.phoneNumber,
          storeId: params.storeId,
        },
      },
      data: {
        name,
      },
    })
    return new NextResponse("name updated", {
      status: 200,
      headers: corsHeaders,
    })
  } catch (error) {
    console.log("[CUSTOMER_PATHC]", error)
    return new NextResponse("internal server error", {
      status: 500,
      headers: corsHeaders,
    })
  }
}

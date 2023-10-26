import { NextResponse } from "next/server"
import axios, { AxiosError } from "axios"
import { z } from "zod"

import { TransactionInfoResponse } from "@/types/vandar"
import prismadb from "@/lib/prismadb"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,PATCH ,POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders })
}
export async function GET(
  _request: Request,
  { params }: { params: { storeId: string; orderId: string } }
): Promise<NextResponse> {
  try {
    const order = await prismadb.order.findUnique({
      where: {
        id: params.orderId,
      },
    })
    return NextResponse.json(order, { status: 200, headers: corsHeaders })
  } catch (error) {
    console.log("[GET_ORDER]", error)
    return new NextResponse("internal server error", {
      status: 500,
      headers: corsHeaders,
    })
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { orderId: string; storeId: string } }
): Promise<NextResponse> {
  try {
    const body = await request.json()
    const requestSchema = z.object({
      api_key: z.string(),
      token: z.string(),
    })
    const { token, api_key } = requestSchema.parse(body)
    const { data: transactionInfo } = await axios.post<TransactionInfoResponse>(
      "https://ipg.vandar.io/api/v3/transaction",
      {
        api_key,
        token,
      }
    )
    if (transactionInfo.code === 2) {
      await prismadb.order.update({
        where: {
          id: params.orderId,
        },
        data: {
          isPaid: true,
        },
      })
      //   send sms and email to store owner and send sms to customer
      return new NextResponse("order paid", {
        status: 200,
        headers: corsHeaders,
      })
    } else {
      return new NextResponse("transaction is not verified", {
        status: 400,
        headers: corsHeaders,
      })
    }
  } catch (error) {
    console.log("UPDATE_ORDER_TO_PAID", error)
    if (error instanceof z.ZodError) {
      return new NextResponse("api key or token is missing", {
        status: 422,
        headers: corsHeaders,
      })
    } else if (error instanceof AxiosError) {
      return new NextResponse("error getting transaction info", {
        status: 400,
        headers: corsHeaders,
      })
    }
    return new NextResponse("internal server error", {
      status: 500,
      headers: corsHeaders,
    })
  }
}

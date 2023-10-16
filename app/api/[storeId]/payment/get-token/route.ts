import { NextResponse } from "next/server"
import axios from "axios"
import { z } from "zod"

import paymentTokenRequestDataValidator from "@/lib/validators/payment-token-request-data"

export async function POST(
  request: Request,
  { params }: { params: { storeId: string } }
): Promise<NextResponse> {
  try {
    const body = await request.json()
    const { amount, mobile_number, port, subscriptionMounths } =
      paymentTokenRequestDataValidator.parse(body)
    const { data } = await axios.post("https://ipg.vandar.io/api/v3/send", {
      api_key: process.env.VANDAR_API_KEY,
      amount,
      mobile_number,
      callback_url: `https://popweb.ir/dashboard/${params.storeId}/payment/verify-transaction?storeId=${params.storeId}&subscriptionMounths=${subscriptionMounths}`,
      port,
    })
    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    console.log("[GET_TOKEN]", error)
    if (error instanceof z.ZodError) {
      return new NextResponse(error.message, { status: 422 })
    }
    return NextResponse.json(error, { status: 500 })
  }
}

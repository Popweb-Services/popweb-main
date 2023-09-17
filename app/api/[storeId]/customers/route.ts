import { NextResponse } from "next/server"
import axios, { AxiosError } from "axios"
import bcrypt from "bcrypt"
import qs from "query-string"

import prismadb from "@/lib/prismadb"
import sms from "@/lib/sms"
import { phoneNumberValidator } from "@/lib/validators/store-validators"

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
) {
  try {
    const body = await request.json()
    const { phone } = phoneNumberValidator.parse(body)
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`
    const hashedOTP = await bcrypt.hash(otp, 12)
    console.log(otp)
    const store = await prismadb.store.findUnique({
      where: {
        id: params.storeId,
      },
    })
    if (!store) {
      return new NextResponse("invalid request data passed", { status: 400 })
    }

    const existingCustomer = await prismadb.customer.findUnique({
      where: {
        customerIdentifier: {
          phone,
          storeId: params.storeId,
        },
      },
    })
    if (existingCustomer) {
      await prismadb.customer.update({
        where: {
          customerIdentifier: {
            phone,
            storeId: params.storeId,
          },
        },
        data: {
          hashedOTP,
        },
      })
    } else {
      await prismadb.customer.create({
        data: {
          phone,
          storeId: params.storeId,
          hashedOTP,
        },
      })
    }
    // send otp message
    const simpleSMSUrl = qs.stringifyUrl({
      url: `https://api.kavenegar.com/v1/${process.env.KAVENEGAR_API_KEY}/sms/send.json`,
      query: {
        receptor: phone,
        message: encodeURIComponent(
          `فروشگاه اینترنتی ${store.name} \n کد تایید: ${otp}`
        ),
      },
    })
    const otpSMSUrl = qs.stringifyUrl({
      url: `https://api.kavenegar.com/v1/${process.env.KAVENEGAR_API_KEY}/verify/lookup.json`,
      query: {
        template: "verifyLogin",
        token: otp,
        token2: otp,
        receptor: phone,
      },
    })
    // await axios.post(otpSMSUrl)
    return NextResponse.json(
      {
        isNewUser: !existingCustomer || !existingCustomer.name ? true : false,
      },
      { status: 200, headers: corsHeaders }
    )
  } catch (error) {
    console.log("[CUSTOMERS_POST]", error)
    if (error instanceof AxiosError) {
      console.log(error.response)
    }
    return new NextResponse("Internal server error", {
      status: 500,
      headers: corsHeaders,
    })
  }
}

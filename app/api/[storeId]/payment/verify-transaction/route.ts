import { NextResponse } from "next/server"
import axios from "axios"
import { addMinutes, isAfter } from "date-fns"
import { z } from "zod"

import prismadb from "@/lib/prismadb"

export async function POST(
  request: Request,
  { params }: { params: { storeId: string } }
): Promise<NextResponse> {
  try {
    const store = await prismadb.store.findUnique({
      where: {
        id: params.storeId,
      },
    })
    if (!store) {
      return new NextResponse("invalid store id", { status: 400 })
    }
    const alreadyHasSubscription = isAfter(store?.trialEnd!, new Date())
    const requestPayloadSchema = z.object({
      token: z.string(),
      subscriptionMounths: z.string(),
    })
    const body = await request.json()
    const { token, subscriptionMounths } = requestPayloadSchema.parse(body)
    const { data } = await axios.post(
      "https://ipg.vandar.io/api/v3/transaction",
      {
        api_key: process.env.VANDAR_API_KEY,
        token,
      }
    )
    if (data.code === 1) {
      const { data: paymentVerifyResponse } = await axios.post(
        "https://ipg.vandar.io/api/v3/verify",
        {
          api_key: process.env.VANDAR_API_KEY,
          token,
        }
      )
      const updateSubscriptionByMounths = async (mounths: number) => {
        if (alreadyHasSubscription) {
          await prismadb.store.update({
            where: {
              id: store?.id,
            },
            data: {
              // add 12 mounts in real app
              isTest: false,
              subscriptionEnd: addMinutes(store?.trialEnd!, mounths),
            },
          })
        } else {
          await prismadb.store.update({
            where: {
              id: store?.id,
            },
            data: {
              subscriptionStart: new Date(),
              subscriptionEnd: addMinutes(new Date(), mounths),
            },
          })
        }
      }
      if (paymentVerifyResponse.status === 1) {
        if (subscriptionMounths === "12") {
          await updateSubscriptionByMounths(12)
        } else if (subscriptionMounths === "3") {
          await updateSubscriptionByMounths(3)
        } else {
          return new NextResponse("invalid mounths", { status: 400 })
        }
      } else {
        return new NextResponse("error verifying payment", { status: 500 })
      }
    } else {
      return new NextResponse("no payment detected", { status: 400 })
    }
    // deploy application if store has not deployed
    if (!store.isDeployed) {
      await axios.post(`https://popweb.ir/api/${store.id}/deploy-website`)
    }
    return new NextResponse("subscription updated", { status: 200 })
  } catch (error) {
    console.log("[VERIFY_TRANSACTION]", error)
    if (error instanceof z.ZodError) {
      return NextResponse.json(error.message, { status: 422 })
    }
    return new NextResponse("internal server error", { status: 500 })
  }
}

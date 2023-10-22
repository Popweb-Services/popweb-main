import { NextResponse } from "next/server"
import { addDays } from "date-fns"
import { z } from "zod"

import prismadb from "@/lib/prismadb"
import { getAuthSession } from "@/lib/session"
import { generalSettingsValidator } from "@/lib/validators/settings-validators"
import { createStoreFormSchema } from "@/lib/validators/store-validators"

export async function POST(request: Request) {
  try {
    const session = await getAuthSession()
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }
    const body = await request.json()
    const { name, description, logoUrl, themeColor } =
      generalSettingsValidator.parse(body)
    const user = await prismadb.user.findUnique({
      where: {
        id: session.user.id,
      },
    })
    const store = await prismadb.store.create({
      data: {
        userId: session.user.id,
        name,
        isTest: !user?.hasUsedTrial,
        subscriptionStart: new Date(),
        subscriptionEnd: user?.hasUsedTrial
          ? new Date()
          : addDays(new Date(), 14),
      },
    })
    if (user?.hasUsedTrial === false) {
      await prismadb.user.update({
        where: { id: session.user.id },
        data: {
          hasUsedTrial: true,
        },
      })
    }
    // TODO:deploy website with enviremont variables
    return NextResponse.json(store, { status: 200 })
  } catch (error) {
    console.log("[STORE]_POST", error)
    if (error instanceof z.ZodError) {
      return new NextResponse(error.message, { status: 422 })
    }
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

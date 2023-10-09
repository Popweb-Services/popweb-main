import { NextResponse } from "next/server"
import { z } from "zod"

import prismadb from "@/lib/prismadb"
import { getAuthSession } from "@/lib/session"
import { generalSettingsValidator } from "@/lib/validators/settings-validators"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST,PATCH, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders })
}
export async function PATCH(
  request: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const session = await getAuthSession()
    if (!session?.user) {
      return new NextResponse("Unauthorizes", { status: 401 })
    }
    const userByStore = await prismadb.store.findUnique({
      where: {
        id: params.storeId,
        userId: session.user.id,
      },
    })
    if (!userByStore) {
      return new NextResponse("you are not allowed to do this action", {
        status: 403,
      })
    }
    const body = await request.json()
    const { name, bannerUrl, logoUrl, themeColor, description } =
      generalSettingsValidator.parse(body)
    await prismadb.store.update({
      where: {
        id: params.storeId,
      },
      data: {
        name,
        logoUrl,
        bannerUrl,
        themeColor,
        description,
      },
    })
    return new NextResponse("Store updated", { status: 200 })
  } catch (error) {
    console.log("[STORE_PATCH]", error)
    if (error instanceof z.ZodError) {
      return new NextResponse(error.message, { status: 422 })
    }
    return new NextResponse("Internal server error", { status: 500 })
  }
}

export async function GET(
  _request: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const store = await prismadb.store.findUnique({
      where: {
        id: params.storeId,
      },
    })
    return NextResponse.json(store, { status: 200, headers: corsHeaders })
  } catch (error) {
    console.log("[STORE_GET]", error)
    return new NextResponse("Internal server error", {
      status: 500,
      headers: corsHeaders,
    })
  }
}

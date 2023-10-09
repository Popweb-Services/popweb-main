import { NextResponse } from "next/server"
import { z } from "zod"

import prismadb from "@/lib/prismadb"
import { getAuthSession } from "@/lib/session"
import { createCategoryFormSchema } from "@/lib/validators/store-validators"

interface IParams {
  params: {
    storeId: string
    categoryId: string
  }
}
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders })
}
export async function PATCH(request: Request, { params }: IParams) {
  try {
    const session = await getAuthSession()
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }
    const userStore = await prismadb.store.findUnique({
      where: {
        id: params.storeId,
        userId: session.user.id,
      },
    })
    if (!userStore) {
      return new NextResponse("Forbbiden", { status: 403 })
    }
    const body = await request.json()
    const { name, parent } = createCategoryFormSchema.parse(body)
    await prismadb.category.update({
      where: { id: params.categoryId },
      data: {
        name,
        parentCategoryId: parent,
      },
    })

    return new NextResponse("Category Updated", { status: 200 })
  } catch (error) {
    console.log(error)
    if (error instanceof z.ZodError) {
      return new NextResponse(error.message, { status: 422 })
    }
    return new NextResponse("Internal server error", { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: IParams) {
  try {
    const session = await getAuthSession()
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }
    const userStore = await prismadb.store.findUnique({
      where: {
        id: params.storeId,
        userId: session.user.id,
      },
    })
    if (!userStore) {
      return new NextResponse("Forbbiden", { status: 403 })
    }
    await prismadb.category.delete({
      where: {
        id: params.categoryId,
      },
    })
    return new NextResponse("Category deleted", { status: 200 })
  } catch (error) {
    console.log(error)
    return new NextResponse("Internal sever error", { status: 500 })
  }
}

export async function GET(
  request: Request,
  { params }: IParams
): Promise<NextResponse> {
  try {
    const category = await prismadb.category.findUnique({
      where: {
        id: params.categoryId,
      },
      include: {
        subcategories: true,
      },
    })
    return NextResponse.json(category, { status: 200 })
  } catch (error) {
    console.log("[CATEGORY_GET]", error)
    return new NextResponse("internal server error", {
      status: 500,
      headers: corsHeaders,
    })
  }
}

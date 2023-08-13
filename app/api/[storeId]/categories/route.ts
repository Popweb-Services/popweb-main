import { NextResponse } from "next/server"
import { z } from "zod"

import prismadb from "@/lib/prismadb"
import { getAuthSession } from "@/lib/session"
import { createCategoryFormSchema } from "@/lib/validators/store-validators"

interface IParams {
  params: {
    storeId: string
  }
}

export async function POST(request: Request, { params }: IParams) {
  try {
    const session = await getAuthSession()
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }
    const userStore = await prisma?.store.findUnique({
      where: { id: params.storeId, userId: session.user.id },
    })
    if (!userStore) {
      return new NextResponse("Forbidden", { status: 403 })
    }
    const body = await request.json()
    const { name, parent } = createCategoryFormSchema.parse(body)
    await prismadb.category.create({
      data: {
        name,
        parentCategoryId: parent === "no-parent" ? undefined : parent,
        storeId: params.storeId,
      },
    })
    return new NextResponse("Category created", { status: 200 })
  } catch (error) {
    console.log("[CATEGORIES_POST]", error)
    if (error instanceof z.ZodError) {
      return new NextResponse("Invaldi request data passed", { status: 422 })
    }
    return new NextResponse("Internal Server error", { status: 500 })
  }
}

export async function GET(_request: Request, { params }: IParams) {
  try {
    const categories = await prismadb.category.findMany({
      where: {
        storeId: params.storeId,
      },
    })
    return NextResponse.json(categories, { status: 200 })
  } catch (error) {
    console.log("[CATEGORIES_GET]", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

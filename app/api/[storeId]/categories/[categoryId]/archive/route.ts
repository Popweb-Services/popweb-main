import { NextResponse } from "next/server"

import prismadb from "@/lib/prismadb"
import { getAuthSession } from "@/lib/session"

interface IParams {
  params: {
    storeId: string
    categoryId: string
  }
}

export async function PATCH(_request: Request, { params }: IParams) {
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

    const category = await prismadb.category.findUnique({
      where: {
        id: params.categoryId,
      },
    })
    if (!category) {
      return new NextResponse("Invalid category ID", { status: 400 })
    }
    await prismadb.category.update({
      where: {
        id: params.categoryId,
      },
      data: {
        isArchived: !category?.isArchived,
      },
    })
    return new NextResponse("Category Archived", { status: 200 })
  } catch (error) {
    console.log(error)
    return new NextResponse("Internal server error", { status: 500 })
  }
}

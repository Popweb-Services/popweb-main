import { NextResponse } from "next/server"

import prismadb from "@/lib/prismadb"
import { getAuthSession } from "@/lib/session"

interface IParams {
  params: {
    storeId: string
    bannerId: string
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

    const banner = await prismadb.banner.findUnique({
      where: {
        id: params.bannerId,
      },
    })
    if (!banner) {
      return new NextResponse("Invalid shipping rate ID", { status: 400 })
    }
    await prismadb.banner.update({
      where: {
        id: params.bannerId,
      },
      data: {
        isArchived: !banner?.isArchived,
      },
    })
    return new NextResponse("Shipping rate Archived", { status: 200 })
  } catch (error) {
    console.log('[BANNER_ARCHIVE_PATHC]',error)
    return new NextResponse("Internal server error", { status: 500 })
  }
}

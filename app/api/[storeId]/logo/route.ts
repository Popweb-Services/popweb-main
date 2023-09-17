import { NextResponse } from "next/server"

import prismadb from "@/lib/prismadb"

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
    return NextResponse.json(store?.logoUrl, { status: 200 })
  } catch (error) {
    console.log("[LOGO_GET]", error)
    return new NextResponse("Internal server error", { status: 500 })
  }
}

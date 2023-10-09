import { NextResponse } from "next/server"
import { z } from "zod"

import prismadb from "@/lib/prismadb"
import s3Client from "@/lib/s3-client"
import { getAuthSession } from "@/lib/session"
import { deleteFileValidator } from "@/lib/validators/upload"

interface IParams {
  params: {
    storeId: string
    fileKey: string
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
      return new NextResponse("you are not allowed to do this action", {
        status: 403,
      })
    }
    await s3Client.deleteObject({
      Bucket: process.env.BUCKET_NAME as string,
      Key: params.fileKey,
    })

    return new NextResponse("File Deleted", { status: 200 })
  } catch (error) {
    console.log("[UPLOAD_IMAGE_DELETE]", error)
    if (error instanceof z.ZodError) {
      return new NextResponse(error.message, { status: 422 })
    }
    return new NextResponse("Internal server error", { status: 500 })
  }
}

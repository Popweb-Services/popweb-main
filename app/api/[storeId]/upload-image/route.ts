import { NextRequest, NextResponse } from "next/server"
import { PutObjectCommand } from "@aws-sdk/client-s3"
import { v4 as uuid } from "uuid"

import s3Client from "@/lib/s3-client"

interface IParams {
  params: {
    storeId: string
  }
}

export async function POST(
  request: NextRequest,
  response: NextResponse
): Promise<NextResponse> {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as Blob | null
    if (!file) {
      return NextResponse.json(
        { error: "File blob is required." },
        { status: 400 }
      )
    }
    const fileKey = uuid()
    const fileFormat = file.type.split("/")[1]
    const arrBuff = await file.arrayBuffer()
    const buffer = Buffer.from(arrBuff)
    await s3Client.send(
      new PutObjectCommand({
        Body: buffer,
        Bucket: process.env.BUCKET_NAME,
        Key: fileKey,
      })
    )
    const url = `https://popweb.storage.iran.liara.space/${fileKey}`
    console.log(url)
    return NextResponse.json({ url }, { status: 200 })
  } catch (error) {
    console.error("Error uploading image:", error)
    return new NextResponse("internal server error", { status: 500 })
  }
}

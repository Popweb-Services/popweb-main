import { NextRequest, NextResponse } from "next/server"

import { v4 as uuid } from "uuid"


import s3Client from "@/lib/s3-client"


interface IParams {
  params: {
    storeId: string
  }
}

async function uploadImageToS3(
  file: Buffer,
  fileName: string
): Promise<string> {
  const resizedImageBuffer = Buffer.from(file)

  const params = {
    Bucket: process.env.BUCKET_NAME as string,
    Key: fileName,
    Body: resizedImageBuffer,
    ContentType: "image/jpeg", // Change the content type accordingly
  }

  // const command = new PutObjectCommand(params)
  // await s3Client.send(command)
  await s3Client.putObject(params).promise()

  return fileName
}

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as Blob | null
    if (!file) {
      return NextResponse.json(
        { error: "File blob is required." },
        { status: 400 }
      )
    }

    const mimeType = file.type
    const fileExtension = mimeType.split("/")[1]

    const buffer = Buffer.from(await file.arrayBuffer())
    const fileName = await uploadImageToS3(buffer, uuid() + "." + fileExtension)
    const url = `https://${process.env.BUCKET_NAME}.${process.env.BUCKET_ENDPOINT}/${fileName}`
    return NextResponse.json({ success: true, url })
  } catch (error) {
    console.error("Error uploading image:", error)
    NextResponse.json({ message: "Error uploading image" })
  }
}

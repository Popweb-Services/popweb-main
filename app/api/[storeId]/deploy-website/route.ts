import { randomUUID } from "crypto"
import { NextResponse } from "next/server"
import axios from "axios"
import { z } from "zod"

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body = await request.json()
    const requestSchema = z.object({
      appName: z.string(),
    })
    const { appName } = requestSchema.parse(body)
    await axios.post(
      "https://api.iran.liara.ir/v1/projects",
      {
        name: randomUUID(),
        planID: "small",
        platform: "next",
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.LIARA_API_KEY}`,
        },
      }
    )
    return new NextResponse("app created", { status: 200 })
  } catch (error) {
    console.log(error)
    return new NextResponse("internal server error", { status: 500 })
  }
}

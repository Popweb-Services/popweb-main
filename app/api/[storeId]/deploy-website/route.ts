import { randomUUID } from "crypto"
import { readFile } from "fs/promises"
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
    const tempName = randomUUID()
    await axios.post(
      "https://api.iran.liara.ir/v1/projects",
      {
        name: tempName,
        planID: "ir-mini",
        platform: "next",
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.LIARA_API_KEY}`,
        },
      }
    )
    // deploy website
    const websiteSourceCode = await readFile("digikala-theme.tar.gz")
    const blob = new Blob([websiteSourceCode])
    const reader = new FileReader()
    const file = reader.readAsBinaryString(blob)
    await axios.post(
      `https://api.iran.liara.ir/v2/projects/${tempName}/sources`,
      {
        file,
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

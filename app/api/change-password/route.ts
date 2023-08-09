import { NextResponse } from "next/server"
import bcrypt from "bcrypt"
import { z } from "zod"

import prismadb from "@/lib/prismadb"

const routeSchema = z.object({
  userId: z.string().min(1),
  password: z
    .string()
    .min(8, { message: "کلمه عبور باید حداقل 8 کاراکتر باشد" })
    .regex(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/, {
      message: "کلمه عبور باید دارای حداقل 1 حرف و عدد باشد",
    }),
})

export async function PATCH(request: Request) {
  try {
    const body = await request.json()
    const { password, userId } = routeSchema.parse(body)
    const user = await prismadb.user.findUnique({
      where: { id: userId },
    })
    if (!user) {
      return new NextResponse("User does not exists", { status: 400 })
    }
    const hashedPassword = await bcrypt.hash(password, 12)
    await prismadb.user.update({
      where: { id: userId },
      data: { hashedPassword },
    })
    return new NextResponse("Password changed", { status: 200 })
  } catch (error) {
    console.log("[CHANGE_PASSWORD]_PATCH", error)
    if (error instanceof z.ZodError) {
      return new NextResponse("Invalid request data passed", { status: 422 })
    }
    return new NextResponse("Internal server error", { status: 500 })
  }
}

import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcrypt"
import { z } from "zod"

import prismadb from "@/lib/prismadb"
import { SignUpValidator } from "@/lib/validators/auth-validators"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = SignUpValidator.parse(body)
    const existingUser = await prismadb.user.findUnique({
      where: { email },
    })
    if (existingUser) {
      return new NextResponse("User already exists", { status: 400 })
    }
    const hashedPassword = await bcrypt.hash(password, 12)
    const user = await prismadb.user.create({
      data: {
        email,
        hashedPassword,
      },
    })
    return NextResponse.json(user, { status: 200 })
  } catch (error) {
    console.log("REGISTER_POST", error)
    if (error instanceof z.ZodError) {
      return new NextResponse(error.message, { status: 422 })
    }
    return new NextResponse("Internal server error", { status: 500 })
  }
}

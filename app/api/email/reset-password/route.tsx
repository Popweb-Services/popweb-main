import { NextResponse } from "next/server"
import ResetPasswordEmail from "@/emails/reset-password-email"
import VerfiyAccountEmail from "@/emails/verify-account-email"
import { render } from "@react-email/render"
import jwt from "jsonwebtoken"

import prismadb from "@/lib/prismadb"
import { getAuthSession } from "@/lib/session"
import transporter from "@/lib/transporter"
import { ResetPasswordEmailValidator } from "@/lib/validators/reset-password-validators"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email } = ResetPasswordEmailValidator.parse(body)
    const user = await prismadb.user.findUnique({
      where: {
        email,
      },
    })
    if (!user) {
      return new NextResponse("User does not exists", { status: 400 })
    }
    jwt.sign(
      { user: user.id },
      process.env.PASSWORD_SECRET!,
      { expiresIn: "1d" },
      (error, emailToken) => {
        const url = `https://popweb.ir/reset/${emailToken}`
        transporter.sendMail({
          from: "notifications@mail.poormehdi.com",
          to: email,
          subject: "Verify Email",
          html: render(<ResetPasswordEmail url={url} />),
        })
      }
    )
    return new NextResponse("email sent", { status: 200 })
  } catch (error) {
    console.log("[VERIFY_EMAIL]_POST", error)
    return new NextResponse("Internal server error", { status: 500 })
  }
}

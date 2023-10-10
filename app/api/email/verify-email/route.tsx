import { NextResponse } from "next/server"
import VerfiyAccountEmail from "@/emails/verify-account-email"
import { render } from "@react-email/render"
import jwt from "jsonwebtoken"

import { getAuthSession } from "@/lib/session"
import transporter from "@/lib/transporter"

export async function POST(request: Request) {
  try {
    const session = await getAuthSession()
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }
    jwt.sign(
      { user: session.user.id },
      process.env.EMAIL_SECRET!,
      { expiresIn: "1d" },
      (error, emailToken) => {
        console.log(error)
        const url = `https://popweb.ir/verify-email/${emailToken}`
        transporter.sendMail({
          from: "notifications@mail.poormehdi.com",
          to: session.user.email,
          subject: "Verify Email",
          html: render(<VerfiyAccountEmail url={url} />),
        })
      }
    )
    return new NextResponse("email sent", { status: 200 })
  } catch (error) {
    console.log("[VERIFY_EMAIL]_POST", error)
    return new NextResponse("Internal server error", { status: 500 })
  }
}

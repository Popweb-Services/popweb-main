import { redirect } from "next/navigation"
import jwt from "jsonwebtoken"

import prismadb from "@/lib/prismadb"
import { getAuthSession } from "@/lib/session"
import transporter from "@/lib/transporter"

import VerifyEmailClient from "./components/verify-email-client"

interface EmailConfirmationPageProps {}

const EmailConfirmationPage = async ({}) => {
  const session = await getAuthSession()
  if (!session?.user.email) {
    return redirect("/sign-in")
  }
  const user = await prismadb.user.findUnique({
    where: {
      email: session.user.email,
    },
  })
  if (user?.isEmailVerified) {
    return redirect("/dashboard")
  }

  return (
    <>
      <VerifyEmailClient userEmail={user?.email!} />
    </>
  )
}

export default EmailConfirmationPage

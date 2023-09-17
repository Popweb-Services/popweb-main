import { notFound, redirect } from "next/navigation"
import jwt from "jsonwebtoken"

import prismadb from "@/lib/prismadb"
import { getAuthSession } from "@/lib/session"

import VerifySuccessClient from "./components/verify-success-client"

interface VerifySuccessPageProps {
  params: {
    token: string
  }
}

const VerifySuccessPage = async ({ params }: VerifySuccessPageProps) => {
  const session = await getAuthSession()
  if (!session?.user) {
    return redirect("/sign-in")
  }
  jwt.verify(params.token, process.env.EMAIL_SECRET!, async (error) => {
    if (error) {
      return notFound()
    }
    await prismadb.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        isEmailVerified: true,
      },
    })
  })

  return (
    <>
      <VerifySuccessClient />
    </>
  )
}

export default VerifySuccessPage

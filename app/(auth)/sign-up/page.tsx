import { redirect } from "next/navigation"

import { getAuthSession } from "@/lib/session"
import SignUpForm from "@/components/sign-up-form"

interface SignUpPageProps {}

const SignUpPage = async ({}) => {
  const session = await getAuthSession()
  if (session?.user) {
    redirect("/dashboard")
  }
  return (
    <>
      <SignUpForm />
    </>
  )
}

export default SignUpPage

import { redirect } from "next/navigation"

import { getAuthSession } from "@/lib/session"
import SignInForm from "@/components/sign-in-form"

interface SignInPageProps {}

const SignInPage = async ({}) => {
  const session = await getAuthSession()
  if (session?.user) {
    redirect("/dashboard")
  }
  return (
    <>
      <SignInForm />
    </>
  )
}

export default SignInPage

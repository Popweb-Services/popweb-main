import { redirect } from "next/navigation"

import { getAuthSession } from "@/lib/session"
import ChangeEmailForm from "@/components/change-email-form"

interface ChangeEmailPageProps {}

const ChangeEmailPage = async ({}) => {
  const session = await getAuthSession()
  if (!session?.user) {
    return redirect("/sign-in")
  }
  return (
    <>
      <ChangeEmailForm />
    </>
  )
}

export default ChangeEmailPage

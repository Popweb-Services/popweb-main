import { redirect } from "next/navigation"

import { getAuthSession } from "@/lib/session"
import ResetPasswordEmailForm from "@/components/reset-password-email-form"

interface ResetPasswordPageProps {}

const ResetPasswordPage: React.FC<ResetPasswordPageProps> = async ({}) => {
  const session = await getAuthSession()
  if (session?.user) {
    return redirect("/dashboard")
  }
  return (
    <>
      <ResetPasswordEmailForm />
    </>
  )
}

export default ResetPasswordPage

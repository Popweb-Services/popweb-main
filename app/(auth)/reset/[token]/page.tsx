import { notFound } from "next/navigation"
import jwt from "jsonwebtoken"

import ChangePasswordForm from "./components/change-password-form"

interface ChangePasswordPageProps {
  params: {
    token: string
  }
}

const ChangePasswordPage = ({ params }: ChangePasswordPageProps) => {
  try {
    const decoded: any = jwt.verify(params.token, process.env.PASSWORD_SECRET!)
    return (
      <>
        <ChangePasswordForm userId={decoded.user} />
      </>
    )
  } catch (error) {
    return notFound()
  }
}

export default ChangePasswordPage

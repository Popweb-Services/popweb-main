"use client"

import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import Logo from "@/components/ui/logo"
import SignInForm from "@/components/sign-in-form"

interface SignInPageProps {}

const SignInPage: React.FC<SignInPageProps> = ({}) => {
  return (
    <>
      <SignInForm />
    </>
  )
}

export default SignInPage

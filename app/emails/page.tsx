"use client"

import VerfiyAccountEmail from "@/emails/verify-account-email"

interface TempEmailPageProps {}

const TempEmailPage: React.FC<TempEmailPageProps> = ({}) => {
  return (
    <>
      <VerfiyAccountEmail />
    </>
  )
}

export default TempEmailPage

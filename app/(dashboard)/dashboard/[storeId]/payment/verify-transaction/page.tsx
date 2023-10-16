import { redirect } from "next/navigation"
import { Store } from "@prisma/client"
import axios from "axios"
import { addDays, addMinutes, isAfter, isBefore } from "date-fns"

import prismadb from "@/lib/prismadb"

interface VerifyTransactionPageProps {
  searchParams: {
    [key: string]: string
  }
  params: {
    storeId: string
  }
}

const VerifyTransactionPage = async ({
  searchParams,
  params,
}: VerifyTransactionPageProps) => {
  if (!searchParams.token) {
    redirect(`/dashborad/${params.storeId}/`)
  }
  if (!searchParams.subscriptionMounths) {
    redirect(`/dashboard/${params.storeId}`)
  }
  const response = await axios.post(
    `/api/${params.storeId}/payment/verify-transaction`
  )
  console.log(response.data)
  if (response.status !== 200) {
    return (
      <div className="w-full">
        <div className="container h-full flex flex-col items-center justify-center">
          <h2>payment failed</h2>
        </div>
      </div>
    )
  }
  return (
    <>
      <div className="w-full h-full">
        <div className="container h-full flex flex-col items-center justify-center">
          <h1>subscribed</h1>
        </div>
      </div>
    </>
  )
}

export default VerifyTransactionPage
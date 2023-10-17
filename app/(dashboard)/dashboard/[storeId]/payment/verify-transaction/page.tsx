import { redirect } from "next/navigation"
import { Store } from "@prisma/client"
import axios from "axios"
import { addDays, addMinutes, isAfter, isBefore } from "date-fns"

import prismadb from "@/lib/prismadb"

import VerifyTransactionClient from "./verify-transaction-client"

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
  console.log(searchParams)
  console.log(params)
  if (!searchParams.token) {
    redirect(`/dashborad/${params.storeId}/`)
  }
  if (!searchParams.subscriptionMounths) {
    redirect(`/dashboard/${params.storeId}`)
  }
  const { data } = await axios.post(
    `/api/${params.storeId}/payment/verify-transaction`,
    {
      token: searchParams.token,
      subscriptionMounths: searchParams.subscriptionMounths,
    }
  )
  console.log(data)
  // if (response.status !== 200) {
  //   return (
  //     <div className="w-full">
  //       <div className="container h-full flex flex-col items-center justify-center">
  //         <h2>payment failed</h2>
  //       </div>
  //     </div>
  //   )
  // }
  return (
    <>
      <div className="w-full h-full">
        <div className="container h-full flex flex-col items-center justify-center">
          <h1>subscribed</h1>
          <VerifyTransactionClient storeId={params.storeId} />
        </div>
      </div>
    </>
  )
}

export default VerifyTransactionPage

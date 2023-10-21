"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"

interface VerifyTransactionClientProps {
  storeId: string
}

const VerifyTransactionClient: React.FC<VerifyTransactionClientProps> = ({
  storeId,
}) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { mutate: verifyTransaction } = useMutation({
    mutationFn: async () => {
      const { data } = await axios.post(
        `/api/${storeId}/payment/verify-transaction`,
        {
          token: searchParams.get("token"),
          subscriptionMounths: searchParams.get("subscriptionMounths"),
        }
      )
      console.log(data)
    },
  })
  useEffect(() => {
    verifyTransaction()
  }, [])
  return (
    <>
      <div className="w-full h-full">
        <div className="container h-full flex items-center justify-center">
          subscribed
        </div>
      </div>
    </>
  )
}

export default VerifyTransactionClient

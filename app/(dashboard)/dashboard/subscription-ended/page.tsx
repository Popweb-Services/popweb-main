import Link from "next/link"
import { ImWarning } from "react-icons/im"

import prismadb from "@/lib/prismadb"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

interface SubscriptionEndedPageProps {
  searchParams: {
    [key: string]: string
  }
}

const SubscriptionEndedPage = async ({
  searchParams,
}: SubscriptionEndedPageProps) => {
  const store = await prismadb.store.findUnique({
    where: {
      id: searchParams.storeId,
    },
  })
  return (
    <>
      <div className="w-full h-full">
        <div className="container h-full flex flex-col items-center justify-center">
          subscription ended
        </div>
      </div>
    </>
  )
}

export default SubscriptionEndedPage

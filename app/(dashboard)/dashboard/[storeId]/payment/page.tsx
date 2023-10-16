import { notFound } from "next/navigation"

import prismadb from "@/lib/prismadb"
import Logo from "@/components/ui/logo"

import PaymentClient from "./payment-client"

interface PaymentPageProps {}

const PaymentPage = async ({ params }: { params: { storeId: string } }) => {
  const store = await prismadb.store.findUnique({
    where: {
      id: params.storeId,
    },
  })
  if (!store) {
    return notFound()
  }
  return (
    <>
      <div dir="rtl" className="max-w-2xl space-y-4 pt-24 p-4 mx-auto">
        <h1 className="text-xl font-bold">
          تمدید اشتراک فروشگاه {store?.name}
        </h1>
        <PaymentClient store={store} />
      </div>
    </>
  )
}

export default PaymentPage

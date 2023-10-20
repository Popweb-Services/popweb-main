import Link from "next/link"
import { redirect } from "next/navigation"
import { isAfter } from "date-fns"
import { ArrowLeft } from "lucide-react"
import { ImWarning } from "react-icons/im"

import prismadb from "@/lib/prismadb"
import { getAuthSession } from "@/lib/session"
import { orderValidator } from "@/lib/validators/order"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

import DashboardNavbar from "../components/dashboard-navbar"

interface StoreOverviewPageProps {
  params: {
    storeId: string
  }
}

const StoreOverviewPage = async ({ params }: StoreOverviewPageProps) => {
  const session = await getAuthSession()
  if (!session?.user) {
    return redirect("/sign-in")
  }
  const user = await prismadb.user.findUnique({
    where: {
      id: session.user.id,
    },
  })
  const store = await prismadb.store.findUnique({
    where: {
      id: params.storeId,
    },
  })
  const newOrders = await prismadb.order.findMany({
    where: {
      storeId: params.storeId,
      isPaid: false,
      hasSent: false,
    },
    include: {
      customer: true,
    },
  })

  return (
    <>
      <div dir="rtl" className="pt-20 container mx-auto">
        <div className="grid grid-cols-3 gap-x-5">
          <div className="p-4 border rounded-lg">
            <p>وضعیت فروش</p>
          </div>
          <div className="p-4 border rounded-lg"></div>
          <div className="p-4 border rounded-lg"></div>
        </div>
        <div className="grid grid-cols-7 mt-4">
          <div className="col-span-3 rounded-lg  border">
            <p className="p-4">سفارشات جدید</p>
            <Separator />
            <ScrollArea dir="rtl" className="w-full h-[400px]">
              {newOrders.map((order) => (
                <>
                  <div className="w-full flex items-center justify-between py-4 px-2">
                    <div className="space-y-2">
                      <p>{order.customer.name}</p>
                      <p>{order.customer.phone}</p>
                    </div>
                  </div>
                  <Separator />
                </>
              ))}
            </ScrollArea>
          </div>
        </div>
      </div>
    </>
  )
}

export default StoreOverviewPage

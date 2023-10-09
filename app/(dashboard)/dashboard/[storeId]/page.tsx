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
  const isSubscriptionEnded = () => {
    if (store?.isTest) {
      return !isAfter(new Date(), store.trialEnd!)
    }
    return !isAfter(new Date(), store?.subscriptionEnd!)
  }
  return (
    <>
      <div dir="rtl" className="pt-20 container mx-auto">
        <div className="grid grid-cols-3 gap-x-5">
          {isSubscriptionEnded() && (
            <div className="w-full col-span-3 p-4 my-4 rounded-xl bg-rose-200 container">
              <div className="flex items-center gap-x-4">
                <div className="w-14 h-14 flex rounded-xl items-center justify-center border border-rose-500">
                  <ImWarning className="w-6 h-6 text-rose-500" />
                </div>
                <div className="">
                  <p className="text-lg font-bold text-rose-500">
                    {store?.isTest
                      ? "اتمام مدت نسخه آزمایشی فروشگاه"
                      : "اتمام اشتراک فروشگاه شما"}
                  </p>
                  <p className="text-rose-500">
                    {store?.isTest
                      ? "مهلت نسخه آزمایشی فروشگاه شما به پایان رسیده است ، لطفا جهت استفاده از امکانات پنل اشتراک تهیه کنید."
                      : "اشتراک فروشگاه شما به پایان رسیده است ، لطفا جهت استفاده از امکانات پنل اشتراک خود را تمدید کنید."}
                  </p>
                  <Link
                    href={"/dashboard/payment"}
                    className="flex items-center text-rose-500 font-bold px-3 py-2 border rounded-lg border-rose-500 text-sm mt-3 w-[150px] justify-center hover:opacity-70 group duration-300 gap-x-2"
                  >
                    <p>تمدید اشتراک</p>
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 duration-300" />
                  </Link>
                </div>
              </div>
            </div>
          )}
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

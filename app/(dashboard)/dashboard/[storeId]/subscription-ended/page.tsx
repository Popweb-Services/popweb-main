import Link from "next/link"
import { ImWarning } from "react-icons/im"

import prismadb from "@/lib/prismadb"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

interface SubscriptionEndedPageProps {}

const SubscriptionEndedPage = async ({
  params,
}: {
  params: { storeId: string }
}) => {
  const store = await prismadb.store.findUnique({
    where: {
      id: params.storeId,
    },
  })
  return (
    <>
      <div className="w-full h-full">
        <div className="container flex h-full justify-center items-center gap-y-4 flex-col">
          <ImWarning className="w-10 h-10 text-rose-500" />
          <h1 className="text-xl font-bold text-rose-500">
            اشتراک فروشگاه {store?.name} به پایان رسیده است
          </h1>
          <p className="text-lg">
            اشتراک فروشگاه شما به پایان رسیده است . جهت استفاده از امکانات
            فروشگاه خود لطفا اشتراک خود را تمدید کنید.
          </p>
          <Link
            href={`/dashboard/payment?storeId=${store?.id}`}
            className={cn(
              buttonVariants({ variant: "default" }),
              "bg-primaryPurple hover:bg-primaryPurple/90"
            )}
          >
            تمدید اشتراک فروشگاه
          </Link>
        </div>
      </div>
    </>
  )
}

export default SubscriptionEndedPage

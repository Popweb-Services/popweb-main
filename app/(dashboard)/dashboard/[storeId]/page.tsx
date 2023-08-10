import { redirect } from "next/navigation"

import prismadb from "@/lib/prismadb"
import { getAuthSession } from "@/lib/session"

import DashboardNavbar from "../components/dashboard-navbar"

interface StoreOverviewPageProps {
  params: {
    storeId: string
  }
}

const StoreOverviewPage: React.FC<StoreOverviewPageProps> = async ({
  params,
}) => {
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

  return (
    <>
      {store?.isTest && (
        <div className="fixed p-1 top-0 text-white scale-75 origin-top rounded-b-lg left-1/2 -translate-x-1/2 bg-[#ED6704] ">
          نسخه آزمایشی
        </div>
      )}
    </>
  )
}

export default StoreOverviewPage

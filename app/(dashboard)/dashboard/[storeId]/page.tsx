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

    </>
  )
}

export default StoreOverviewPage

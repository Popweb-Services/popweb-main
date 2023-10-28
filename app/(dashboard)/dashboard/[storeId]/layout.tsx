import { ReactNode } from "react"
import { notFound, redirect } from "next/navigation"
import { isAfter } from "date-fns"

import prismadb from "@/lib/prismadb"
import { getAuthSession } from "@/lib/session"

import DashboardNavbar from "../components/dashboard-navbar"

interface IndividualStoreLayoutProps {
  children: ReactNode
  params: {
    storeId: string
  }
}

const IndividualStoreLayout = async ({
  params,
  children,
}: IndividualStoreLayoutProps) => {
  const session = await getAuthSession()
  if (!session?.user) {
    return redirect("/sign-in")
  }
  const user = await prismadb.user.findUnique({
    where: {
      id: session.user.id,
    },
  })
  const stores = await prismadb.store.findMany({
    where: {
      userId: user?.id,
    },
  })
  const store = await prismadb.store.findUnique({
    where: { id: params.storeId },
  })
  if(store?.userId !== user?.id){
    return redirect('/dashboard')
  }
  return (
    <>
      <DashboardNavbar store={store!} stores={stores} user={user!} />
      
      {children}
    </>
  )
}

export default IndividualStoreLayout

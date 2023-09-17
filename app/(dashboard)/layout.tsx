import { ReactNode } from "react"
import { redirect } from "next/navigation"

import prismadb from "@/lib/prismadb"
import { getAuthSession } from "@/lib/session"

import DashboardNavbar from "./dashboard/components/dashboard-navbar"

interface DashboardLayoutProps {
  children: ReactNode
}

const DashboardLayout = async ({ children }: DashboardLayoutProps) => {
  const session = await getAuthSession()
  if (!session) {
    return redirect("/sign-in")
  }
  const user = await prismadb.user.findUnique({
    where: {
      id: session.user.id,
    },
  })
  if (!user) {
    return redirect("/sign-in")
  }
  const stores = await prismadb.store.findMany({
    where: {
      userId: user.id,
    },
  })
  return (
    <>
      <DashboardNavbar stores={stores} user={user} />
      {children}
    </>
  )
}

export default DashboardLayout

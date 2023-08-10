import { ReactNode } from "react"
import { redirect } from "next/navigation"

import prismadb from "@/lib/prismadb"
import { getAuthSession } from "@/lib/session"

import DashboardNavbar from "./dashboard/components/dashboard-navbar"

interface DashboardLayoutProps {
  children: ReactNode
}

const DashboardLayout: React.FC<DashboardLayoutProps> = async ({
  children,
}) => {
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
  return (
    <>
      <DashboardNavbar user={user} />
      {children}
    </>
  )
}

export default DashboardLayout

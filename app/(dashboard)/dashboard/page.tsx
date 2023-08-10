import { redirect } from "next/navigation"

import prismadb from "@/lib/prismadb"
import { getAuthSession } from "@/lib/session"
import { Button } from "@/components/ui/button"

import DashboardClient from "./components/dashboard-client"
import DashboardNavbar from "./components/dashboard-navbar"

interface DashboardPageProps {}

const DashboardPage: React.FC<DashboardPageProps> = async ({}) => {
  const session = await getAuthSession()
  if (!session?.user.email) {
    redirect("/sign-in")
  }
  const user = await prismadb.user.findUnique({
    where: {
      email: session.user.email,
    },
  })
  if (!user?.isEmailVerified) {
    return redirect("/verify-email")
  }
  const store = await prismadb.store.findFirst({
    where: {
      userId: session.user.id,
    },
  })
  if (store) {
    return redirect(`/dashboard/${store.id}`)
  }
  return (
    <>
      <DashboardClient />
    </>
  )
}

export default DashboardPage

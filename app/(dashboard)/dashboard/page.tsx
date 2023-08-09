import { redirect } from "next/navigation"

import prismadb from "@/lib/prismadb"
import { getAuthSession } from "@/lib/session"

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
  return <></>
}

export default DashboardPage

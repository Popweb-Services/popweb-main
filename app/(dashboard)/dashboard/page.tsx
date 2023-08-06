import { redirect } from "next/navigation"

import { getAuthSession } from "@/lib/session"

interface DashboardPageProps {}

const DashboardPage: React.FC<DashboardPageProps> = async ({}) => {
  const session = await getAuthSession()
  return <></>
}

export default DashboardPage

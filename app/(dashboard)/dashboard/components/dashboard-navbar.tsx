import { User } from "@prisma/client"

import prismadb from "@/lib/prismadb"
import DashboardMainNav from "@/components/dashboard-main-nav"
import StoreSwitcher from "@/components/store-switcher"

import UserAccountNav from "./user-account-nav"

interface DashboardNavbarProps {
  user: User
}

const DashboardNavbar: React.FC<DashboardNavbarProps> = async ({ user }) => {
  const stores = await prismadb.store.findMany({
    where: {
      userId: user.id,
    },
  })
  return (
    <>
      <div className="w-full h-12 bg-secondary shadow-sm fixed">
        <div className="container h-full mx-auto flex items-center justify-between">
          <div className="flex items-center gap-x-8">
            <StoreSwitcher stores={stores} />
            <DashboardMainNav />
          </div>
          <div className="flex items-center gap-x-3">
            <UserAccountNav user={user} />
          </div>
        </div>
      </div>
    </>
  )
}

export default DashboardNavbar

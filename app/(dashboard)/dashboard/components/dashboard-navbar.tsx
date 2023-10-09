"use client"

import { usePathname } from "next/navigation"
import { Store, User } from "@prisma/client"
import { isAfter } from "date-fns"

import prismadb from "@/lib/prismadb"
import DashboardMainNav from "@/components/dashboard-main-nav"
import SettingsButton from "@/components/settings-button"
import StoreSwitcher from "@/components/store-switcher"

import UserAccountNav from "./user-account-nav"

interface DashboardNavbarProps {
  user: User
  stores: Store[]
}

const DashboardNavbar = ({ user, stores }: DashboardNavbarProps) => {
  const pathname = usePathname()
  if (pathname === "/dashboard/payment") {
    return null
  }
  return (
    <>
      <div className="w-full h-12 bg-white border-b fixed z-30">
        <div className="container h-full mx-auto flex items-center justify-between">
          <div className="flex items-center gap-x-8">
            <StoreSwitcher user={user} stores={stores} />
            {stores.length > 0 && <DashboardMainNav />}
          </div>
          <div className="flex items-center gap-x-3">
            {stores.length > 0 && <SettingsButton />}
            <UserAccountNav user={user} />
          </div>
        </div>
      </div>
    </>
  )
}

export default DashboardNavbar

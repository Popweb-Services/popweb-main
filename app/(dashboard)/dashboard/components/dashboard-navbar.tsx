"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"
import { Store, User } from "@prisma/client"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { isAfter } from "date-fns"
import { ArrowLeft } from "lucide-react"
import { ImWarning } from "react-icons/im"

import prismadb from "@/lib/prismadb"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import DashboardMainNav from "@/components/dashboard-main-nav"
import SettingsButton from "@/components/settings-button"
import StoreSwitcher from "@/components/store-switcher"

import UserAccountNav from "./user-account-nav"

interface DashboardNavbarProps {
  store: Store

  user: User
  stores: Store[]
}

const DashboardNavbar = ({ user, stores, store }: DashboardNavbarProps) => {
  const pathname = usePathname()
  if (pathname === "/dashboard/payment") {
    return null
  }
  return (
    <>
      {isAfter(new Date(), store.trialEnd!) && (
        <div className="w-full bg-rose-200 p-4">
          <div
            dir="rtl"
            className="container flex max-md:flex-col items-center justify-between"
          >
            <div className="flex max-md:flex-col items-center max-md:gap-y-3 gap-x-3">
              <ImWarning className="w-5 h-5 max-md:w-8 max-md:h-8 text-rose-600" />
              <p className="text-rose-600 max-md:text-center">
                اشتراک فروشگاه شما به اتمام رسیده است، جهت استفاده مجدد از
                امکانات اشتراک تهیه کنید در غیر این صورت فروشگاه شما حذف خواهد
                شد.
              </p>
            </div>
            <Link
              className={cn(
                buttonVariants({ variant: "default" }),
                "bg-transparent max-md:mt-3 gap-x-2 max-md:w-full group rounded-lg border text-rose-600 hover:bg-transparent border-rose-500"
              )}
              href={`/dashboard/${store.id}/payment`}
            >
              <p>تمدید اشتراک</p>
              <ArrowLeft className="group-hover:-translate-x-1 max-md:hidden duration-300 w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
      <div className="w-full h-12 bg-white border-b z-30">
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
        {store.isTest && (
          <div className="relative">
            <div className="flex justify-center">
              <span className="h-[0.5px] w-full bg-[#ED6704]" />
              <div className=" p-1 text-white z-20 scale-75 origin-top rounded-b-lg  bg-[#ED6704] ">
                نسخه آزمایشی
              </div>
              <span className="h-[0.5px] w-full bg-[#ED6704]" />
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default DashboardNavbar

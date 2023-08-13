"use client"

import Link from "next/link"
import { useParams, usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

interface DashboardMainNavProps {}

type IParams = {
  storeId: string
}

const DashboardMainNav: React.FC<DashboardMainNavProps> = ({}) => {
  const params = useParams() as IParams
  const pathname = usePathname()
  const routes = [
    {
      label: "خانه",
      href: `/dashboard/${params.storeId}`,
      active: pathname === `/dashboard/${params.storeId}`,
    },
    {
      label: "دسته بندی",
      href: `/dashboard/${params.storeId}/categories`,
      active: pathname === `/dashboard/${params.storeId}/categories`,
    },
    {
      label: "محصولات",
      href: `/dashboard/${params.storeId}/products`,
      active: pathname === `/dashboard/${params.storeId}/products`,
    },
  ]
  return (
    <>
      <nav className="hidden md:block">
        <ul className="flex items-center justify-start gap-x-1">
          {routes.map((route) => (
            <li
              className={cn(
                "py-1 px-3 text-sm font-semibold transition-colors cursor-pointer rounded-full",
                route.active
                  ? "bg-primaryPurple text-white"
                  : "hover:bg-secondary"
              )}
            >
              <Link href={route.href}>{route.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}

export default DashboardMainNav

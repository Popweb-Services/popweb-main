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
      label: "انبار",
      href: `/dashboard/${params.storeId}/inventory`,
      active: pathname.includes(`/dashboard/${params.storeId}/inventory`),
    },
    {
      label: "محصولات",
      href: `/dashboard/${params.storeId}/products`,
      active: pathname.includes(`/dashboard/${params.storeId}/products`),
    },
    {
      label: "دسته بندی",
      href: `/dashboard/${params.storeId}/categories`,
      active: pathname.includes(`/dashboard/${params.storeId}/categories`),
    },
    {
      label: "بنر ها",
      href: `/dashboard/${params.storeId}/banners`,
      active: pathname.includes(`/dashboard/${params.storeId}/banners`),
    },
    {
      label: "نحوه ارسال",
      href: `/dashboard/${params.storeId}/shipping-rates`,
      active: pathname.includes(`/dashboard/${params.storeId}/shipping-rates`),
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

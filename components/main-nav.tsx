"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

interface MainNavProps {
  className?: string
}

const MainNav: React.FC<MainNavProps> = ({ className }) => {
  const pathname = usePathname()
  return (
    <nav className="hidden sm:block">
      <ul
        className={cn("flex flex-row-reverse items-center gap-x-6", className)}
      >
        {siteConfig.mainNav.map((route) => (
          <li key={route.href}>
            <Link
              className="hover:opacity-50 transition-opacity font-semibold text-sm"
              href={route.href}
            >
              {route.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default MainNav

"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { HamburgerMenuIcon } from "@radix-ui/react-icons"
import { AiOutlineLeft } from "react-icons/ai"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

import MainNav from "./main-nav"
import { Button, buttonVariants } from "./ui/button"
import Logo from "./ui/logo"
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"

interface MobileMainNavProps {}

const MobileMainNav: React.FC<MobileMainNavProps> = ({}) => {
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])
  if (!isMounted) {
    return null
  }
  return (
    <>
      <div className="sm:hidden">
        <Sheet>
          <SheetTrigger>
            <Button variant="ghost">
              <HamburgerMenuIcon className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>
                <Logo className="mx-auto" />
              </SheetTitle>
            </SheetHeader>
            <div className="w-full h-full relative">
              <ul className="w-full flex flex-col pt-4 space-y-4">
                {siteConfig.mainNav.map((route) => (
                  <li key={route.href} className="ml-auto w-full">
                    <Link
                      dir="rtl"
                      className={cn(
                        buttonVariants({ variant: "outline" }),
                        "flex items-center justify-between w-full"
                      )}
                      href={route.href}
                    >
                      {route.label}
                      <AiOutlineLeft />
                    </Link>
                  </li>
                ))}
              </ul>
              <Button className="w-full absolute bottom-5">
                ورود
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}

export default MobileMainNav

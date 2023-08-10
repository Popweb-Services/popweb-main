"use client"

import { useRouter } from "next/navigation"
import { User } from "@prisma/client"
import { signOut } from "next-auth/react"
import { BiSolidUser } from "react-icons/bi"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

interface UserAccountNavProps {
  user: User
}

const UserAccountNav: React.FC<UserAccountNavProps> = ({ user }) => {
  const router = useRouter()
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <HoverCard>
            <HoverCardTrigger>
              <BiSolidUser size={24} />
            </HoverCardTrigger>
            <HoverCardContent className="p-1 w-auto text-xs text-white bg-primarySlate">
              پروفایل
            </HoverCardContent>
          </HoverCard>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-3 rounded-lg w-[250px]">
          <p className="text-sm truncate">{user.email}</p>
          <DropdownMenuSeparator />
          <DropdownMenuItem dir="rtl" className="py-1  px-2 cursor-pointer">
            پروفایل
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              signOut()
              router.push("/sign-in")
            }}
            dir="rtl"
            className="py-1 text-rose-500 px-2 cursor-pointer"
          >
            خروج از حساب کاربری
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default UserAccountNav

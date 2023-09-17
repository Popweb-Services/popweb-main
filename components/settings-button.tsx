"use client"

import Link from "next/link"
import { useParams, usePathname } from "next/navigation"
import { MdSettings } from "react-icons/md"

import { cn } from "@/lib/utils"

interface SettingsButtonProps {}

type IParams = {
  storeId: string
}

const SettingsButton: React.FC<SettingsButtonProps> = ({}) => {
  const params = useParams() as IParams
  const pathname = usePathname()
  return (
    <>
      <Link href={`/dashboard/${params.storeId}/settings`}>
        <MdSettings
          size={24}
          className={cn(
            pathname === `/dashboard/${params.storeId}/settings`
              ? "text-primaryPurple"
              : "text-black"
          )}
        />
      </Link>
    </>
  )
}

export default SettingsButton

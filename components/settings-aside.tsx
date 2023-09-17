"use client"

import { useParams, usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

interface SettingsAsideProps {}

type IParams = {
  storeId: string
}

const SettingsAside: React.FC<SettingsAsideProps> = ({}) => {
  const pathname = usePathname()
  const params = useParams() as IParams

  const settingsNav = [
    {
      label: "تنظیمات ظاهری",
      active: pathname === `/dashboard/${params.storeId}/settings`,
    },
    { label: "درگاه بانکی" },
  ]
  return (
    <>
      <aside className="w-full">
        <nav className="space-y-2">
          {settingsNav.map((item) => (
            <div
              className={cn(
                "px-4 py-2 cursor-pointer rounded-lg transition-colors hover:bg-slate-100",
                item.active ? "bg-slate-100 font-semibold" : "bg-white"
              )}
            >
              {item.label}
            </div>
          ))}
        </nav>
      </aside>
    </>
  )
}

export default SettingsAside

import { ReactNode } from "react"

import { Separator } from "@/components/ui/separator"
import SettingsAside from "@/components/settings-aside"

interface SettingsLayoutProps {
  children: ReactNode
}

const SettingsLayout: React.FC<SettingsLayoutProps> = ({ children }) => {
  return (
    <>
      <div dir="rtl" className="container mx-auto px-10 pt-20 space-y-3">
        <h1 className="font-bold text-3xl">تنظیمات</h1>
        <p className="text-text">
          تنظیمات مربوط به فروشگاهتان را از اینجا تغییر دهید.
        </p>
        <Separator />
        <div className="grid grid-cols-12 gap-x-5">
          <div className="col-span-3 border p-6 rounded-lg">
            <SettingsAside />
          </div>
          <div className="col-span-9 border rounded-lg p-10">{children}</div>
        </div>
      </div>
    </>
  )
}

export default SettingsLayout

import { ReactNode } from "react"

import Logo from "@/components/ui/logo"

interface AuthLayoutProps {
  children: ReactNode
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="w-full h-full bg-secondary">
      <div
        dir="rtl"
        className="max-w-2xl border-x-2 border-dashed h-full px-4 pt-[28px] md:px-[56px] mx-auto md:pt-[56px] flex flex-col gap-y-6 "
      >
        <Logo className="w-[100px] scale-75" />
        {children}
      </div>
    </div>
  )
}

export default AuthLayout

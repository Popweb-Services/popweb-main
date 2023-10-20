import { ReactNode } from "react"

interface DashboardLayoutProps {
  children: ReactNode
}
const DashboardLayout = async ({ children }: DashboardLayoutProps) => {
  return <>{children}</>
}

export default DashboardLayout

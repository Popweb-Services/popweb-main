import Link from "next/link"
import { Balancer } from "react-wrap-balancer"

import { siteConfig } from "@/config/site"

import Logo from "./ui/logo"

interface FooterProps {}

const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <>
      <footer className="w-full bg-white">
        <div
          className="container mx-auto max-w-6xl grid grid-cols-2 md:grid-cols-4 border-x-2 border-dashed py-[50px]"
          dir="rtl"
        >
          <div className="flex flex-col gap-y-4 items-between">
            <div className="space-y-2">
              <Logo />
              <p className="text-lg">ایران</p>
            </div>
            <p className="font-semibold">
              <Balancer>کلیه حقوق این وبسایت متعلق به پاپ وب میباشد</Balancer>
            </p>
          </div>
          <div className="space-y-4 border-r-2 px-4 border-dashed">
            <h4 className="text-lg font-semibold">دسترسی سریع</h4>
            <ul className="flex flex-col gap-y-2">
              {siteConfig.mainNav.map((route) => (
                <li>
                  <Link className="hover:opacity-50 transition-opacity" href={route.href}>{route.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer

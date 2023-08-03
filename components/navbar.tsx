import { Poppins } from "next/font/google"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { cn } from "@/lib/utils"

import MainNav from "./main-nav"
import MobileMainNav from "./mobile-main-nav"
import { Button } from "./ui/button"
import Logo from "./ui/logo"

interface NavbarProps {}

const poppins = Poppins({ weight: "900", subsets: ["latin"] })

const Navbar: React.FC<NavbarProps> = ({}) => {
  return (
    <>
      <header className="w-full z-40 h-12 md:h-16 bg-white fixed top-0 shadow-sm">
        <div className="container max-w-5xl h-full mx-auto flex items-center justify-between">
          <MobileMainNav />
          <Button
            variant="outline"
            className="sm:flex items-center gap-x-2 hidden group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            ورود
          </Button>
          <div className="flex items-center gap-x-5">
            <MainNav />
            <Logo />
          </div>
        </div>
      </header>
    </>
  )
}

export default Navbar

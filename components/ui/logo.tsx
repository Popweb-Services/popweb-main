import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"

interface LogoProps {
  className?: string
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <>
      <Link href={"/"}>
        <Image
          alt="logo"
          width={80}
          height={100}
          src={"/images/logo.png"}
          className={cn('hover:opacity-50 transition-opacity duration-300',className)}
        />
      </Link>
    </>
  )
}

export default Logo

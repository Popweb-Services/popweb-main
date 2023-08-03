import Link from "next/link"
import { AiOutlineArrowLeft } from "react-icons/ai"
import { Balancer } from "react-wrap-balancer"

import { cn } from "@/lib/utils"

import { buttonVariants } from "./ui/button"

interface SecondCTASectionProps {}

const SecondCTASection: React.FC<SecondCTASectionProps> = ({}) => {
  return (
    <>
      <section className="w-full bg-gradient-to-r from-[#CBBAFA] to-[#87EDF0]">
        <div className="max-w-4xl container mx-auto py-[80px] flex flex-col justify-center items-center gap-y-8">
          <h2 className="text-3xl font-bold text-center">
            <Balancer>همین الان فروشگاهتون رو راه اندازی کنید</Balancer>
          </h2>
          <Link
            href={""}
            className={cn(
              buttonVariants({ variant: "default" }),
              "group flex items-center gap-x-3"
            )}
          >
            <AiOutlineArrowLeft className="group-hover:-translate-x-2 transition-transform" />
            ساخت فروشگاه رایگان
          </Link>
        </div>
      </section>
    </>
  )
}

export default SecondCTASection

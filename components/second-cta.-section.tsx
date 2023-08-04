import Link from "next/link"
import { AiOutlineArrowLeft } from "react-icons/ai"
import { Balancer } from "react-wrap-balancer"

import { cn } from "@/lib/utils"

import { buttonVariants } from "./ui/button"

interface SecondCTASectionProps {}

const SecondCTASection: React.FC<SecondCTASectionProps> = ({}) => {
  return (
    <>
      <section className="w-full bg-secondary border-b-2 border-dashed">
        <div className="max-w-6xl container border-x-2 border-dashed mx-auto py-[80px] flex flex-col justify-center items-center gap-y-8">
          <h2 className="text-3xl font-bold text-center text-primarySlate">
            <Balancer>همین الان فروشگاهتون رو راه اندازی کنید</Balancer>
          </h2>
          <Link
            href={""}
            className={cn(
              buttonVariants({ variant: "default" }),
              "group flex items-center gap-x-3 bg-primaryPurple hover:bg-primaryPurple/90"
            )}
          >
            <AiOutlineArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            ساخت فروشگاه رایگان
          </Link>
        </div>
      </section>
    </>
  )
}

export default SecondCTASection

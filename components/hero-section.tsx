import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { Balancer } from "react-wrap-balancer"

import { Button } from "./ui/button"

interface HeroSectionProps {}

const HeroSection: React.FC<HeroSectionProps> = ({}) => {
  return (
    <>
      <section className="w-full h-[600px] md:h-[800px] bg-secondary overflow-hidden relative md:pt-16 border-b-2 border-dashed">
        {/* Background */}
        <div className=" absolute inset-0 animate-[spin_30s_ease-in-out_infinite] ">
          <div className="w-full h-full relative">
            <div className="w-[400px] md:w-[700px] h-[400px] opacity-60 md:h-[700px] rounded-full blur-3xl absolute right-1/3 top-1/2 bg-[#CBBAFA] -translate-y-1/2" />
            <div className="w-[400px] md:w-[700px] h-[400px] opacity-60  rounded-full blur-3xl absolute left-1/2 top-1/4  bg-[#87EDF0] md:h-[700px]" />
          </div>
        </div>
        {/* hero image */}
        <div className="w-[600px] z-10 h-[400px] absolute bg-white shadow-xl rounded-xl right-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 max-md:hidden">
          <div className="w-full h-full relative"></div>
        </div>
        <div className="w-[500px] z-20 h-[300px] absolute bg-white shadow-xl rounded-xl right-1/2 top-1/2 -translate-y-[20%] max-md:hidden"></div>

        <div className="container h-full mx-auto border-x-2 border-dashed max-w-6xl flex gap-x-8 items-center justify-center ">
          <div className="w-full h-full relative max-md:hidden"></div>
          <div dir="rtl" className="space-y-6 max-w-xl z-20">
            <h1 className="text-5xl leading-normal font-bold">
              <Balancer>فروشگاهی برای فروش بیشتر و مشتری بیشتر</Balancer>
            </h1>
            <p className="text-xl">
              <Balancer>
                با فروشگاه ساز پاپ وب در کمترین زمان ممکن و فقط با چند کلیک
                فروشگاه آنلاین خودتون رو راه اندازی کنید و فروش محصولاتتان را
                شروع کنید.
              </Balancer>
            </p>
            <Button className="flex items-center gap-x-2 text-xs md:text-sm group">
              ساخت فروشگاه رایگان
              <ArrowLeft
                size={20}
                className="group-hover:-translate-x-1 transition-transform"
              />
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}

export default HeroSection

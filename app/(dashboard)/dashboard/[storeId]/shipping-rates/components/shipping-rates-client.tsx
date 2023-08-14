"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Plus } from "lucide-react"
import { RiTruckFill } from "react-icons/ri"
import { Balancer } from "react-wrap-balancer"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

import { ShippingRateColumn, columns } from "./columns"
import { DataTable } from "./data-table"

interface ShippingRatesClientProps {
  shippingRates: ShippingRateColumn[]
}

const ShippingRatesClient: React.FC<ShippingRatesClientProps> = ({
  shippingRates,
}) => {
  const pathname = usePathname()

  return (
    <>
      <div className="container mx-auto pt-24">
        <div dir="rtl" className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">نحوه ارسال</h1>
          {shippingRates.length !== 0 && (
            <Link
              href={`${pathname}/create`}
              className={cn(
                buttonVariants({ variant: "default" }),
                "w-[200px] py-2 px-3 bg-primaryPurple rounded-lg hover:bg-primaryPurple/90 gap-x-2"
              )}
            >
              نحوه ارسال جدید
              <Plus size={20} />
            </Link>
          )}
        </div>
        <Separator className="mt-4" />
        {shippingRates.length === 0 ? (
          <div className="w-full pt-40 flex justify-center items-center">
            <div
              dir="rtl"
              className="flex flex-col space-y-4 w-full md:w-[400px]"
            >
              <div className="aspect-square w-12  h-12 flex items-center justify-center bg-secondary rounded-lg">
                <RiTruckFill size={30} className="text-[#87909F]" />
              </div>
              <h2 className="text-lg font-bold">
                فروشگاه شما هیچ نحوه ارسالی ندارد
              </h2>
              <p className="text-text">
                <Balancer>
                  با ایجاد نحوه ارسال مشتریان شما می توانند زمان پرداخت ، نحوه
                  ارسال مورد نظرشان را انتخاب کنند و هزینه آن به فاکتور اضافه
                  خواهد شد.
                </Balancer>
              </p>
              <Link
                href={`${pathname}/create`}
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "w-[200px] py-2 px-3 bg-primaryPurple rounded-lg hover:bg-primaryPurple/90 gap-x-2"
                )}
              >
                ایجاد نحوه ارسال
                <Plus size={20} />
              </Link>
            </div>
          </div>
        ) : (
          <div className="w-full mt-6">
            <DataTable columns={columns} data={shippingRates} />
          </div>
        )}
      </div>
    </>
  )
}

export default ShippingRatesClient

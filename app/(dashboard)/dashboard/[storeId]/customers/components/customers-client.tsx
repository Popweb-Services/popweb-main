"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Plus } from "lucide-react"
import { FaUsers } from "react-icons/fa"
import { Balancer } from "react-wrap-balancer"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

import { CustomerColumn, columns } from "./columns"
import { DataTable } from "./data-table"

interface ShippingRatesClientProps {
  customers: CustomerColumn[]
}

const ShippingRatesClient: React.FC<ShippingRatesClientProps> = ({
  customers,
}) => {
  const pathname = usePathname()

  return (
    <>
      <div className="container mx-auto pt-24">
        <div dir="rtl" className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">مشتریان</h1>
        </div>
        <Separator className="mt-4" />
        {customers.length === 0 ? (
          <div className="w-full pt-40 flex justify-center items-center">
            <div
              dir="rtl"
              className="flex flex-col space-y-4 w-full md:w-[400px]"
            >
              <div className="aspect-square w-12  h-12 flex items-center justify-center bg-secondary rounded-lg">
                <FaUsers size={30} className="text-[#87909F]" />
              </div>
              <h2 className="text-lg font-bold">فروشگاه هنوز مشتری ای ندارد</h2>
              <p className="text-text">
                <Balancer>
                  تا به حال کسی در فروشگاه شما ثبت نام نکرده است ، ثبت نام نکردن
                  افراد در سایت شما دلیلی بر بازدید نداشتن سایت شما نمی شود
                </Balancer>
              </p>
            </div>
          </div>
        ) : (
          <div className="w-full mt-6">
            <DataTable columns={columns} data={customers} />
          </div>
        )}
      </div>
    </>
  )
}

export default ShippingRatesClient

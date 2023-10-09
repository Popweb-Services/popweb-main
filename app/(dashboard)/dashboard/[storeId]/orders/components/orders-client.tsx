"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Plus } from "lucide-react"
import { FaShoppingBasket, FaUsers } from "react-icons/fa"
import { Balancer } from "react-wrap-balancer"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

import { OrderColumn, columns } from "./columns"
import { DataTable } from "./data-table"

interface OrdersClientProps {
  orders: OrderColumn[]
}

const OrdersClient: React.FC<OrdersClientProps> = ({ orders }) => {
  const pathname = usePathname()

  return (
    <>
      <div className="container mx-auto pt-24">
        <div dir="rtl" className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">سفارشات</h1>
        </div>
        <Separator className="mt-4" />
        {orders.length === 0 ? (
          <div className="w-full pt-40 flex justify-center items-center">
            <div
              dir="rtl"
              className="flex flex-col space-y-4 w-full md:w-[400px]"
            >
              <div className="aspect-square w-12  h-12 flex items-center justify-center bg-secondary rounded-lg">
                <FaShoppingBasket size={30} className="text-[#87909F]" />
              </div>
              <h2 className="text-lg font-bold">
                هنوز هیچ سفارشی برای فروشگاه شما ثبت نشده است.
              </h2>
              <p className="text-text">
                تا به حال کسی در فروشگاه شما سفارشی را ثبت نکرده است. به محض ثبت
                سفارش توسط مشتری می توانید از این قسمت سفارشات خوددد را مدیریت
                کنید.
              </p>
            </div>
          </div>
        ) : (
          <div className="w-full mt-6">
            <DataTable columns={columns} data={orders} />
          </div>
        )}
      </div>
    </>
  )
}

export default OrdersClient

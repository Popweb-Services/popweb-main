"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Plus } from "lucide-react"
import { BsFillBoxFill } from "react-icons/bs"
import { Balancer } from "react-wrap-balancer"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { DataTable } from "@/app/(dashboard)/dashboard/[storeId]/products/components/data-table"

import { ProductColumn, columns } from "./columns"

interface ProductsClientProps {
  products: ProductColumn[]
}

const ProductsClient: React.FC<ProductsClientProps> = ({ products }) => {
  const pathname = usePathname()

  return (
    <>
      <div className="container mx-auto pt-24">
        <div dir="rtl" className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">محصولات</h1>
          {products.length !== 0 && (
            <Link
              href={`${pathname}/create`}
              className={cn(
                buttonVariants({ variant: "default" }),
                "w-[200px] py-2 px-3 bg-primaryPurple rounded-lg hover:bg-primaryPurple/90 gap-x-2"
              )}
            >
              محصول جدید
              <Plus size={20} />
            </Link>
          )}
        </div>
        <Separator className="mt-4" />
        {products.length === 0 ? (
          <div className="w-full pt-40 flex justify-center items-center">
            <div
              dir="rtl"
              className="flex flex-col space-y-4 w-full md:w-[400px]"
            >
              <div className="aspect-square w-12  h-12 flex items-center justify-center bg-secondary rounded-lg">
                <BsFillBoxFill size={30} className="text-[#87909F]" />
              </div>
              <h2 className="text-lg font-bold">
                فروشگاه شما هیچ محصولی ندارد
              </h2>
              <p className="text-text">
                <Balancer>
                  برای محصولات خود قیمت ، گونه و... تعریف کنید تا مشتریان شما به
                  راحتی محصول موردنظرشان را پیددا کنند.
                </Balancer>
              </p>
              <Link
                href={`${pathname}/create`}
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "w-[200px] py-2 px-3 bg-primaryPurple rounded-lg hover:bg-primaryPurple/90 gap-x-2"
                )}
              >
                اظافه کردن محصول
                <Plus size={20} />
              </Link>
            </div>
          </div>
        ) : (
          <div className="w-full mt-6">
            <DataTable columns={columns} data={products} />
          </div>
        )}
      </div>
    </>
  )
}

export default ProductsClient

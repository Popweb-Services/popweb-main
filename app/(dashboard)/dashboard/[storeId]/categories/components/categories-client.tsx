"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Plus } from "lucide-react"
import { BiSolidCategory } from "react-icons/bi"
import { Balancer } from "react-wrap-balancer"

import { cn } from "@/lib/utils"
import {  buttonVariants } from "@/components/ui/button"
import { DataTable } from "@/app/(dashboard)/dashboard/[storeId]/categories/components/data-table"
import { Separator } from "@/components/ui/separator"

import { CategoryColumn, columns } from "./columns"

interface CategoriesClientProps {
  categories: CategoryColumn[]
}

const CategoriesClient: React.FC<CategoriesClientProps> = ({ categories }) => {
  const pathname = usePathname()

  return (
    <>
      <div className="container mx-auto pt-24">
        <div dir="rtl" className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">دسته بندی</h1>
          {categories.length !== 0 && (
            <Link
              href={`${pathname}/create`}
              className={cn(
                buttonVariants({ variant: "default" }),
                "w-[200px] py-2 px-3 bg-primaryPurple rounded-lg hover:bg-primaryPurple/90 gap-x-2"
              )}
            >
              دسته بندی جدید
              <Plus size={20} />
            </Link>
          )}
        </div>
        <Separator className="mt-4" />
        {categories.length === 0 ? (
          <div className="w-full pt-40 flex justify-center items-center">
            <div
              dir="rtl"
              className="flex flex-col space-y-4 w-full md:w-[400px]"
            >
              <div className="aspect-square w-12  h-12 flex items-center justify-center bg-secondary rounded-lg">
                <BiSolidCategory size={30} className="text-[#87909F]" />
              </div>
              <h2 className="text-lg font-bold">
                فروشگاه شما هیچ دسته بندی ای ندارد
              </h2>
              <p className="text-text">
                <Balancer>
                  برای محصولات خود دسته بندی و زیر دسته بندی بسازید تا مشتریان
                  شما راحت تر کالای مورد نظرشان را پیدا کنند.
                </Balancer>
              </p>
              <Link
                href={`${pathname}/create`}
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "w-[200px] py-2 px-3 bg-primaryPurple rounded-lg hover:bg-primaryPurple/90 gap-x-2"
                )}
              >
                ایجاد دسته بندی
                <Plus size={20} />
              </Link>
            </div>
          </div>
        ) : (
          <div className="w-full mt-6">
            <DataTable columns={columns} data={categories} />
          </div>
        )}
      </div>
    </>
  )
}

export default CategoriesClient

import Image from "next/image"
import { Category } from "@prisma/client"

import { BannerType } from "@/types/banner-type"

import CellAction from "./cell-action"

export type CategoryColumn = {
  id: string
  name: string
  parentCategory?: string
  createdAt: string
  isArchived: boolean
  banner?: BannerType | null
  subCategories: Category[]
}

export const columns: any[] = [
  {
    accessorKey: "name",
    header: "نام",
    cell: ({ row }: { row: any }) => (
      <div dir="rtl" className="flex items-center gap-x-2">
        <p>{row.original.name}</p>
        {row.original.isArchived && (
          <div className="p-[3px] text-xs rounded-md bg-[#EBEEF1]">آرشیو</div>
        )}
      </div>
    ),
  },
  {
    accessorKey: "parent",
    header: "دسته بندی پدر",
    cell: ({ row }: { row: any }) => (
      <div dir="rtl" className="">
        {row.original.parentCategory ?? "بدون دسته بندی پدر"}
      </div>
    ),
  },
  {
    accessorKey: "banner",
    header: "بنر",
    cell: ({ row }: { row: any }) => (
      <div dir="rtl" className="flex items-center gap-x-2">
        {row.original.banner ? (
          <>
            <div className="w-[40px] relative aspect-[1.5] border rounded-md">
              <Image
                src={row.original.banner?.imageUrl}
                alt="تصویر بنر"
                fill
                className="object-cover"
              />
            </div>
            <p>{row.original.banner.name}</p>
          </>
        ) : (
          <p>بدون بنر</p>
        )}
      </div>
    ),
  },
  { accessorKey: "createdAt", header: "تاریخ ایجاد" },
  { id: "actions", cell: ({ row }: { row: any }) => <CellAction category={row.original} /> },
]

import Image from "next/image"
import { ColumnDef } from "@tanstack/react-table"

import CellAction from "./cell-action"

export type BannerColumn = {
  id: string
  name: string
  imageUrl: string
  createdAt: string
  isArchived: boolean
}

export const columns: ColumnDef<BannerColumn>[] = [
  {
    accessorKey: "imageUrl",
    header: "بنر",
    cell: ({ row }) => (
      <div dir="rtl" className="flex items-center">
        <div className="relative w-10 h-10 border rounded-md">
          <Image
            alt="تصویر بنر"
            src={row.original.imageUrl}
            fill  
            className="object-contain object-center "
          />
        </div>
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: "نام",
    cell: ({ row }) => (
      <div dir="rtl" className="flex items-center gap-x-2">
        <p>{row.original.name}</p>
        {row.original.isArchived && (
          <div className="p-[3px] text-xs rounded-md bg-[#EBEEF1]">آرشیو</div>
        )}
      </div>
    ),
  },

  { accessorKey: "createdAt", header: "تاریخ ایجاد" },
  { id: "actions", cell: ({ row }) => <CellAction banner={row.original} /> },
]

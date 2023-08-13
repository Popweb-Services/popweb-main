import { Category } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"

import CellAction from "./cell-action"

export type CategoryColumn = {
  id: string
  name: string
  parentCategory?: string
  createdAt: string
  isArchived: boolean
  subCategories: Category[]
}

export const columns: ColumnDef<CategoryColumn>[] = [
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
  {
    accessorKey: "parent",
    header: "دسته بندی پدر",
    cell: ({ row }) => (
      <div dir="rtl" className="">
        {row.original.parentCategory ?? "بدون دسته بندی پدر"}
      </div>
    ),
  },
  { accessorKey: "createdAt", header: "تاریخ ایجاد" },
  { id: "actions", cell: ({ row }) => <CellAction category={row.original} /> },
]

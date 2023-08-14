import { Category } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"

import CellAction from "./cell-action"

export type ShippingRateColumn = {
  id: string
  name: string
  description?: string | null
  price: number
  minPrice?: number | null
  createdAt: string
  isArchived: boolean
}

export const columns: ColumnDef<ShippingRateColumn>[] = [
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
    accessorKey: "description",
    header: "توضیحات",
    cell: ({ row }) => (
      <div dir="rtl">{row.original.description ?? "بدون توضیحات"}</div>
    ),
  },
  {
    accessorKey: "price",
    header: "هزینه ارسال",
    cell: ({ row }) => (
      <div dir="rtl" className="flex items-center gap-x-2">
        {row.original.price}
        <p>تومان</p>
      </div>
    ),
  },
  {
    accessorKey: "minPrice",
    header: "حداقل خرید",
    cell: ({ row }) => (
      <div dir="rtl" className="flex items-center gap-x-2">
        {row.original.minPrice ?? "بدون حداقل خرید"}
        <p>{row.original.minPrice && "تومان"}</p>
      </div>
    ),
  },
  { accessorKey: "createdAt", header: "تاریخ ایجاد" },
  {
    id: "actions",
    cell: ({ row }) => <CellAction shippingRate={row.original} />,
  },
]

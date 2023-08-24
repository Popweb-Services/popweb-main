import Image from "next/image"
import { Variant } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"

import CellAction from "./cell-action"

export type ProductColumn = {
  id: string
  name: string
  description?: any | null
  price: number | null
  quantity: number
  varinats: Variant[]
  mainImageUrl: string
  createdAt: string
  isArchived: boolean
}

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "imageUrl",
    header: "عکس",
    cell: ({ row }) => (
      <div dir="rtl" className="flex items-center">
        <div className="relative w-10 h-10 border rounded-md">
          <Image
            alt="تصویر محصول"
            src={row.original.mainImageUrl}
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
  {
    accessorKey: "quantity",
    header: "تعداد",
    cell: ({ row }) => {
      const totalQuantity = row.original.varinats.reduce((total, item) => {
        return total + Number(item.quantity)
      }, 0)
      return (
        <div className="">
          {row.original.varinats.length === 0 ? (
            <p>{row.original.quantity}</p>
          ) : (
            <div className="flex items-center gap-x-2">
              <p>{totalQuantity}</p>
              <p>در</p>
              <p>{row.original.varinats.length}</p>
              <p>گونه</p>
            </div>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: "price",
    header: "قیمت",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {row.original.price === 0 ? (
          <p>رایگان</p>
        ) : (
          <>
            <p>{row.original.price}</p>
            <p>تومان</p>
          </>
        )}
      </div>
    ),
  },

  { accessorKey: "createdAt", header: "تاریخ ایجاد" },
  { id: "actions", cell: ({ row }) => <CellAction product={row.original} /> },
]

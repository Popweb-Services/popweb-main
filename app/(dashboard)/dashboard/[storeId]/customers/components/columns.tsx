import Link from "next/link"
import { Category } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"

import OrdersSellAction from "./orders-cell-action"
import OrdersCellAction from "./orders-cell-action"

export type CustomerColumn = {
  id: string
  name: string | null
  phone: string
}

export const columns: ColumnDef<CustomerColumn>[] = [
  {
    accessorKey: "name",
    header: "نام",
    cell: ({ row }) => (
      <div className="">
        {row.original.name ? row.original.name : "بدون نام"}
      </div>
    ),
  },
  {
    accessorKey: "description",
    header: "شماره تلفن",
    cell: ({ row }) => <div dir="rtl">{row.original.phone}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => <OrdersCellAction customerId={row.original.id} />,
  },
]

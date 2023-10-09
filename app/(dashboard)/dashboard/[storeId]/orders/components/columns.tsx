import Link from "next/link"
import { Category } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"

import OrdersSellAction from "./orders-cell-action"
import OrdersCellAction from "./orders-cell-action"

export type OrderColumn = {
  id: string
  customerName: string | null
  customerPhone: string
  createdAt: string
  isPaid: boolean
  hasSent: boolean
}

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "customerName",
    header: "مشتری",
    cell: ({ row }) => <div className="">{row.original.customerName}</div>,
  },
  {
    accessorKey: "customerPhone",
    header: "شماره تلفن مشتری",
    cell: ({ row }) => <div dir="rtl">{row.original.customerPhone}</div>,
  },
  {
    accessorKey: "createdAt",
    header: "تاریخ ثبت سفارش",
    cell: ({ row }) => <div dir="rtl">{row.original.createdAt}</div>,
  },
  {
    accessorKey: "isPaid",
    header: "وضعیت پرداخت",
    cell: ({ row }) => (
      <div className="">
        {row.original.isPaid ? (
          <div className="p-1 w-[100px] flex items-center justify-center bg-emerald-100 rounded-full text-emerald-500">
            پرداخت شده
          </div>
        ) : (
          <div className="p-1 w-[100px] flex items-center justify-center bg-rose-100 rounded-full text-rose-500">
            پرداخت نشده
          </div>
        )}
      </div>
    ),
  },
  {
    accessorKey: "hasSent",
    header: "وضعیت ارسال",
    cell: ({ row }) => (
      <div className="">
        {row.original.isPaid ? (
          <div className="p-1 w-[100px] flex items-center justify-center bg-emerald-100 rounded-full text-emerald-500">
            ارسال شده
          </div>
        ) : (
          <div className="p-1 w-[100px] flex items-center justify-center bg-rose-100 rounded-full text-rose-500">
            ارسال نشده
          </div>
        )}
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <OrdersCellAction customerId={row.original.id} />,
  },
]

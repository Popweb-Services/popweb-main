import Link from "next/link"
import { Separator } from "@radix-ui/react-separator"

import prismadb from "@/lib/prismadb"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

import { OrderColumn } from "./components/columns"
import CategoriesClient from "./components/orders-client"

interface OrdersPageProps {
  params: {
    storeId: string
  }
}

const OrdersPage = async ({ params }: OrdersPageProps) => {
  const orders = await prismadb.order.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      customer: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  const formattedOrders: OrderColumn[] = orders.map((order) => ({
    id: order.id,
    createdAt: order.createdAt.toLocaleString("fa-IR"),
    customerName: order.customer.name,
    customerPhone: order.customer.phone,
    isPaid: order.isPaid,
    hasSent: order.hasSent,
  }))
  return (
    <>
      <CategoriesClient orders={formattedOrders} />
    </>
  )
}

export default OrdersPage

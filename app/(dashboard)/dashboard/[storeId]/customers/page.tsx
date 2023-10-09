import Link from "next/link"
import { Separator } from "@radix-ui/react-separator"

import prismadb from "@/lib/prismadb"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

import { CustomerColumn } from "./components/columns"
import CategoriesClient from "./components/customers-client"

interface CustomersPageProps {
  params: {
    storeId: string
  }
}

const CustomersPage = async ({ params }: CustomersPageProps) => {
  const customers = await prismadb.customer.findMany({
    where: {
      storeId: params.storeId,
    },
  })

  const formattedCustomers: CustomerColumn[] = customers.map((customer) => ({
    id: customer.id,
    name: customer.name,
    phone: customer.phone,
  }))
  return (
    <>
      <CategoriesClient customers={formattedCustomers} />
    </>
  )
}

export default CustomersPage

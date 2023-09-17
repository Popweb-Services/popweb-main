import Link from "next/link"
import { Separator } from "@radix-ui/react-separator"

import prismadb from "@/lib/prismadb"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

import { ShippingRateColumn } from "./components/columns"
import CategoriesClient from "./components/shipping-rates-client"

interface ShippingRatesPageProps {
  params: {
    storeId: string
  }
}

const ShippingRatesPage = async ({ params } : ShippingRatesPageProps) => {
  const shippingRates = await prismadb.shippingRate.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  const formattedShippingRates: ShippingRateColumn[] = shippingRates.map(
    (shippingRate) => ({
      id: shippingRate.id,
      name: shippingRate.name,
      description: shippingRate.description,
      price: shippingRate.price,
      minPrice: shippingRate.minPrice,
      createdAt: shippingRate.createdAt.toLocaleString("fa-IR"),
      isArchived: shippingRate.isArchived,
    })
  )
  return (
    <>
      <CategoriesClient shippingRates={formattedShippingRates} />
    </>
  )
}

export default ShippingRatesPage

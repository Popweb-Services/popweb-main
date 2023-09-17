import { notFound } from "next/navigation"

import prismadb from "@/lib/prismadb"
import { Separator } from "@/components/ui/separator"

import CreateCategoryForm from "../components/create-shipping-rate-form"

interface CreateShippingRatePageProps {
  params: {
    storeId: string
    shippingRateId: string
  }
}

const CreateShippingRatePage = async ({
  params,
}:CreateShippingRatePageProps) => {
  let shippingRate
  try {
    shippingRate = await prismadb.shippingRate.findUnique({
      where: {
        id: params.shippingRateId,
      },
    })
  } catch (error) {
    shippingRate = undefined
  }
  return (
    <>
      <CreateCategoryForm
        storeId={params.storeId}
        shippingRate={shippingRate}
      />
    </>
  )
}

export default CreateShippingRatePage

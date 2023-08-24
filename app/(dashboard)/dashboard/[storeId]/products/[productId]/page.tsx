import { notFound } from "next/navigation"

import prismadb from "@/lib/prismadb"
import { Separator } from "@/components/ui/separator"

import CreateProductForm from "../components/create-product-form"

interface CreateCategoryPageProps {
  params: {
    storeId: string
    productId: string
  }
}

const CreateCategoryPage: React.FC<CreateCategoryPageProps> = async ({
  params,
}) => {
  let product
  try {
    product = await prismadb.product.findUnique({
      where: {
        id: params.productId,
      },
      include: {
        images: true,
        options: true,
        variants: true,
      },
    })
  } catch (error) {
    product = undefined
  }
  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    },
  })
  return (
    <>
      <CreateProductForm
        categories={categories}
        storeId={params.storeId}
        product={product}
      />
    </>
  )
}

export default CreateCategoryPage

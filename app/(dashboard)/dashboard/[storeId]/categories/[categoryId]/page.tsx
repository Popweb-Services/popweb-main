import { notFound } from "next/navigation"

import prismadb from "@/lib/prismadb"
import { Separator } from "@/components/ui/separator"

import CreateCategoryForm from "../components/create-category-form"

interface CreateCategoryPageProps {
  params: {
    storeId: string
    categoryId: string
  }
}

const CreateCategoryPage: React.FC<CreateCategoryPageProps> = async ({
  params,
}) => {
  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    },
  })
  let category
  try {
    category = await prismadb.category.findUnique({
      where: {
        id: params.categoryId,
      },
    })
  } catch (error) {
    category = undefined
  }
  return (
    <>
      <CreateCategoryForm
        storeId={params.storeId}
        categories={categories}
        category={category}
      />
    </>
  )
}

export default CreateCategoryPage

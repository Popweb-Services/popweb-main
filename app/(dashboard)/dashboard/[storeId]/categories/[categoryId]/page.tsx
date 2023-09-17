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

const CreateCategoryPage = async ({
  params,
}:CreateCategoryPageProps) => {
  const banners = await prismadb.banner.findMany({
    where: {
      storeId: params.storeId,
    },
  })
  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: { createdAt: "desc" },
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
        banners={banners}
      />
    </>
  )
}

export default CreateCategoryPage

import Link from "next/link"
import { Separator } from "@radix-ui/react-separator"

import prismadb from "@/lib/prismadb"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

import CategoriesClient from "./components/categories-client"
import { CategoryColumn } from "./components/columns"

interface CategoriesPageProps {
  params: {
    storeId: string
  }
}

const CategoriesPage = async ({ params }:CategoriesPageProps) => {
  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      parentCategory: true,
      subcategories: true,
      banner: true,
    },
  })

  const formattedCategories: CategoryColumn[] = categories.map((category) => ({
    id: category.id,
    name: category.name,
    parentCategory: category.parentCategory?.name,
    createdAt: category.createdAt.toLocaleString("fa-IR"),
    isArchived: category.isArchived,
    subCategories: category.subcategories,
    banner: category.banner,
  }))
  return (
    <>
      <CategoriesClient categories={formattedCategories} />
    </>
  )
}

export default CategoriesPage

import Link from "next/link"
import { Separator } from "@radix-ui/react-separator"

import prismadb from "@/lib/prismadb"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

import { ProductColumn } from "./components/columns"
import CategoriesClient from "./components/products-client"

interface ProductsPageProps {
  params: {
    storeId: string
  }
}

const ProductsPage: React.FC<ProductsPageProps> = async ({ params }) => {
  const products = await prismadb.product.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      variants: true,
    },
  })

  const formattedProducts: ProductColumn[] = products.map((product) => ({
    id: product.id,
    name: product.name,
    mainImageUrl: product.mainImageUrl,
    description: product.description,
    price: product.price,
    quantity: product.quantity,
    createdAt: product.createdAt.toLocaleString("fa-IR"),
    isArchived: product.isArchived,
    varinats: product.variants,
  }))
  return (
    <>
      <CategoriesClient products={formattedProducts} />
    </>
  )
}

export default ProductsPage

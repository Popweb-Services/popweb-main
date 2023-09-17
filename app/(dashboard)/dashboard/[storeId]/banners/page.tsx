import Link from "next/link"
import { Separator } from "@radix-ui/react-separator"

import prismadb from "@/lib/prismadb"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

import CategoriesClient from "./components/banners-client"
import { BannerColumn } from "./components/columns"

interface CategoriesPageProps {
  params: {
    storeId: string
  }
}

const CategoriesPage = async ({ params }:CategoriesPageProps) => {
  const banners = await prismadb.banner.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  const formattedBanners: BannerColumn[] = banners.map((banner:any) => ({
    id: banner.id,
    name: banner.name,
    imageUrl: banner.imageUrl,
    createdAt: banner.createdAt.toLocaleString("fa-IR"),
    isArchived: banner.isArchived,
  }))
  return (
    <>
      <CategoriesClient banners={formattedBanners} />
    </>
  )
}

export default CategoriesPage

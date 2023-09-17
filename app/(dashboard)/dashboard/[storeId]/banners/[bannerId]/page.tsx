import { notFound } from "next/navigation"

import prismadb from "@/lib/prismadb"
import { Separator } from "@/components/ui/separator"

import CreateCategoryForm from "../components/create-banner-form"

interface CreateBannerPageProps {
  params: {
    storeId: string
    bannerId: string
  }
}

const CreateBannerPage = async ({ params }: CreateBannerPageProps) => {
  let banner
  try {
    banner = await prismadb.banner.findUnique({
      where: {
        id: params.bannerId,
      },
    })
  } catch (error) {
    banner = undefined
  }
  return (
    <>
      {/* @ts-ignore */}
      <CreateCategoryForm storeId={params.storeId} banner={banner} />
    </>
  )
}

export default CreateBannerPage

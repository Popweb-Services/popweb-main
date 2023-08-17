import { notFound } from "next/navigation"

import prismadb from "@/lib/prismadb"
import { Separator } from "@/components/ui/separator"

import CreateCategoryForm from "../components/create-banner-form"

interface CreateCategoryPageProps {
  params: {
    storeId: string
    bannerId: string
  }
}

const CreateCategoryPage: React.FC<CreateCategoryPageProps> = async ({
  params,
}) => {
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
      <CreateCategoryForm
        storeId={params.storeId}
        banner={banner}
      />
    </>
  )
}

export default CreateCategoryPage

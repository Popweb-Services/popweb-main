import { Store } from "@prisma/client"

import prismadb from "@/lib/prismadb"
import { Separator } from "@/components/ui/separator"
import GeneralSettingsForm from "@/components/general-settings-form"

interface MainSettingsPageProps {
  params: {
    storeId: string
  }
}

const MainSettingsPage = async ({
  params,
}:MainSettingsPageProps) => {
  const store = await prismadb.store.findUnique({
    where: {
      id: params.storeId,
    },
  })
  const banners = await prismadb.banner.findMany({
    where: {
      storeId: params.storeId,
    },
  })
  return (
    <>
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">تنظیمات ظاهری</h2>
        <p className="text-text">
          تنظیمات مربوط به ظاهر فروشگاهتان را از اینجا تغییر دهید.
        </p>
        <Separator />
        <GeneralSettingsForm banners={banners} store={store} />
      </div>
    </>
  )
}

export default MainSettingsPage

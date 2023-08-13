import { ReactNode } from "react"
import { notFound, redirect } from "next/navigation"

import prismadb from "@/lib/prismadb"

interface IndividualStoreLayoutProps {
  children: ReactNode
  params: {
    storeId: string
  }
}

const IndividualStoreLayout: React.FC<IndividualStoreLayoutProps> = async ({
  params,
  children,
}) => {
  try {
    const store = await prismadb.store.findUnique({
      where: { id: params.storeId },
    })
    return (
      <>
        {store?.isTest && (
          <>
            <span className="w-full h-[0.5px] fixed z-0 top-12 bg-[#ED6704]" />
            <div className="fixed p-1 top-12 text-white scale-75 origin-top rounded-b-lg left-1/2 -translate-x-1/2 bg-[#ED6704] ">
              نسخه آزمایشی
            </div>
          </>
        )}
        {children}
      </>
    )
  } catch (error) {
    return notFound()
  }
}

export default IndividualStoreLayout

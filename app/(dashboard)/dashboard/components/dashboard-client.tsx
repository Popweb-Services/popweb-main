"use client"

import useCreateStoreModal from "@/hooks/use-create-store-modal"
import { Button } from "@/components/ui/button"

interface DashboardClientProps {}

const DashboardClient: React.FC<DashboardClientProps> = ({}) => {
  const createStoreModal = useCreateStoreModal()
  return (
    <>
      <div
        dir="rtl"
        className="flex flex-col space-y-6 w-full items-center pt-28"
      >
        <h1 className="text-3xl font-bold text-primarySlate">
          فقط چند قدم تا راه اندازی فروشگاه آنلاینتان مانده است.
        </h1>
        <p className="text-text text-lg">
          اولین فروشگاه خود را به صورت رایگان و آزمایشی راه اندازی کنید و از
          تمامی قابلیت های پاپ وب بهره مند شوید.
        </p>
        <Button
          onClick={createStoreModal.onOpen}
          className="bg-primaryPurple hover:bg-primaryPurple/90 px-6 rounded-lg"
        >
          راه اندازی فروشگاه آنلاین
        </Button>
      </div>
    </>
  )
}

export default DashboardClient

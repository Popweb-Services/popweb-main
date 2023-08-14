"use client"

import { useParams, usePathname, useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { MoreHorizontal } from "lucide-react"

import useShippingRateArchiveAlertModal from "@/hooks/use-shipping-rate-archive-alert-modal"
import useShippingRateDeleteAlertModal from "@/hooks/use-shipping-rate-delete-alert-modal"
import { useToast } from "@/hooks/use-toast"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

import { ShippingRateColumn } from "./columns"

interface CellActionProps {
  shippingRate: ShippingRateColumn
}

const CellAction: React.FC<CellActionProps> = ({ shippingRate }) => {
  const { toast } = useToast()
  const params = useParams()
  const pathname = usePathname()
  const router = useRouter()
  const shippingRateArchiveAlertModal = useShippingRateArchiveAlertModal()
  const shippingRateDeleteAlertModal = useShippingRateDeleteAlertModal()
  const { mutate: archiveShippingRate, isLoading } = useMutation({
    mutationFn: async () => {
      await axios.patch(
        `/api/${params.storeId}/shipping-rate/${shippingRate.id}/archive`
      )
    },
    onError: () => {
      toast({
        title: "خطای سیستمی",
        description: "لطفا بعدا تلاش کنید و یا با پشتیبانی تماس بگیرید",
        variant: "destructive",
      })
    },
    onSuccess: () => {
      toast({
        description: "نحوه ارسال با موفقیت از آرشیو خارج شد.",
      })
      router.refresh()
    },
  })
  return (
    <>
      <DropdownMenu dir="rtl">
        <DropdownMenuTrigger>
          <MoreHorizontal />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            disabled={shippingRate.isArchived}
            onClick={() => router.push(`${pathname}/${shippingRate.id}`)}
            className="cursor-pointer text-primaryPurple"
          >
            ویرایش نحوه ارسال
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              if (shippingRate.isArchived) {
                archiveShippingRate()
              } else {
                shippingRateArchiveAlertModal.onOpen(shippingRate.id)
              }
            }}
            className="cursor-pointer text-primaryPurple"
          >
            {shippingRate.isArchived ? "خارج کردن از آرشیو" : "آرشیو کردن"}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              shippingRateDeleteAlertModal.onOpen(shippingRate.id)
            }}
            className="cursor-pointer"
          >
            حذف نحوه ارسال
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default CellAction

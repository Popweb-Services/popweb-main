"use client"

import { useParams, useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { Balancer } from "react-wrap-balancer"

import useShippingRateArchiveAlertModal from "@/hooks/use-shipping-rate-archive-alert-modal"
import { useToast } from "@/hooks/use-toast"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog"
import { Separator } from "../ui/separator"

interface ShippingRateArchiveAlertModalProps {}

type IParams = {
  storeId: string
}

const ShippingRateArchiveAlertModal: React.FC<
  ShippingRateArchiveAlertModalProps
> = ({}) => {
  const { toast } = useToast()
  const params = useParams() as IParams
  const router = useRouter()
  const { mutate: archiveShippingRate, isLoading } = useMutation({
    mutationFn: async () => {
      await axios.patch(
        `/api/${params.storeId}/shipping-rates/${shippingRateId}/archive`
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
        title: "آرشیو نحوه ارسال",
        description: "نحوه ارسال با موفقیت آرشیو شد",
      })
      router.refresh()
    },
  })
  const { isOpen, onClose, shippingRateId } = useShippingRateArchiveAlertModal()
  const onOpenChange = (open: boolean) => {
    if (!open) {
      onClose()
    }
  }
  return (
    <>
      <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
        <AlertDialogContent dir="rtl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-right">
              آرشیو نحوه ارسال
            </AlertDialogTitle>
            <Separator />
            <AlertDialogDescription className="text-right text-lg py-4">
              <Balancer>
                با آرشیو این نحوه ارسال مشتریان شما قادر به انتخاب این نحوه
                ارسال هنگام پرداخت نخواهند بود ، آیا از آرشیو این نحوه ارسال
                اطمینان دارید ؟
              </Balancer>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Separator />
          <AlertDialogFooter className="flex items-center gap-x-2">
            <AlertDialogCancel disabled={isLoading} className="rounded-lg">
              لغو
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={isLoading}
              onClick={() => archiveShippingRate()}
              className="rounded-lg bg-primaryPurple hover:bg-primaryPurple/90"
            >
              آرشیو
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default ShippingRateArchiveAlertModal

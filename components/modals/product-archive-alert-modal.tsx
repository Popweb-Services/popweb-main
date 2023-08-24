"use client"

import { useParams, useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { Balancer } from "react-wrap-balancer"

import useProductArchiveAlertModal from "@/hooks/use-shipping-rate-archive-alert-modal"
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

interface ProductArchiveAlertModalProps {
  isOpen: boolean
  onClose: () => void
  productId: string
}

type IParams = {
  storeId: string
}

const ProductArchiveAlertModal: React.FC<ProductArchiveAlertModalProps> = ({
  productId,
  isOpen,
  onClose,
}) => {
  const { toast } = useToast()
  const params = useParams() as IParams
  const router = useRouter()
  const { mutate: archiveProduct, isLoading } = useMutation({
    mutationFn: async () => {
      await axios.patch(`/api/${params.storeId}/products/${productId}/archive`)
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
        title: "آرشیو محصول",
        description: "محصول با موفقیت آرشیو شد",
      })
      router.refresh()
    },
  })
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
              آرشیو محصول
            </AlertDialogTitle>
            <Separator />
            <AlertDialogDescription className="text-right text-lg py-4">
              <Balancer>
                با آرشیو این محصول ، مشتریان شما دیگر قادر به سفارش این محصول
                نخواهند بود ، آیا از انجام این کار اطمینان دارید ؟
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
              onClick={() => archiveProduct()}
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

export default ProductArchiveAlertModal

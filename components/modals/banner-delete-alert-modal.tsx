"use client"

import { useParams, useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { Balancer } from "react-wrap-balancer"

import { cn } from "@/lib/utils"
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
import { buttonVariants } from "../ui/button"
import { Separator } from "../ui/separator"

interface BannerDeleteAlertModalProps {
  isOpen: boolean
  onClose: () => void
  bannerId: string
  bannerUrl: string
}

type IParams = {
  storeId: string
}

const BannerDeleteAlertModal: React.FC<BannerDeleteAlertModalProps> = ({
  bannerUrl,
  isOpen,
  bannerId,
  onClose,
}) => {
  const { toast } = useToast()
  const params = useParams() as IParams
  const router = useRouter()
  const { mutate: deleteFile, isLoading: isDeletingFile } = useMutation({
    mutationFn: async (imageUrl: string) => {
      const splittedImageUrl = imageUrl.split("/")
      const fileKey = splittedImageUrl[splittedImageUrl.length - 1]
      await axios.delete(`/api/${params.storeId}/upload-image/${fileKey}`)
    },
  })
  const { mutate: deleteFileFromDB, isLoading } = useMutation({
    mutationFn: async () => {
      await axios.delete(`/api/${params.storeId}/banners/${bannerId}/`)
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
        title: "حذف بنر",
        description: "بنر با موفقیت خذف شد",
      })
      router.push(`/dashboard/${params.storeId}/banners`)
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
            <AlertDialogTitle className="text-right">حذف بنر</AlertDialogTitle>
            <Separator />
            <AlertDialogDescription className="text-right text-lg py-4">
              <Balancer>
                با حذف این بنر دیگر امکان بازگشت وجود ندارد ، آیا از انجام این
                کار اطمینان دارید ؟
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
              onClick={() => {
                deleteFileFromDB()
                deleteFile(bannerUrl)
              }}
              className={cn(
                buttonVariants({ variant: "destructive" }),
                "rounded-lg"
              )}
            >
              حذف
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default BannerDeleteAlertModal

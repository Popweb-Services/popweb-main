"use client"

import { useParams, useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { Balancer } from "react-wrap-balancer"

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
} from "./ui/alert-dialog"
import { Separator } from "./ui/separator"
import useCategoryArchiveAlertModal from "@/hooks/use-category-archive-alert-modal"

interface CategoryArchiveAlertModalProps {}

type IParams = {
  storeId: string
}

const CategoryArchiveAlertModal: React.FC<
  CategoryArchiveAlertModalProps
> = ({}) => {
  const { toast } = useToast()
  const params = useParams() as IParams
  const router = useRouter()
  const { mutate: archiveCategory, isLoading } = useMutation({
    mutationFn: async () => {
      await axios.patch(
        `/api/${params.storeId}/categories/${categoryId}/archive`
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
        title: "آرشیو دسته بندی",
        description: "دسته بندی با موفقیت آرشیو شد",
      })
      router.refresh()
    },
  })
  const { isOpen, onClose, onOpen, categoryId } = useCategoryArchiveAlertModal()
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
              آرشیو دسته بندی
            </AlertDialogTitle>
            <Separator />
            <AlertDialogDescription className="text-right text-lg py-4">
              <Balancer>
                آرشیو این دسته بندی باعث می شود مشتریان شما این دسته بندی و
                همچنین تمام زیر دسته بندی ها را مشاهده نکنند ، آیا از آرشیو این
                دسته بندی اطمینان دارید ؟
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
              onClick={() => archiveCategory()}
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

export default CategoryArchiveAlertModal

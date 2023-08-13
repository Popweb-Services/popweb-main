"use client"

import { useParams, useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { Balancer } from "react-wrap-balancer"

import { cn } from "@/lib/utils"
import useCategoryDeleteAlertModal from "@/hooks/use-category-delete-alert-modal"
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
import { buttonVariants } from "./ui/button"
import { Separator } from "./ui/separator"

interface CategoryDeleteAlertModalProps {}

type IParams = {
  storeId: string
}

const CategoryDeleteAlertModal: React.FC<
  CategoryDeleteAlertModalProps
> = ({}) => {
  const { toast } = useToast()
  const params = useParams() as IParams
  const router = useRouter()
  const { mutate: deleteCategory, isLoading } = useMutation({
    mutationFn: async () => {
      await axios.delete(`/api/${params.storeId}/categories/${categoryId}/`)
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
        title: "حذف دسته بندی",
        description: "دسته بندی با موفقیت خذف شد",
      })
      router.push(`/dashboard/${params.storeId}/categories`)
      router.refresh()
    },
  })
  const { isOpen, onClose, onOpen, categoryId } = useCategoryDeleteAlertModal()
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
              حذف دسته بندی
            </AlertDialogTitle>
            <Separator />
            <AlertDialogDescription className="text-right text-lg py-4">
              <Balancer>
                با حذف این دسته بندی دیگر امکان بازگشت وجود ندارد ، آیا از انجام
                این کار اطمینان دارید ؟
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
              onClick={() => deleteCategory()}
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

export default CategoryDeleteAlertModal

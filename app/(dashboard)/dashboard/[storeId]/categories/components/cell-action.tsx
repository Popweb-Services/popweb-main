"use client"

import { useParams, usePathname, useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { MoreHorizontal } from "lucide-react"

import useCategoryArchiveAlertModal from "@/hooks/use-category-archive-alert-modal"
import useCategoryDeleteAlertModal from "@/hooks/use-category-delete-alert-modal"
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

import { CategoryColumn } from "./columns"

interface CellActionProps {
  category: CategoryColumn
}

const CellAction: React.FC<CellActionProps> = ({ category }) => {
  const { toast } = useToast()
  const params = useParams()
  const pathname = usePathname()
  const router = useRouter()
  const categoryDeleteAlertModal = useCategoryDeleteAlertModal()
  const categoryArchiveAlertModal = useCategoryArchiveAlertModal()
  const { mutate: archiveCategory, isLoading } = useMutation({
    mutationFn: async () => {
      await axios.patch(
        `/api/${params.storeId}/categories/${category.id}/archive`
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
        description: "دسته بندی با موفقیت از آرشیو خارج شد.",
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
            disabled={category.isArchived}
            onClick={() => router.push(`${pathname}/${category.id}`)}
            className="cursor-pointer text-primaryPurple"
          >
            ویرایش دسته بندی
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              if (category.isArchived) {
                archiveCategory()
              } else {
                categoryArchiveAlertModal.onOpen(category.id)
              }
            }}
            className="cursor-pointer text-primaryPurple"
          >
            {category.isArchived ? "خارج کردن از آرشیو" : "آرشیو کردن"}
          </DropdownMenuItem>
          {category.subCategories.length !== 0 ? (
            <HoverCard>
              <HoverCardTrigger asChild>
                <DropdownMenuItem className="cursor-not-allowed opacity-50 ">
                  حذف دسته بندی
                </DropdownMenuItem>
              </HoverCardTrigger>
              <HoverCardContent className="text-sm">
                شما نمیتوانید این دسته بندی را حذف کنید ، زیرا این دسته بندی یک
                دسته بندی پدر است و دارای زیر دسته بندی های دیگری است ، برای حذف
                این دسته بندی زیر دسته بندی ها را حذف کنید.
              </HoverCardContent>
            </HoverCard>
          ) : (
            <DropdownMenuItem
              onClick={() => {
                categoryDeleteAlertModal.onOpen(category.id)
              }}
              className="cursor-pointer"
            >
              حذف دسته بندی
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default CellAction

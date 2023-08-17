"use client"

import { useState } from "react"
import { useParams, usePathname, useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { MoreHorizontal } from "lucide-react"

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
import BannerArchiveAlertModal from "@/components/modals/banner-archive-alert-modal"
import BannerDeleteAlertModal from "@/components/modals/banner-delete-alert-modal"

import { BannerColumn } from "./columns"

interface CellActionProps {
  banner: BannerColumn
}

const CellAction: React.FC<CellActionProps> = ({ banner }) => {
  const { toast } = useToast()
  const [isArchiveOpen, setIsArchiveOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const params = useParams()
  const pathname = usePathname()
  const router = useRouter()
  const { mutate: unarchiveBanner, isLoading } = useMutation({
    mutationFn: async () => {
      await axios.patch(`/api/${params.storeId}/banners/${banner.id}/archive`)
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
        description: "بنر با موفقیت از آرشیو خارج شد.",
      })
      router.refresh()
    },
  })
  return (
    <>
      <BannerDeleteAlertModal
        bannerId={banner.id}
        isOpen={isDeleteOpen}
        bannerUrl={banner.imageUrl}
        onClose={() => {
          setIsDeleteOpen(false)
        }}
      />
      <BannerArchiveAlertModal
        bannerId={banner.id}
        isOpen={isArchiveOpen}
        onClose={() => setIsArchiveOpen(false)}
      />
      <DropdownMenu dir="rtl">
        <DropdownMenuTrigger>
          <MoreHorizontal />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            disabled={banner.isArchived}
            onClick={() => router.push(`${pathname}/${banner.id}`)}
            className="cursor-pointer text-primaryPurple"
          >
            ویرایش بنر
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              if (banner.isArchived) {
                unarchiveBanner()
              } else {
                setIsArchiveOpen(true)
              }
            }}
            className="cursor-pointer text-primaryPurple"
          >
            {banner.isArchived ? "خارج کردن از آرشیو" : "آرشیو کردن"}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setIsDeleteOpen(true)
            }}
            className="cursor-pointer"
          >
            حذف بنر
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default CellAction

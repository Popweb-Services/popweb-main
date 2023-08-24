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
import ProductArchiveAlertModal from "@/components/modals/product-archive-alert-modal"
import ProductDeleteAlertModal from "@/components/modals/product-delete-alert-modal"

import { ProductColumn } from "./columns"

interface CellActionProps {
  product: ProductColumn
}

const CellAction: React.FC<CellActionProps> = ({ product }) => {
  const { toast } = useToast()
  const [isArchiveOpen, setIsArchiveOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const params = useParams()
  const pathname = usePathname()
  const router = useRouter()
  const { mutate: unarchiveBanner, isLoading } = useMutation({
    mutationFn: async () => {
      await axios.patch(`/api/${params.storeId}/products/${product.id}/archive`)
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
      <ProductArchiveAlertModal
        isOpen={isArchiveOpen}
        onClose={() => setIsArchiveOpen(false)}
        productId={product.id}
      />
      <ProductDeleteAlertModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        productId={product.id}
      />
      <DropdownMenu dir="rtl">
        <DropdownMenuTrigger>
          <MoreHorizontal />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            disabled={product.isArchived}
            onClick={() => router.push(`${pathname}/${product.id}`)}
            className="cursor-pointer text-primaryPurple"
          >
            ویرایش محصول
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              if (product.isArchived) {
                unarchiveBanner()
              } else {
                setIsArchiveOpen(true)
              }
            }}
            className="cursor-pointer text-primaryPurple"
          >
            {product.isArchived ? "خارج کردن از آرشیو" : "آرشیو کردن"}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setIsDeleteOpen(true)
            }}
            className="cursor-pointer"
          >
            حذف محصول
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default CellAction

"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"

import { priceFormatter } from "@/lib/formatter"
import usePaymentModal from "@/hooks/use-payment-modal"
import useSelectSubscriptionModal from "@/hooks/use-select-subscription-modal"

import { Button } from "../ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"

interface SelectSubsCriptionModalProps {}

const SelectSubsCriptionModal: React.FC<
  SelectSubsCriptionModalProps
> = ({}) => {
  const { isOpen, onClose } = useSelectSubscriptionModal()
  const { onOpen, setMounths } = usePaymentModal()
  const router = useRouter()
  return (
    <>
      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          if (!open) {
            onClose()
          }
        }}
      >
        <DialogContent>
          <DialogHeader className="flex items-center justify-center flex-col gap-y-1">
            <DialogTitle className="text-center">خرید اشتراک</DialogTitle>
            <DialogDescription className="text-center text-lg">
              شما نسخه آزمایشی فروشگاه خود را استفاده کرده اید ، برای ساخت
              فروشگاه جدید لطفا اشتراک تهیه کنید.
            </DialogDescription>
          </DialogHeader>
          <Button
            onClick={() => {
              onClose()
              router.push("/dashboard/payment")
            }}
            className="w-full rounded-lg bg-primaryPurple hover:bg-primaryPurple/90"
          >
            خرید اشتراک
          </Button>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default SelectSubsCriptionModal

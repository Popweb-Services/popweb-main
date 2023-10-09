"use client"

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

interface PaymentModalProps {}

const PaymentModal: React.FC<PaymentModalProps> = ({}) => {
  const { isOpen, onClose, mounths } = usePaymentModal()
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
            <DialogTitle className="text-center">جزییات فاکتور</DialogTitle>
          </DialogHeader>
          <div dir="rtl" className="flex flex-col gap-y-2 divide-y-2">
            <div className="flex py-2 items-center justify-between">
              <p>نوع اشتراک :</p>
              <p>{mounths === 12 ? "یک ساله" : "سه ماهه"}</p>
            </div>
            <div className="flex py-2 items-center justify-between">
              <p>قیمت :</p>
              <p>
                {mounths === 12
                  ? `${priceFormatter(24000000)} تومان`
                  : "سه ماهه"}
              </p>
            </div>
            {mounths === 12 && (
              <div className="flex py-2 items-center justify-between">
                <p>تخفیف :</p>
                <p>{`${priceFormatter(4800000)} تومان`}</p>
              </div>
            )}
            <div className="flex py-2 items-center justify-between">
              <p>قابل پرداخت :</p>
              <p>{`${priceFormatter(19200000)} تومان`}</p>
            </div>
            <Button className="bg-primaryPurple rounded-lg hover:bg-primaryPurple/90 w-full">
              پرداخت
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default PaymentModal

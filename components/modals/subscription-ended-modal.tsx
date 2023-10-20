"use client"

import { useRouter } from "next/navigation"
import { AlertDialogAction } from "@radix-ui/react-alert-dialog"

import useSubscriptionModal from "@/hooks/use-subscription-ended-modal"

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog"
import { Dialog, DialogHeader } from "../ui/dialog"

interface SubscriptionEndedModalProps {}

const SubscriptionEndedModal: React.FC<SubscriptionEndedModalProps> = ({}) => {
  const { isOpen, onClose } = useSubscriptionModal()
  const router = useRouter()
  return (
    <>
      <AlertDialog open={isOpen}>
        <AlertDialogContent dir="rtl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-right">
              اتمام اشتراک
            </AlertDialogTitle>
            <AlertDialogDescription className="text-right">
              اشتراک فروشگاه شما به اتمام رسیده است ، جهت استفاده مجدد از
              امکانات فروشگاه اشتراک خود را تمدید کنید<div className=""></div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter
            dir="ltr"
            className="flex items-center mr-auto gap-x-4"
          >
            <AlertDialogAction className="bg-primaryPurple text-white py-2 px-3 rounded-xl">
              تمدید اشتراک
            </AlertDialogAction>
            <AlertDialogCancel
              onClick={() => {
                router.back()
                onClose()
              }}
            >
              بازگشت به صفحه قبل
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default SubscriptionEndedModal

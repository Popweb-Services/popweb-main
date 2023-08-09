"use client"

import Link from "next/link"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"

import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface VerifyEmailClientProps {
  userEmail: string
}

const VerifyEmailClient: React.FC<VerifyEmailClientProps> = ({ userEmail }) => {
  const { toast } = useToast()
  const { mutate: sendEmail, isLoading } = useMutation({
    mutationFn: async () => {
      await axios.post("/api/email/verify-email")
    },
    onError: () => {
      toast({
        title: "خطای سیستمی",
        description:
          "ایمیل ارسال نشد ، لطفا بعدا تلاش کنید و یا با پشتیبانی تماس بگیرید.",
        variant: "destructive",
      })
    },
    onSuccess: () => {
      toast({
        description: "ایمیل ارسال شد",
      })
    },
  })
  return (
    <>
      <Card className="py-[56px] px-[48px] rounded-md">
        <CardHeader className="space-y-8">
          <CardTitle className="text-3xl font-bold text-primarySlate">
            تایید ایمیل
          </CardTitle>
          <CardDescription className="text-lg text-text">
            لینک فعالسازی حساب کاربری به{" "}
            <span className="font-semibold">{userEmail}</span> ارسال شده است.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-x-3">
            <Button
              disabled={isLoading}
              onClick={() => sendEmail()}
              className="rounded-lg bg-primaryPurple hover:bg-primaryPurple/90"
            >
              ارسال دوباره ایمیل
            </Button>
            <Link
              href="/verify-email/change-email"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "rounded-lg"
              )}
            >
              تغییر ایمیل
            </Link>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default VerifyEmailClient

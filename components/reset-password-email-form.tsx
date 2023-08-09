"use client"

import { error } from "console"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import { signIn } from "next-auth/react"
import { FieldValues, useForm } from "react-hook-form"
import { ImSpinner8 } from "react-icons/im"
import { z } from "zod"

import {
  SignInValidator,
  SignInValidatorType,
} from "@/lib/validators/auth-validators"
import { ResetPasswordEmailValidator } from "@/lib/validators/reset-password-validators"
import { useToast } from "@/hooks/use-toast"

import { Button } from "./ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"
import { Input } from "./ui/input"

interface ResetPasswordEmailFormProps {}

const ResetPasswordEmailForm: React.FC<ResetPasswordEmailFormProps> = ({}) => {
  const { toast } = useToast()
  const router = useRouter()
  const [isEmailSent, setIsEmailSent] = useState(false)
  const { mutate: sendEmail, isLoading } = useMutation({
    mutationFn: async (
      payload: z.infer<typeof ResetPasswordEmailValidator>
    ) => {
      await axios.post("/api/email/reset-password", payload)
    },
    onSuccess: () => {
      toast({
        title: "ایمیل ارسال شد",
        description: "ایمیل حاوی لینک بازنگاری ارسال شد",
      })
      setIsEmailSent(true)
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 400) {
          return toast({
            description: "حساب کاربری ای با این ایمیل وجود ندارد",
            variant: "destructive",
          })
        } else {
          return toast({
            title: "خطای سیستمی",
            description: "لطفا بعدا تلاش کنید و یا با پشتیبانی تماس بگیرید",
            variant: "destructive",
          })
        }
      }
    },
  })
  const form = useForm<z.infer<typeof ResetPasswordEmailValidator>>({
    resolver: zodResolver(ResetPasswordEmailValidator),
    defaultValues: {
      email: "",
    },
  })
  const email = form.watch("email")
  const onSubmit = (values: z.infer<typeof ResetPasswordEmailValidator>) => {
    sendEmail(values)
  }
  if (!isEmailSent) {
    return (
      <>
        <Card className="rounded-md py-[32px] px-[20px] md:py-[56px] md:px-[48px]">
          <CardHeader className="space-y-6">
            <CardTitle className="text-2xl font-bold text-primarySlate">
              بازنگاری کلمه عبور
            </CardTitle>
            <CardDescription className="text-md text-text">
              ایمیلی که با آن حساب کاربری خود را ایجاد کرده اید وارد کنید تا
              لینک حاوی بازنگاری کلمه عبور را برای شما ارسال شود.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                autoComplete="off"
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ایمیل</FormLabel>
                      <FormControl>
                        <Input
                          autoComplete="false"
                          disabled={isLoading}
                          {...field}
                          className="h-[44px]"
                          type="email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  disabled={isLoading}
                  type="submit"
                  className="w-full rounded-md h-[44px] bg-primaryPurple hover:bg-primaryPurple/90"
                >
                  {isLoading ? (
                    <ImSpinner8 className="animate-spin" />
                  ) : (
                    <p>ادامه</p>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter>
            <Link href="/sign-in" className="mx-auto text-primaryPurple">
              بازگشت به صفحه ورود
            </Link>
          </CardFooter>
        </Card>
      </>
    )
  } else {
    return (
      <>
        <Card className="rounded-md py-[32px] px-[20px] md:py-[56px] md:px-[48px]">
          <CardHeader className="space-y-6">
            <CardTitle className="text-2xl font-bold text-primarySlate">
              ایمیل بازنگاری کلمه عبور ارسال شد
            </CardTitle>
            <CardDescription className="text-md text-text">
              ایمیلی حاوی لینک بازنگاری کلمه عبور برای شما ارسال شده است.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center gap-x-3">
            <Button
              onClick={() => sendEmail({ email })}
              className="rounded-lg bg-primaryPurple hover:bg-primaryPurple/90"
            >
              ارسال دوباره ایمیل
            </Button>
            <Button
              onClick={() => {
                setIsEmailSent(false)
              }}
              className="rounded-lg"
              variant={"outline"}
            >
              تغییر ایمیل
            </Button>
          </CardContent>
        </Card>
      </>
    )
  }
}

export default ResetPasswordEmailForm

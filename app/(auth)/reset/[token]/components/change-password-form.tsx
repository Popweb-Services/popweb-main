"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"
import { ImSpinner8 } from "react-icons/im"

import {
  ChangePasswordValidator,
  ChangePasswordValidatorType,
} from "@/lib/validators/reset-password-validators"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

interface ChangePasswordFormProps {
  userId: string
}

const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({ userId }) => {
  const { toast } = useToast()
  const router = useRouter()
  const form = useForm<ChangePasswordValidatorType>({
    resolver: zodResolver(ChangePasswordValidator),
    defaultValues: {
      password: "",
      confirm: "",
    },
  })
  const { mutate: changePassword, isLoading } = useMutation({
    mutationFn: async (payload: ChangePasswordValidatorType) => {
      await axios.patch("/api/change-password/", {
        password: payload.password,
        userId,
      })
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
        title: "تغییر کلمه عبور",
        description: "کلمه عبور با موفقیت تغییر کرد",
      })
      router.push("/sign-in")
    },
  })
  const onSubmit = (values: ChangePasswordValidatorType) => {
    changePassword(values)
  }
  return (
    <>
      <Card className="rounded-md py-[32px] px-[20px] md:py-[56px] md:px-[48px]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">تغییر کلمه عبور</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>کلمه عبور جدید</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isLoading}
                        className="h-[44px]"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>تکرار کلمه عبور جدید</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isLoading}
                        className="h-[44px]"
                        type="password"
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
                  <p>تغییر کلمه عبور</p>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  )
}

export default ChangePasswordForm

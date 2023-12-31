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
  SignUpValidator,
  SignUpValidatorType,
} from "@/lib/validators/auth-validators"
import { useToast } from "@/hooks/use-toast"

import { Button } from "./ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"
import { Input } from "./ui/input"

interface SignUpFormProps {}

const SignUpForm: React.FC<SignUpFormProps> = ({}) => {
  const { toast } = useToast()
  const router = useRouter()
  const form = useForm<SignUpValidatorType>({
    resolver: zodResolver(SignUpValidator),
    defaultValues: {
      email: "",
      password: "",
      confirm: "",
    },
  })
  const { mutate: createUser, isLoading } = useMutation({
    mutationFn: async (payload: SignUpValidatorType) => {
      await axios.post("/api/register", payload)
      signIn("credentials", {
        email: payload.email,
        password: payload.password,
        redirect: false,
      }).then((callback) => {
        if (callback?.error) {
          toast({
            title: "ورود ناموفق",
            description: "ایمیل یا کلمه عبور اشتباه است.",
            variant: "destructive",
          })
        } else {
          router.push("/dashboard")
        }
      })
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 400) {
          return toast({
            title: "حساب کاربری ایجاد نشد",
            description: "کاربری قبلا با این ایمیل ثبت نام کرده است.",
            variant: "destructive",
          })
        } else {
          return toast({
            title: "خطای سیستمی",
            description:
              "لطفا دقایقی دیگر دوباره امتحان کنید و یا با پشتیبانی تماس بگیرید.",
          })
        }
      }
    },
    onSuccess: () => {
      toast({
        description: "حساب کاربری شما ایجاد شد",
      })
    },
  })
  const onSubmit = (values: SignUpValidatorType) => {
    createUser(values)
  }
  return (
    <>
      <Card className="rounded-md py-[32px] px-[20px] md:py-[56px] md:px-[48px]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            ایجاد حساب کاربری
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ایمیل</FormLabel>
                    <FormControl>
                      <Input
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
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>رمز عبور</FormLabel>
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
                    <FormLabel>تکرار کلمه عبور</FormLabel>
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
                  <p> ثبت نام</p>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <div className="flex items-center gap-x-2">
            <p>حساب کاربری دارید ؟</p>
            <Link
              href="/sign-in"
              className="text-primaryPurple underline underline-offset-2"
            >
              وارد شوید
            </Link>
          </div>
        </CardFooter>
      </Card>
    </>
  )
}

export default SignUpForm

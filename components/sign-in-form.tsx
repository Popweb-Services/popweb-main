"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import {
  SignInValidator,
  SignInValidatorType,
} from "@/lib/validators/auth-validators"

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

interface SignInFormProps {}

const SignInForm: React.FC<SignInFormProps> = ({}) => {
  const form = useForm<SignInValidatorType>({
    resolver: zodResolver(SignInValidator),
    defaultValues: {
      email: "",
      password: "",
    },
  })
  const onSubmit = (values: SignInValidatorType) => {
    // TODO:handle sign in with credentials
  }
  return (
    <>
      <Card className="rounded-md py-[32px] px-[20px] md:py-[56px] md:px-[48px]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            ورود به حساب کاربری
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
                      <Input {...field} className="h-[44px]" type="email" />
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
                    <div className="flex items-center justify-between">
                      <FormLabel>رمز عبور</FormLabel>
                      <Link
                        href="/reset"
                        className="text-primaryPurple text-xs font-semibold"
                      >
                        رمز عبور خود را فراموش کرده اید ؟
                      </Link>
                    </div>
                    <FormControl>
                      <Input {...field} className="h-[44px]" type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full rounded-md h-[44px] bg-primaryPurple hover:bg-primaryPurple/90">
                ورود
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <div className="flex items-center gap-x-2">
            <p>حساب کاربری ندارید ؟</p>
            <Link href="/sign-up" className="text-primaryPurple underline underline-offset-2">ثبت نام کنید</Link>
          </div>
        </CardFooter>
      </Card>
    </>
  )
}

export default SignInForm

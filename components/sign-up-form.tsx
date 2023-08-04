"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import {
  SignInValidator,
  SignInValidatorType,
  SignUpValidator,
  SignUpValidatorType,
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

interface SignUpFormProps {}

const SignUpForm: React.FC<SignUpFormProps> = ({}) => {
  const form = useForm<SignUpValidatorType>({
    resolver: zodResolver(SignUpValidator),
    defaultValues: {
      email: "",
      password: "",
      confirm: "",
    },
  })
  const onSubmit = (values: SignInValidatorType) => {
    // TODO:handle register
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
                    <FormLabel>رمز عبور</FormLabel>
                    <FormControl>
                      <Input {...field} className="h-[44px]" type="password" />
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
                      <Input {...field} className="h-[44px]" type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full rounded-md h-[44px] bg-primaryPurple hover:bg-primaryPurple/90">
                ثبت نام
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

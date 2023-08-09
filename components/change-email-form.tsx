"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import { FieldValues, useForm } from "react-hook-form"
import { ImSpinner8 } from "react-icons/im"
import { z } from "zod"

import {
  SignInValidator,
  SignInValidatorType,
} from "@/lib/validators/auth-validators"
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

interface ChangeEmailFormProps {}

const formSchema = z.object({
  email: z.string().email(),
})

const ChangeEmailForm: React.FC<ChangeEmailFormProps> = ({}) => {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })
  const onSubmit = (values: z.infer<typeof formSchema>) => {}
  return (
    <>
      <Card className="rounded-md py-[32px] px-[20px] md:py-[56px] md:px-[48px]">
        <CardHeader className="space-y-6">
          <CardTitle className="text-2xl font-bold text-primarySlate">
            تغییر ایمیل
          </CardTitle>
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
}

export default ChangeEmailForm

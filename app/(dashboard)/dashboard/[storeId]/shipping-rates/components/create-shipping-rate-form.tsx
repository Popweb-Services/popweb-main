"use client"

import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Category, ShippingRate } from "@prisma/client"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { Trash, Trash2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { ImSpinner8 } from "react-icons/im"
import { z } from "zod"

import { shippingRateFormSchema } from "@/lib/validators/store-validators"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

interface CreateShippingRateFormProps {
  shippingRate?: ShippingRate | null
  storeId: string
}

const CreateShippingRateForm: React.FC<CreateShippingRateFormProps> = ({
  shippingRate,

  storeId,
}) => {
  const actionLabel = shippingRate ? "ویرایش نحوه ارسال" : "ایجاد نحوه ارسال"
  const formTitle = shippingRate ? "ویرایش نحوه ارسال" : "ایجاد نحوه ارسال جدید"
  const toastTilte = shippingRate ? "ویرایش نحوه ارسال" : "ایجاد نحوه ارسال"
  const toastDescription = shippingRate
    ? "نحوه ارسال با موفقیت ویرایش شد"
    : "نحوه ارسال با موفقیت ایجاد شد"
  const { toast } = useToast()
  const router = useRouter()
  const form = useForm({
    resolver: zodResolver(shippingRateFormSchema),
    defaultValues: {
      name: shippingRate?.name ?? "",
      description: shippingRate?.description ?? undefined,
      price: shippingRate?.price ?? 0,
      minPrice: shippingRate?.minPrice ?? undefined,
    },
  })
  const { mutate: createOrUpdateShippingRate, isLoading } = useMutation({
    mutationFn: async (payload: z.infer<typeof shippingRateFormSchema>) => {
      if (shippingRate) {
        await axios.patch(
          `/api/${storeId}/shipping-rates/${shippingRate.id}`,
          payload
        )
      } else {
        await axios.post(`/api/${storeId}/shipping-rates`, payload)
      }
    },
    onError: () => {
      toast({
        title: "خطای سیستمی",
        description: "لطفا بعدا تلاش کنید و یا پشتیبانی تماس بگیرید",
        variant: "destructive",
      })
    },
    onSuccess: () => {
      toast({
        title: toastTilte,
        description: toastDescription,
      })
      router.push(`/dashboard/${storeId}/shipping-rates`)
      router.refresh()
    },
  })
  const onSubmit = (values: z.infer<typeof shippingRateFormSchema>) => {
    console.log(values)
    createOrUpdateShippingRate(values)
  }
  return (
    <>
      <div
        dir="rtl"
        className="container bg-secondary max-w-2xl px-5 border-x-2 border-dashed h-full mx-auto pt-24"
      >
        <div className="flex py-4 items-center justify-between">
          <h1 className="text-xl font-bold">{formTitle}</h1>
        </div>
        <Separator className="mb-2" />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md font-semibold">
                    نام نحوه ارسال
                  </FormLabel>
                  <FormDescription>
                    مشتریان شما میتوانند این نام را از بین نحوه های ارسال انتخاب
                    کنند .
                  </FormDescription>
                  <FormControl>
                    <Input
                      placeholder="مثال : پست پیشتار"
                      disabled={isLoading}
                      {...field}
                      className="h-[44px]"
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md font-semibold">
                    توضیحات نحوه ارسال (اختیاری)
                  </FormLabel>
                  <FormDescription>
                    توضیحات تکمیلی برای نحوه ارسال
                  </FormDescription>
                  <FormControl>
                    <Input
                      placeholder="مثال : ارسال بین 2 الی 4 روز کاری"
                      disabled={isLoading}
                      {...field}
                      className="h-[44px]"
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md font-semibold">
                    هزینه ارسال
                  </FormLabel>
                  <FormDescription>
                    این هزینه به مجموع مبلغ قابل پرداخت اضافه خواهد شد.
                  </FormDescription>
                  <FormControl>
                    <div className="relative">
                      <Input
                        defaultValue={field.value}
                        disabled={isLoading}
                        {...field}
                        className="h-[44px]"
                        type="number"
                        min={0}
                      />
                      <div className="absolute top-1/2 -translate-y-1/2 left-9 text-text">
                        تومان
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="minPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md font-semibold">
                    حداقل خرید (اختیاری)
                  </FormLabel>
                  <FormDescription>
                    این نحوه ارسال زمانی برای مشتری فعال می شود که سبد خرید
                    حداقل این قیمت باشد.
                  </FormDescription>
                  <FormControl>
                    <div className="relative">
                      <Input
                        disabled={isLoading}
                        {...field}
                        className="h-[44px]"
                        type="number"
                      />
                      <div className="absolute top-1/2 -translate-y-1/2 left-9 text-text">
                        تومان
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={isLoading}
              className="rounded-lg bg-primaryPurple hover:bg-primaryPurple/90 mt-4 w-full"
            >
              {isLoading ? (
                <ImSpinner8 className="animate-spin" />
              ) : (
                <p>{actionLabel}</p>
              )}
            </Button>
          </form>
        </Form>
      </div>
    </>
  )
}

export default CreateShippingRateForm

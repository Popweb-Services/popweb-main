"use client"

import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { Trash, Trash2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { ImSpinner8 } from "react-icons/im"
import { z } from "zod"

import { BannerType } from "@/types/banner-type"
import { cn } from "@/lib/utils"
import { createBannerFormSchema } from "@/lib/validators/store-validators"
import { useToast } from "@/hooks/use-toast"
import { Button, buttonVariants } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
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
import SingleImageUpload from "@/components/single-image-upload"

interface CreateCategoryFormProps {
  banner?: BannerType | null
  storeId: string
}

const CreateCategoryForm: React.FC<CreateCategoryFormProps> = ({
  banner,
  storeId,
}) => {
  const actionLabel = banner ? "ویرایش بنر" : "ایجاد بنر جدید"
  const formTitle = banner ? "ویرایش بنر" : "آپلود بنر"
  const toastTilte = banner ? "ویرایش بنر" : "ایجاد بنر"
  const toastDescription = banner
    ? "بنر با موفقیت ویرایش شد"
    : "بنر با موفقیت ایجاد شد"
  const { toast } = useToast()
  const router = useRouter()
  const form = useForm({
    resolver: zodResolver(createBannerFormSchema),
    defaultValues: {
      imageUrl: banner?.imageUrl ?? "",
      name: banner?.name ?? "",
    },
  })
  const { mutate: createCategory, isLoading } = useMutation({
    mutationFn: async (payload: z.infer<typeof createBannerFormSchema>) => {
      if (banner) {
        await axios.patch(`/api/${storeId}/banners/${banner.id}`, payload)
      } else {
        await axios.post(`/api/${storeId}/banners`, payload)
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
      router.push(`/dashboard/${storeId}/banners`)
      router.refresh()
    },
  })
  const onSubmit = (values: z.infer<typeof createBannerFormSchema>) => {
    console.log(values)
    createCategory(values)
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
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md font-semibold">بنر</FormLabel>
                  <FormDescription>بنری که آپلود می کنید</FormDescription>
                  <FormControl>
                    <SingleImageUpload
                      {...field}
                      label="آپلود بنر"
                      imageUrl={field.value}
                      onChange={(imageUrl) => {
                        field.onChange(imageUrl)
                        console.log(field.value)
                      }}
                      onRemove={() => field.onChange("")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md font-semibold">
                    نام بنر
                  </FormLabel>
                  <FormDescription>
                    با این نام میتوانید بنرتان را در لیست بنر ها جستجو کنید.
                  </FormDescription>
                  <FormControl>
                    <Input {...field} />
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

export default CreateCategoryForm

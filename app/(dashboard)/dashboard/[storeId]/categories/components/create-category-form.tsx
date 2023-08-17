"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Banner, Category } from "@prisma/client"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { Trash, Trash2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { ImSpinner8 } from "react-icons/im"
import { z } from "zod"

import { createCategoryFormSchema } from "@/lib/validators/store-validators"
import useCaategoryDelete from "@/hooks/use-category-delete-alert-modal"
import useCategoryDeleteAlertModal from "@/hooks/use-category-delete-alert-modal"
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

interface CreateCategoryFormProps {
  category?: Category | null
  categories: Category[]
  banners: Banner[]
  storeId: string
}

const CreateCategoryForm: React.FC<CreateCategoryFormProps> = ({
  category,
  categories,
  storeId,
  banners,
}) => {
  const actionLabel = category ? "ویرایش دسته بندی" : "ایجاد دسته بندی"
  const formTitle = category ? "ویرایش دسته بندی" : "ایجاد دسته بندی جدید"
  const toastTilte = category ? "ویرایش دسته بندی" : "ایجاد دسته بندی"
  const toastDescription = category
    ? "دسته بندی با موفقیت ویرایش شد"
    : "دسته بندی با موفقیت ایجاد شد"
  const { toast } = useToast()
  const router = useRouter()
  const form = useForm({
    resolver: zodResolver(createCategoryFormSchema),
    defaultValues: {
      name: category?.name ?? "",
      parent: category?.parentCategoryId ?? "",
      bannerId: category?.bannerId ?? "",
    },
  })
  const { mutate: createCategory, isLoading } = useMutation({
    mutationFn: async (payload: z.infer<typeof createCategoryFormSchema>) => {
      if (category) {
        await axios.patch(`/api/${storeId}/categories/${category.id}`, payload)
      } else {
        await axios.post(`/api/${storeId}/categories`, payload)
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
      router.push(`/dashboard/${storeId}/categories`)
      router.refresh()
    },
  })
  const onSubmit = (values: z.infer<typeof createCategoryFormSchema>) => {
    console.log(values)
    createCategory(values)
  }
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])
  if (!isMounted) {
    return null
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
                    نام دسته بندی
                  </FormLabel>
                  <FormDescription>
                    مشتریان شما میتوانند این نام را از بین فیلتر ها انتخاب کنند.
                  </FormDescription>
                  <FormControl>
                    <Input
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
              name="parent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md font-semibold">
                    دسته بندی پدر (اختیاری)
                  </FormLabel>
                  <FormDescription>
                    دسته بندی جدیدی که ایجاد می کنید زیر مجموعه این دسته بندی
                    خواهد بود
                  </FormDescription>
                  <Select
                    value={field.value}
                    disabled={isLoading}
                    dir="rtl"
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="انتخاب دسته بندی پدر"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                      <SelectItem value="no-parent">
                        بدون دسته بندی پدر
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bannerId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md font-semibold">
                    بنر (اختیاری)
                  </FormLabel>
                  <FormDescription>
                    بنری که انتخاب میکنید در صفحه دسته بندی نمایش داده خواهد شد
                    <div className=""></div>
                  </FormDescription>
                  <Select
                    value={field.value}
                    disabled={isLoading}
                    dir="rtl"
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger className="h-[80px]">
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="انتخاب دسته بندی پدر"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {banners.map((banner) => (
                        <SelectItem
                          value={banner.id}
                          className="h-[80px] cursor-pointer"
                        >
                          <div dir="rtl" className="flex items-center gap-x-2">
                            <div className=" border rounded-md w-[80px] aspect-[1.5] h-auto relative">
                              <Image
                                src={banner.imageUrl}
                                alt="تصویر بنر"
                                fill
                                className="object-cover"
                              />
                            </div>
                            <p>{banner.name}</p>
                          </div>
                        </SelectItem>
                      ))}
                      <SelectItem value={""}>بدون بنر</SelectItem>
                    </SelectContent>
                  </Select>

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

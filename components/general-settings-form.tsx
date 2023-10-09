"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Banner, Store } from "@prisma/client"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useForm } from "react-hook-form"
import { ImSpinner8 } from "react-icons/im"

import {
  generalSettingsFieldTypes,
  generalSettingsValidator,
} from "@/lib/validators/settings-validators"
import { useToast } from "@/hooks/use-toast"

import SingleImageUpload from "./single-image-upload"
import { Button } from "./ui/button"
import ColorPicker from "./ui/color-picker"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"
import { Input } from "./ui/input"
import OptionalBadge from "./ui/optional-badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import { Textarea } from "./ui/textarea"

interface GeneralSettingsFormProps {
  store: Store | null
  banners: Banner[]
}

const GeneralSettingsForm: React.FC<GeneralSettingsFormProps> = ({
  store,
  banners,
}) => {
  const [isMounted, setIsMounted] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const form = useForm<generalSettingsFieldTypes>({
    resolver: zodResolver(generalSettingsValidator),
    defaultValues: {
      logoUrl: store?.logoUrl ?? "",
      name: store?.name ?? "",
      description: store?.description ?? "",
      bannerUrl: store?.bannerUrl ?? "",
      themeColor: store?.themeColor ?? "",
    },
  })
  const { mutate: updateStore, isLoading } = useMutation({
    mutationFn: async (payload: generalSettingsFieldTypes) => {
      await axios.patch(`/api/${store?.id}`, payload)
      if (payload.themeColor === store?.themeColor) {
        // redeploy website with new color env
      }
    },
    onError: () => {
      toast({
        title: "خطای سیستمی",
        description: "لطفا بعدا دوباره تلاش کنید و یا با پشتیبانی تماس بگیرید.",
        variant: "destructive",
      })
      router.refresh()
    },
    onSuccess: () => {
      toast({
        description: "تغییرات با موفقیت اعمال شد.",
      })
    },
  })
  const onSubmit = (values: generalSettingsFieldTypes) => {
    updateStore(values)
  }
  useEffect(() => {
    setIsMounted(true)
  }, [])
  if (!isMounted) {
    return null
  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-6">
          <FormField
            control={form.control}
            name="logoUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-md font-semibold flex items-center gap-x-2">
                  لوگوی فروشگاه
                  <OptionalBadge />
                </FormLabel>
                <FormControl>
                  <SingleImageUpload
                    {...field}
                    label="آپلود لوگو"
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
                  نام فروشگاه
                </FormLabel>

                <FormControl>
                  <Input className="w-[300px]" {...field} />
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
                <FormLabel className="text-md font-semibold flex items-center gap-x-2">
                  توضیحات فروشگاه
                </FormLabel>
                <FormDescription>
                  پیشنهاد میشود توضیحاتی در مورد کسب و کار خود بنویسید چرا که در
                  موتور های جستجو به نمایش در خواهد آمد.
                </FormDescription>
                <FormControl>
                  <Textarea className="h-auto" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bannerUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-md flex items-center gap-x-2 font-semibold">
                  بنر صفحه اصلی
                  <OptionalBadge />
                </FormLabel>
                <FormDescription>
                  این بنر در صفحه اول فروشگاهتان به نمایش در خواهد آمد.
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
                        value={banner.imageUrl}
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
          <FormField
            name="themeColor"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-x-2">
                  رنگ اصلی
                  <OptionalBadge />
                </FormLabel>
                <FormDescription>
                  رنگ تم اصلی شما مثل رنگ دکمه ها و ...
                </FormDescription>
                <FormControl>
                  <div className="flex items-center gap-x-3">
                    <ColorPicker
                      defaultColor={field.value}
                      value={field.value}
                      handleChangeComplete={(color) => {
                        field.onChange(color)
                      }}
                    />
                    <div
                      className="rounded-full p-4 border"
                      style={{ backgroundColor: field.value }}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={isLoading}
            className="rounded-lg w-[200px] bg-primaryPurple hover:bg-primaryPurple/90 mt-4"
          >
            {isLoading ? (
              <ImSpinner8 className="animate-spin" />
            ) : (
              <p>اعمال تغییرات</p>
            )}
          </Button>
        </form>
      </Form>
    </>
  )
}

export default GeneralSettingsForm

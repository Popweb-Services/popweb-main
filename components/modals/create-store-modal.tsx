"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { DialogTitle } from "@radix-ui/react-dialog"
import { useMutation } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import { useForm } from "react-hook-form"
import { ImSpinner8 } from "react-icons/im"
import { z } from "zod"

import {
  generalSettingsFieldTypes,
  generalSettingsValidator,
} from "@/lib/validators/settings-validators"
import { createStoreFormSchema } from "@/lib/validators/store-validators"
import useCreateStoreModal from "@/hooks/use-create-store-modal"
import useSelectSubscriptionModal from "@/hooks/use-select-subscription-modal"
import { toast } from "@/hooks/use-toast"

import SingleImageUpload from "../single-image-upload"
import { Button } from "../ui/button"
import ColorPicker from "../ui/color-picker"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "../ui/dialog"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Input } from "../ui/input"
import OptionalBadge from "../ui/optional-badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { Textarea } from "../ui/textarea"

interface CreateStoreModalProps {}

const CreateStoreModal: React.FC<CreateStoreModalProps> = ({}) => {
  const {
    isOpen: isSelectSubscriptionModalOpen,
    onOpen: onSelectSubscriptionModalOpen,
  } = useSelectSubscriptionModal()
  const router = useRouter()
  const form = useForm<generalSettingsFieldTypes>({
    resolver: zodResolver(generalSettingsValidator),
    defaultValues: {
      logoUrl: "",
      name: "",
      description: "",
      bannerUrl: "",
      themeColor: "",
    },
  })
  const { mutate: createStore, isLoading } = useMutation({
    mutationFn: async (payload: z.infer<typeof createStoreFormSchema>) => {
      const { data } = await axios.post("/api/store/create-store", payload)
      onClose()
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          return router.push("/sign-in")
        }
        return toast({
          title: "خطای سیستمی",
          description: "لطفا بعدا تلاش کنید و یا با پشتیبانی تماس بگیرید",
          variant: "destructive",
        })
      }
    },
  })
  const { isOpen, onClose, onOpen } = useCreateStoreModal()
  const onOpenChange = (open: boolean) => {
    if (!open) {
      onClose()
    }
  }
  const onSubmit = (values: z.infer<typeof createStoreFormSchema>) => {
    createStore(values)
  }
  return (
    <>
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent dir="rtl">
          <DialogHeader>
            <DialogTitle className="ml-auto mt-6 text-2xl font-semibold">
              فروشگاه خود را بسازید
            </DialogTitle>
            <DialogDescription className="text-right">
              اطلاعاتی که وارد می کنید را بعدا از قسمت تنظیمات میتوانید تغییر
              دهید.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 pt-6"
            >
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
                      پیشنهاد میشود توضیحاتی در مورد کسب و کار خود بنویسید چرا
                      که در موتور های جستجو به نمایش در خواهد آمد.
                    </FormDescription>
                    <FormControl>
                      <Textarea className="h-auto resize-none" {...field} />
                    </FormControl>
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
                className="rounded-lg w-full bg-primaryPurple hover:bg-primaryPurple/90 mt-4"
              >
                {isLoading ? (
                  <ImSpinner8 className="animate-spin" />
                ) : (
                  <p>ایجاد فروشگاه</p>
                )}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default CreateStoreModal

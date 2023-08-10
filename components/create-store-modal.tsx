"use client"

import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { DialogTitle } from "@radix-ui/react-dialog"
import { useMutation } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { createStoreFormSchema } from "@/lib/validators/store-validators"
import useCreateStoreModal from "@/hooks/use-create-store-modal"
import { toast } from "@/hooks/use-toast"

import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogHeader } from "./ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"
import { Input } from "./ui/input"

interface CreateStoreModalProps {}

const CreateStoreModal: React.FC<CreateStoreModalProps> = ({}) => {
  const router = useRouter()
  const form = useForm({
    resolver: zodResolver(createStoreFormSchema),
    defaultValues: {
      name: "",
    },
  })
  const { mutate: createStore, isLoading } = useMutation({
    mutationFn: async (payload: z.infer<typeof createStoreFormSchema>) => {
      const { data: store } = await axios.post(
        "/api/store/create-store",
        payload
      )
      router.push(`/dashboard/${store.id}`)
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
    onSuccess: () => {
      toast({
        title: "ساخت فروشگاه",
        description: "فروشگاه شما با موفقیت ساخته شد",
      })
      onClose()
      router.refresh()
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
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>نام فروشگاه</FormLabel>
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
              <Button
                disabled={isLoading}
                className="rounded-lg bg-primaryPurple hover:bg-primaryPurple/90 mt-4 w-full"
              >
                ساخت فروشگاه
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default CreateStoreModal

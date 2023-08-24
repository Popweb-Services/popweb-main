"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Category,
  Image as ImageType,
  Product,
  ProductOption,
  Variant,
} from "@prisma/client"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { Plus, Trash, Trash2 } from "lucide-react"
import { useFieldArray, useForm } from "react-hook-form"
import { ImSpinner8 } from "react-icons/im"
import { z } from "zod"

import generateCombinations from "@/lib/generate-options-combinations"
import { cn } from "@/lib/utils"
import { createProductFormSchema } from "@/lib/validators/store-validators"
import { useToast } from "@/hooks/use-toast"
import { Button, buttonVariants } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import Editor from "@/components/ui/editor"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import FormHeading from "@/components/ui/form-heading"
import { Input } from "@/components/ui/input"
import OptionalBadge from "@/components/ui/optional-badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import MultipleImageUpload from "@/components/multiple-image-upload"
import SingleImageUpload from "@/components/single-image-upload"

import OptionValueField from "./option-value-field"

interface CreateProductFormProps {
  product?:
    | (Product & {
        images: ImageType[]
        options: ProductOption[]
        variants: Variant[]
      })
    | null
  categories: Category[]
  storeId: string
}

const CreateProductForm: React.FC<CreateProductFormProps> = ({
  categories,
  product,
  storeId,
}) => {
  const [isMounted, setIsMounted] = useState(false)
  const actionLabel = product ? "ویرایش محصول" : "ایجاد محصول جدید"
  const formTitle = product ? "ویرایش محصول" : "ایجاد محصول"
  const toastTilte = product ? "ویرایش محصول" : "ایجاد محصول"
  const toastDescription = product
    ? "محصول با موفقیت ویرایش شد"
    : "محصول با موفقیت ایجاد شد"
  const { toast } = useToast()
  const [unitPricing, setUnitPricing] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof createProductFormSchema>>({
    resolver: zodResolver(createProductFormSchema),
    defaultValues: {
      imageUrls: product?.images.map((image) => image.imageUrl) ?? [],
      mainImageUrl: product?.mainImageUrl ?? "",
      name: product?.name ?? "",
      description: product?.description ?? undefined,
      category: product?.categoryId ?? undefined,
      price: product?.price ?? 0,
      priceAfterDiscount: product?.priceAfterDiscount ?? undefined,
      unit: product?.unit ?? "",
      costAtPrice: product?.costAtPrice ?? undefined,
      quantity: product?.quantity ?? 0,
      options: product
        ? product?.options.map((option) => ({
            name: option.name,
            values: option.values.map((value) => ({
              value: value,
            })),
          }))
        : [{ name: "", values: [{ value: "" }] }],
      variants: product
        ? product.variants.map((variant) => ({
            options: variant.options,
            price: variant.price ?? undefined,
            quantity: variant.quantity,
          }))
        : [],
    },
  })
  const options = form.watch("options")
  const {
    fields: optionFields,
    append: addOption,
    remove: removeOption,
  } = useFieldArray({
    control: form.control,
    name: "options",
  })
  const { fields: variantFields } = useFieldArray({
    control: form.control,
    name: "variants",
  })
  const imageUrls = form.watch("imageUrls")
  const { mutate: createOrUpdateProduct, isLoading } = useMutation({
    mutationFn: async (payload: z.infer<typeof createProductFormSchema>) => {
      const variants = payload.variants?.filter(
        (variant) => variant.price !== undefined
      )
      const options = payload.options.filter((option) => option.name === "")
      console.log(variants)
      if (product) {
        await axios.patch(`/api/${storeId}/products/${product.id}`, {
          ...payload,
          variants,
          options,
        })
      } else {
        await axios.post(`/api/${storeId}/products`, {
          ...payload,
          variants,
          options,
        })
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
      router.push(`/dashboard/${storeId}/products`)
      router.refresh()
    },
  })
  const onSubmit = (values: z.infer<typeof createProductFormSchema>) => {
    createOrUpdateProduct(values)
  }
  useEffect(() => {
    let output: { value: string }[][] = []
    generateCombinations(
      options.map((option) => option.values),
      [],
      output
    )
    form.setValue(
      "variants",
      output.map((item) => ({
        options: item.map((value) => value.value),
        price: undefined,
        quantity: 0,
      }))
    )
  }, [options])
  useEffect(() => {
    setIsMounted(true)
  }, [])
  if (!isMounted) {
    return null
  }
  return (
    <>
      <div dir="rtl" className="container max-w-2xl px-5 h-full mx-auto pt-24">
        <div className="flex py-4 items-center justify-between">
          <h1 className="text-xl font-bold">{formTitle}</h1>
        </div>
        <Separator className="mb-2" />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 pb-14"
          >
            {/* PICTURES */}
            <FormField
              control={form.control}
              name="imageUrls"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md font-semibold">
                    عکس ها
                  </FormLabel>
                  <FormControl>
                    <MultipleImageUpload
                      imageUrls={field.value}
                      uploadLabel="آپلود عکس"
                      onChange={(url: string) =>
                        field.onChange([...field.value, url])
                      }
                      onRemoveFromImageUrls={(url) =>
                        field.onChange(
                          field.value.filter((imageUrl) => imageUrl != url)
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {imageUrls.length !== 0 && (
              <FormField
                control={form.control}
                name="mainImageUrl"
                render={({ field }) => (
                  <FormItem dir="rtl" className="space-y-1">
                    <FormLabel className="font-semibold">عکس اصلی</FormLabel>
                    <FormDescription>
                      اولین عکسی که مشتریان شما از این محصول مشاهده می کنند.
                    </FormDescription>
                    <FormMessage />
                    <RadioGroup
                      dir="rtl"
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid max-w-full grid-cols-7 pt-2"
                    >
                      {imageUrls.map((url) => (
                        <FormItem>
                          <FormLabel className="[&:has([data-state=checked])>div]:border-primaryPurple">
                            <FormControl>
                              <RadioGroupItem value={url} className="sr-only" />
                            </FormControl>
                            <div className="w-[80px] h-[80px] border-[2px] rounded-md relative">
                              <Image
                                alt="image"
                                className="object-fit overflow-hidden rounded-md"
                                src={url}
                                fill
                              />
                            </div>
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormItem>
                )}
              />
            )}

            {/* NAME */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md font-semibold">
                    نام محصول
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* DESCRIPTION */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md flex items-center gap-x-2 font-semibold">
                    توضیحات محصول
                    <OptionalBadge />
                  </FormLabel>
                  <FormControl>
                    <Editor
                      initialContent={field.value}
                      onChange={(content: any) => field.onChange(content)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* CATEGORY */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md flex items-center gap-x-2 font-semibold">
                    دسته بندی
                    <OptionalBadge />
                  </FormLabel>
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
                          placeholder="انتخاب دسته بندی "
                        ></SelectValue>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                      <SelectItem value="">بدون دسته بندی</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Separator />
            {/* PRICING */}
            <FormHeading title="قیمت گذاری" />
            <div className="grid grid-cols-2 gap-x-4">
              {/* PRICE */}
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-md font-semibold">
                      قیمت
                    </FormLabel>
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
              {/* PRICE AFTER DISCOUNT */}
              <FormField
                control={form.control}
                name="priceAfterDiscount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-md flex items-center gap-x-2 font-semibold">
                      قیمت بعد از تخفیف
                      <OptionalBadge />
                    </FormLabel>
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
            </div>
            <div className="flex-col gap-y-2">
              <div className="flex items-center gap-x-2">
                <Checkbox
                  onCheckedChange={() => {
                    if (unitPricing) {
                      form.setValue("unit", "")
                    }
                    setUnitPricing(!unitPricing)
                  }}
                />
                <h4 className="font-semibold">قیمت گذاری واحدی</h4>
              </div>
              <p className="mr-4">
                با قیمت گذاری واحدی محصول خود را به ازای هر واحد بفروشید
              </p>
            </div>
            {unitPricing && (
              <FormField
                control={form.control}
                name="unit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-md font-semibold">
                      واحد
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="مثال: کیلوگرم"
                        className="w-[200px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="costAtPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md flex items-center gap-x-2 font-semibold">
                    قیمت خرید
                    <OptionalBadge />
                  </FormLabel>
                  <FormDescription>
                    این قیمت برای مشتریان نمایش داده نمی شود و فقط برای محاسبه
                    سود شما از فروش این محصول میباشد.
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
            <Separator />
            {/* INVENTORY */}
            <FormHeading title="انبار" />
            {/* QUANTITY */}
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md font-semibold">تعداد</FormLabel>
                  <FormControl>
                    <Input
                      defaultValue={field.value}
                      disabled={isLoading}
                      {...field}
                      className="h-[44px] w-[200px]"
                      type="number"
                      min={0}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Separator />
            {/* VARIANTS */}
            <FormHeading
              title="گونه ها"
              description="برای محصول خود گونه هایی مانند رنگ سایز و ... تعریف کنید."
            />
            {optionFields.map((field, index) => (
              <div key={field.id} className="p-6 space-y-4 border-2 rounded-lg">
                <FormItem>
                  <FormLabel className="text-md flex items-center justify-between font-semibold">
                    نام گونه
                    {index > 0 && (
                      <Button
                        type="button"
                        onClick={() => {
                          removeOption(index)
                        }}
                        variant="ghost"
                      >
                        <Trash2 size={20} />
                      </Button>
                    )}
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...form.register(`options.${index}.name`)}
                      disabled={isLoading}
                      placeholder="مثال: رنگ، سایز"
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
                <FormItem>
                  <FormControl>
                    <OptionValueField
                      onChange={() => {
                        let output: { value: string }[][] = []
                        generateCombinations(
                          options.map((option) => option.values),
                          [],
                          output
                        )
                        form.setValue(
                          "variants",
                          output.map((item) => ({
                            options: item.map((value) => value.value),
                            price: undefined,
                            quantity: 0,
                          }))
                        )
                      }}
                      control={form.control}
                      nestIndex={index}
                      register={form.register}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addOption({ name: "", values: [{ value: "" }] })}
              className="flex text-primaryPurple items-center gap-x-2"
            >
              <p>افزودن گونه جدید</p>
              <Plus size={15} />
            </button>
            {options[0].values[0].value !== "" && (
              <Table className="border-2 rounded-lg ">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px] text-right">گونه</TableHead>
                    <TableHead className=" text-right">قیمت</TableHead>
                    <TableHead className=" text-right">تعداد</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {variantFields.map((field, index) => (
                    <TableRow key={field.id}>
                      <TableCell>{field.options.join("، ")}</TableCell>
                      <TableCell>
                        <div className="relative">
                          <Input
                            disabled={isLoading}
                            {...form.register(`variants.${index}.price`)}
                            type="number"
                            min={0}
                          />
                          <div className="absolute top-1/2 -translate-y-1/2 left-9 text-text">
                            تومان
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Input
                          disabled={isLoading}
                          {...form.register(`variants.${index}.quantity`)}
                          type="number"
                          min={0}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}

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

export default CreateProductForm

import { z } from "zod"

export const createStoreFormSchema = z.object({
  name: z.string().min(5, { message: "نام فروشگاه باید حداقل 5 حرف باشد" }),
})
export const createCategoryFormSchema = z.object({
  name: z.string().min(3, { message: "نام دسته بندی باید حداقل 3 حرف باشد" }),
  parent: z.string().optional(),
  bannerId: z.string().optional(),
})
export const shippingRateFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: "نام نحوه ارسال باید حداقل شامل 3 حرف باشد" }),
  description: z.string().optional(),
  price: z.coerce
    .number()
    .min(0, { message: "هزینه ارسال نمیتواند کمتر از 0 باشد" }),
  minPrice: z.coerce.number().optional(),
})

export const createBannerFormSchema = z.object({
  name: z.string().min(3, { message: "نام بنر باید حداقل شامل 3 حرف باشد." }),
  imageUrl: z
    .string()
    .min(1, { message: "بنر اجباری است" })
    .regex(/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i, { message: "فرمت نامعتبر" }),
})

export const createProductFormSchema = z.object({
  imageUrls: z
    .string()
    .array()
    .min(1, { message: "حداقل یک عکس از محصول باید آپلود کنید" }),
  mainImageUrl: z.string().min(1, { message: "عکس اصلی را انتخاب کنید." }),
  name: z.string().min(3, { message: "نام محصول باید حداقل 3 حرف باشد" }),
  description: z.any().optional(),
  category: z.string().optional(),
  features: z
    .object({
      name: z.string(),
      value: z.string(),
    })
    .array()
    .optional(),
  isFeatured: z.boolean().default(false),
  price: z.coerce.number().min(0, { message: "قیمت باید بزرگ تر از 0 باشد." }),
  priceAfterDiscount: z.coerce
    .number()
    .min(0, { message: "قیمت بعد از تخفیف باید بزرگ تر از 0  باشد." })
    .optional(),
  unit: z.string().optional(),
  costAtPrice: z.coerce.number().optional(),
  quantity: z.coerce
    .number()
    .min(0, { message: "تعداد نمی تواند کمتر از 0 باشد." }),
  options: z
    .object({
      name: z.string(),
      values: z
        .object({
          value: z.string(),
        })
        .array(),
    })
    .array(),
  variants: z
    .object({
      options: z.string().array(),
      price: z.coerce.number(),
      priceAfterDiscount: z.coerce.number().optional(),
      quantity: z.coerce.number(),
    })
    .array(),
})

export const phoneNumberValidator = z.object({
  phone: z
    .string()
    .min(1, { message: "این فیلد اجباری است." })
    .regex(/^09\d{9}/g, {
      message: "شماره موبایل نا معتبر میباشد.",
    }),
})

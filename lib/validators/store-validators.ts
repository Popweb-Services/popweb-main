import { z } from "zod"

export const createStoreFormSchema = z.object({
  name: z.string().min(5, { message: "نام فروشگاه باید حداقل 5 حرف باشد" }),
})
export const createCategoryFormSchema = z.object({
  name: z.string().min(3, { message: "نام دسته بندی باید حداقل 3 حرف باشد" }),
  parent: z.string().optional(),
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

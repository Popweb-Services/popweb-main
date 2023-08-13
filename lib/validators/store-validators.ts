import { z } from "zod"

export const createStoreFormSchema = z.object({
  name: z.string().min(5, { message: "نام فروشگاه باید حداقل 5 حرف باشد" }),
})
export const createCategoryFormSchema = z.object({
  name: z.string().min(3, { message: "نام دسته بندی باید حداقل 3 حرف باشد" }),
  parent: z.string().optional(),
})

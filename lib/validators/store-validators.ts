import { z } from "zod";

export const createStoreFormSchema = z.object({
  name: z.string().min(5, { message: "نام فروشگاه باید حداقل 5 حرف باشد" }),
})

import * as z from "zod"

export const addressValidator = z.object({
  address: z.string().min(1, { message: "نشانی پستی الزامی است" }),
  postCode: z
    .string()
    .min(1, { message: "کد پستی الزامی است" })
    .max(11, { message: "کد پستی باید حداکثر 10 رقم باشد" }),
  province: z.string().min(1, { message: "لطفا استان را انتخاب کنید" }),
  city: z.string().min(1, "لطفا شهر را انتخاب کنید."),
  recieverName: z
    .string()
    .min(1, { message: "نام و نام خانوادگی گیرنده الزامی است" }),

  recieverPhoneNumber: z
    .string()
    .min(1, { message: "شماره موبایل گیرنده الزامی میباشد" })
    .regex(/^09\d{9}/g, {
      message: "شماره موبایل نا معتبر میباشد.",
    }),
})

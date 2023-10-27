import { z } from "zod"

export const generalSettingsValidator = z.object({
  logoUrl: z.string().optional(),
  name: z.string().min(3),
  appName: z
    .string()
    .min(3, { message: "شناسه فروشگاه باید حداقل 3 کاراکتر باشد." })
    .regex(/^[a-zA-z-?]/g, {
      message:
        "لطفا فقط از کاراکترهای a-z، اعداد و یا خط تیره (-) استفاده کنید. دست کم ۳ کاراکتر.",
    }),
  description: z
    .string()
    .min(50, {
      message:
        "برای بهینه سازی بهتر در موتور های جستجو (SEO) توضیحات باید حداقل 50 کاراکتر باشد",
    })
    .max(169, {
      message:
        "برای بهینه سازی بهتر در موتور های جستجو (SEO) توضیحات باید کمتر از 170 کاراکتر باشد",
    })
    .optional(),
  bannerUrl: z.string().optional(),
  themeColor: z.string().optional(),
})

export type generalSettingsFieldTypes = z.infer<typeof generalSettingsValidator>

import { z } from "zod"

export const ResetPasswordEmailValidator = z.object({
  email: z.string().email({ message: "ایمیل نا معتبر است." }),
})

export const ChangePasswordValidator = z
  .object({
    password: z
      .string()
      .min(8, { message: "کلمه عبور باید حداقل 8 کاراکتر باشد" })
      .regex(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/, {
        message: "کلمه عبور باید دارای حداقل 1 حرف و عدد باشد",
      }),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "کلمه عبور یکسان نیست",
    path: ["confirm"],
  })

export type ChangePasswordValidatorType = z.infer<
  typeof ChangePasswordValidator
>

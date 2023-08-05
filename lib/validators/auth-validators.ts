import { z } from "zod"

export const SignInValidator = z.object({
  email: z.string().email({ message: "ایمیل نامعتبر است" }),
  password: z.string(),
})

export type SignInValidatorType = z.infer<typeof SignInValidator>

export const SignUpValidator = z
  .object({
    email: z.string().email({ message: "ایمیل نامعتبر است" }),
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

export type SignUpValidatorType = z.infer<typeof SignUpValidator>

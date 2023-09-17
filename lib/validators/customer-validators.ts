import { z } from "zod"

import { createProductFormSchema } from "./store-validators"

export const customerAuthenticationValidator = z.object({
  code: z.coerce.string(),
})

export const createCartValidator = z.object({
  cartItems: z
    .object({
      productId: z.string(),
      variantId: z.string().optional(),
      quantity: z.coerce.number(),
    })
    .array(),
})

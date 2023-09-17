import { z } from "zod"

export const addToCartValidator = z.object({
  deviceId: z.string().optional(),
  customerId: z.string().optional(),
  productId: z.string(),
  variantId: z.string().optional(),
})

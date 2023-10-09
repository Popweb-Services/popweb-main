import { CartItem } from "@prisma/client"
import { z } from "zod"

export const orderValidator = z.object({
  customerId: z.string(),
  shippingRateId: z.string(),
  customerAddressId: z.string(),
  cartItems: z.any().array(),
})

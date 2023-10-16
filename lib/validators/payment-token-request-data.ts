import { z } from "zod"

const paymentTokenRequestDataValidator = z.object({
  amount: z.number().min(1000),
  mobile_number: z.string(),
  port: z.string(),
  subscriptionMounths: z.number(),
})

export default paymentTokenRequestDataValidator

import { z } from "zod"

export const deleteFileValidator = z.object({
  imageUrl: z
    .string()
    .regex(/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i, {
      message: "invalid image url",
    }),
})

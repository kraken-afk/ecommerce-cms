import { z } from 'zod'

export const formSchema = z.object({
  name: z.string().min(1, { message: 'Name required.' })
})

export const billboardSchema = z.object({
  label: z.string().min(1),
  imgUrl: z.string().min(1),
})

export const categorySchema = z.object({
  name: z.string().min(1),
  billboardId: z.string().min(1),
})

export const sizeSchema = z.object({
  name: z.string().min(1),
  value: z.string().min(1),
})

export const colorSchema = z.object({
  name: z.string().min(1),
  value: z.string().min(4).max(7).regex(/^#/, {
    message: 'String must be a valid hexcode'
  }),
})

export const productSchema = z.object({
  name: z.string().min(1),
  images: z.object({ url: z.string() }).array(),
  price: z.coerce.number().min(1),
  categoryId: z.string().min(1),
  colorId: z.string().min(1),
  sizeId: z.string().min(1),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
})
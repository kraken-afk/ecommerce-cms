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
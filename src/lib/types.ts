import { z } from 'zod'

export const formSchema = z.object({
  name: z.string().min(1, { message: 'Name required.' })
})

export const billboardSchema = z.object({
  label: z.string().min(1),
  imgUrl: z.string().min(1),
})
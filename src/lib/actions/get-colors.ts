import { Color } from '@prisma/client'

const url = process.env.NEXT_PUBLIC_API_URL + '/colors'

export async function getColors(): Promise<Color[]> {
  const res = await fetch(url)

  return res.json()
}
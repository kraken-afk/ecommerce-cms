import { Size } from '@prisma/client'

const url = process.env.NEXT_PUBLIC_API_URL + '/sizes'

export async function getSizes(): Promise<Size[]> {
  const res = await fetch(url)

  return res.json()
}
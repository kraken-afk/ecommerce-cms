const url = process.env.NEXT_PUBLIC_API_URL + '/categories'

export async function getCategories(): Promise<Category[]> {
  const res = await fetch(url)

  return res.json()
}
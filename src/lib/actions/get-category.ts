const url = process.env.NEXT_PUBLIC_API_URL + '/categories'

type Category = {
  id: string,
  name: string,
  billboard: Billboard
}

export async function getCategory(id: string): Promise<Category> {
  const res = await fetch(`${url}/${id}`)

  return res.json()
}
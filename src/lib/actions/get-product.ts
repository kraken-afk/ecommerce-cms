const url = process.env.NEXT_PUBLIC_API_URL + '/products'

export async function getProduct(id: string): Promise<Product> {
  const res = await fetch(`${url}/${id}`)

  return res.json()
}
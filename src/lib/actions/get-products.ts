import qs from 'query-string'

const URL = process.env.NEXT_PUBLIC_API_URL + '/products'

type Query = {
  categoryId?: string,
  colorId?: string,
  sizeId?: string,
  isFeatured?: boolean,
}

export async function getProducts(query: Query): Promise<Product[]> {
  const url = qs.stringifyUrl({
    url: URL,
    query: {
      colorId: query.colorId,
      categoryId: query.categoryId,
      sizeId: query.sizeId,
      isFeatured: query.isFeatured
    }
  })
  const res = await fetch(url)

  return res.json()
}
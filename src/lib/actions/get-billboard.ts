const url = process.env.NEXT_PUBLIC_API_URL + '/billboards'

export async function getBillboard(id: string): Promise<Billboard> {
  const res = await fetch(`${url}/${id}`)

  return res.json()
}
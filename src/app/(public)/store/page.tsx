import { Billboard } from '@/app/(public)/components/billboard'
import { ProductList } from '@/app/(public)/components/product-list'
import { Container } from '@/app/(public)/components/ui/container'
import { getBillboard } from '@/lib/actions/get-billboard'
import { getProducts } from '@/lib/actions/get-products'


export const revalidate = 0

export default async function Home() {
  const products = await getProducts({ isFeatured: true })
  const billboard = await getBillboard('uCjDtYMhq8Q-f-32L9K7s')

  return (
    <Container>
      <div className='space-y-10 pb-10'>
        <Billboard
          data={billboard}
        />
      </div>
      <div className='flex  flex-col gap-y-8 px-4 sm:px-6 lg:px-8'>
        <ProductList title="Featured Products" items={products} />
      </div>
    </Container>
  )
}

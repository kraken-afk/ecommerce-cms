import { Gallery } from '@/app/(public)/components/gallery'
import { Info } from '@/app/(public)/components/info'
import { ProductList } from '@/app/(public)/components/product-list'
import { Container } from '@/app/(public)/components/ui/container'
import { Separator } from '@/components/ui/separator'
import { getProduct } from '@/lib/actions/get-product'
import { getProducts } from '@/lib/actions/get-products'

type ProductProps = {
  params: {
    productId: string
  }
}

export default async function Page({ params }: ProductProps) {
  const product = await getProduct(params.productId)
  const suggestedProduct = await getProducts({
    categoryId: product.category.id
  })
  return (
    <div className='bg-white'>
      <Container>
        <div className='px-4 py-10 sm:px-6 lg:px-8'>
          <div className='lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8'>
            <Gallery images={product.Image} />
            <div className='mt-10 px-4 sm:mt-16 sm:px-0 lg-:mt-0'>
              <Info
                data={product}
              />
            </div>
          </div>
          <Separator className='my-6' />
          <ProductList
            title='Related items'
            items={suggestedProduct}
          />
        </div>
      </Container>
    </div>
  )
}
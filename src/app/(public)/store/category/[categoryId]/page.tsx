import { Billboard } from '@/app/(public)/components/billboard'
import { Container } from '@/app/(public)/components/ui/container'
import { NoResult } from '@/app/(public)/components/ui/no-result'
import { ProductCard } from '@/app/(public)/components/ui/product-card'
import { Filter } from '@/app/(public)/store/category/[categoryId]/components/filter'
import { MobileFilters } from '@/app/(public)/store/category/[categoryId]/components/mobile-filters'
import { getCategory } from '@/lib/actions/get-category'
import { getColors } from '@/lib/actions/get-colors'
import { getProducts } from '@/lib/actions/get-products'
import { getSizes } from '@/lib/actions/get-sizes'

type CategoryProps = {
  params: {
    categoryId: string,
  },
  searchParams: {
    colorId: string,
    sizeId: string,
  }
}

export const revalidate = 0

export default async function Page({ params, searchParams }: CategoryProps) {
  const products = await getProducts({
    categoryId: params.categoryId,
    colorId: searchParams.colorId,
    sizeId: searchParams.sizeId
  })
  const sizes = await getSizes()
  const colors = await getColors()
  const category = await getCategory(params.categoryId)

  return (
    <div className="bg-white">
      <Container>
        <Billboard
          data={category.billboard}
        />
        <div className='px-4 sm:px-6 lg:px-8 pb-24'>
          <div className='lg:grid lg:grid-cols-5 lg:gap-x-8'>
            <MobileFilters sizes={sizes} colors={colors} />
            <div className='hidden lg:block'>
              <Filter
                valueKey="sizeId"
                name="Sizes"
                data={sizes}
              />
              <Filter
                valueKey="colorId"
                name="Colors"
                data={colors}
              />
            </div>
            <div className='mt-6 lg:col-span-4 lg:mt-0'>
              {products.length === 0 && <NoResult />}
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                {products.map(item => (
                  <ProductCard
                    key={item.id}
                    data={item}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
import { ProductClient } from '@/app/(dashboard)/dashboard/[storeId]/products/components/client'
import { ProductColumn } from '@/app/(dashboard)/dashboard/[storeId]/products/components/columns'
import { formatter } from '@/lib/utils'
import { format } from 'date-fns'
import prismadb from '@/lib/prismadb'

export default async function Page({
  params
}: {
  params: { storeId: string }
}) {
  const products = await prismadb.product.findMany({
    where: {
      storeId: params.storeId
    },
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      category: true,
      size: true,
      color: true
    }
  })

  const formattedProducts: ProductColumn[] =
    products.map(({ id, name, isFeatured, isArchived, price, createdAt, color, size, category }) => {
      const formattedPrice = formatter.format(price.toNumber())
      return ({
        id,
        name,
        isFeatured,
        isArchived,
        price: formattedPrice,
        color: color.value,
        size: size.name,
        createdAt: format(createdAt, 'MM do, yyyy'),
        category: category.name
      })
    })

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <ProductClient data={formattedProducts} />
      </div>
    </div>
  )
}
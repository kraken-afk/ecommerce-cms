import { ProductForm } from '@/app/(dashboard)/dashboard/[storeId]/products/[productId]/components/product-form'
import prismadb from '@/lib/prismadb'

export default async function Page({ params }: { params: { productId: string, storeId: string } }) {
  let product = await prismadb.product.findUnique({
    where: {
      id: params.productId
    },
    include: {
      Image: true,
    }
  })

  if (product?.Image) {
    // @ts-ignore
    product.images = product?.Image
    // @ts-ignore
    delete product['Image']
  }

  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId
    }
  })

  const sizes = await prismadb.size.findMany({
    where: {
      storeId: params.storeId
    }
  })

  const colors = await prismadb.color.findMany({
    where: {
      storeId: params.storeId
    }
  })

  return (
    <>
      <div className='flex-col'>
        <div className='flex-1 space-w-4 p-8 pt-6'>
          <ProductForm
            categories={categories}
            sizes={sizes}
            colors={colors}
            // @ts-ignore
            initialData={product}
          />
        </div>
      </div>
    </>
  )
}
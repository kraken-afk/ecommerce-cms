import { CategoryForm } from '@/app/(dashboard)/dashboard/[storeId]/categories/[categoryId]/components/category-form'
import prismadb from '@/lib/prismadb'

export default async function Page({ params }: { params: { storeId: string, categoryId: string } }) {
  const category = await prismadb.category.findUnique({
    where: {
      id: params.categoryId
    }
  })

  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId
    }
  })

  return (
    <>
      <div className='flex-col'>
        <div className='flex-1 space-w-4 p-8 pt-6'>
          <CategoryForm
            initialData={category}
            billboards={billboards}
          />
        </div>
      </div>
    </>
  )
}
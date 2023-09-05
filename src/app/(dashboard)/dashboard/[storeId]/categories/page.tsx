import { BillboardClient } from '@/app/(dashboard)/dashboard/[storeId]/categories/components/client'
import { CategoryColumns } from '@/app/(dashboard)/dashboard/[storeId]/categories/components/columns'
import { format } from 'date-fns'
import prismadb from '@/lib/prismadb'

export default async function Page({
  params
}: {
  params: { storeId: string }
}) {
  const billboards = await prismadb.category.findMany({
    where: {
      storeId: params.storeId
    },
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      billboard: true,
    }
  })

  const formattedCategories: CategoryColumns[] =
    billboards.map(({ id, name, createdAt, billboard }) => {
      return ({ id, name, createdAt: format(createdAt, 'MM do, yyyy'), billboardLabel: billboard.label })
  })

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <BillboardClient data={formattedCategories} />
      </div>
    </div>
  )
}
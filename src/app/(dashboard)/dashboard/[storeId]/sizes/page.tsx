import { BillboardClient } from '@/app/(dashboard)/dashboard/[storeId]/sizes/components/client'
import { SizeColumn } from '@/app/(dashboard)/dashboard/[storeId]/sizes/components/columns'

import { format } from 'date-fns'
import prismadb from '@/lib/prismadb'

export default async function Page({
  params
}: {
  params: { storeId: string }
}) {
  const sizes = await prismadb.size.findMany({
    where: {
      storeId: params.storeId
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  const formattedSizes: SizeColumn[] =
    sizes.map(({ id, name, createdAt, value }) => {
      return ({ id, name, value, createdAt: format(createdAt, 'MM do, yyyy') })
  })

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <BillboardClient data={formattedSizes} />
      </div>
    </div>
  )
}
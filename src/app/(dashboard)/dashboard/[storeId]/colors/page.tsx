import { ColorsClient } from '@/app/(dashboard)/dashboard/[storeId]/colors/components/client'
import { ColorColumn } from '@/app/(dashboard)/dashboard/[storeId]/colors/components/columns'

import { format } from 'date-fns'
import prismadb from '@/lib/prismadb'

export default async function Page({
  params
}: {
  params: { storeId: string }
}) {
  const sizes = await prismadb.color.findMany({
    where: {
      storeId: params.storeId
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  const formattedSizes: ColorColumn[] =
    sizes.map(({ id, name, createdAt, value }) => {
      return ({ id, name, value, createdAt: format(createdAt, 'MM do, yyyy') })
  })

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <ColorsClient data={formattedSizes} />
      </div>
    </div>
  )
}
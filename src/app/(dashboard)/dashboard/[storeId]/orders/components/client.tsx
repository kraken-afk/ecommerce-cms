'use client'

import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { OrderColumn, columns } from '@/app/(dashboard)/dashboard/[storeId]/orders/components/columns'
import { DataTable } from '@/components/ui/data-table'

type Props = {
  data: OrderColumn[]
}

export function OrdersClient({ data }: Props) {
  return (
    <>
      <Heading
        title={`Orders (${data.length})`}
        description='Manage orders for your store'
      />
      <Separator />
      <DataTable columns={columns} data={data} searchKey='products' />
    </>
  )
}
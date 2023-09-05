'use client'

import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { BillboardColumn, columns } from '@/app/(dashboard)/dashboard/[storeId]/billboards/components/columns'
import { useParams, useRouter } from 'next/navigation'
import { DataTable } from '@/components/ui/data-table'
import { ApiList } from '@/components/ui/api-list'

type Props = {
  data: BillboardColumn[]
}

export function BillboardClient({ data }: Props) {
  const router = useRouter()
  const params = useParams()
  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          title={`Billboards (${data.length})`}
          description='Manage billboards for your store'
        />
        <Button onClick={() => router.push(`/dashboard/${params.storeId}/billboards/new`)}>
          <Plus className='mr-2 h-4 w-4' />
          Add new
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey='label' />
      <Heading
        title='API'
        description='API calls for billboards'
      />
      <Separator />
      <ApiList entityIdName='billboardId' entityName='billboards' />
    </>
  )
}
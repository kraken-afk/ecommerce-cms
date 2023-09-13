'use client'

import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { SizeColumn, columns } from '@/app/(dashboard)/dashboard/[storeId]/sizes/components/columns'
import { useParams, useRouter } from 'next/navigation'
import { DataTable } from '@/components/ui/data-table'
import { ApiList } from '@/components/ui/api-list'

type Props = {
  data: SizeColumn[]
}

export function BillboardClient({ data }: Props) {
  const router = useRouter()
  const params = useParams()
  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          title={`Sizes (${data.length})`}
          description='Manage sizes for your store'
        />
        <Button onClick={() => router.push(`/dashboard/${params.storeId}/sizes/new`)}>
          <Plus className='mr-2 h-4 w-4' />
          Add new
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey='name' />
      <Heading
        title='API'
        description='API calls for sizes'
      />
      <Separator />
      <ApiList entityIdName='sizeId' entityName='sizes' />
    </>
  )
}
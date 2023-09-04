import { BillboardClient } from '@/app/(dashboard)/dashboard/[storeId]/billboards/components/client'

export default function Page() {
  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <BillboardClient />
      </div>
    </div>
  )
}
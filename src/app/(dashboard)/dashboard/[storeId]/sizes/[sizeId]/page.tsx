
import { SizeForm } from '@/app/(dashboard)/dashboard/[storeId]/sizes/[sizeId]/components/size-form'
import prismadb from '@/lib/prismadb'

export default async function Page({ params }: { params: { sizeId: string } }) {
  const size = await prismadb.size.findUnique({
    where: {
      id: params.sizeId
    }
  })

  return (
    <>
      <div className='flex-col'>
        <div className='flex-1 space-w-4 p-8 pt-6'>
          <SizeForm
            initialData={size}
          />
        </div>
      </div>
    </>
  )
}
import { BillboardForm } from '@/app/(dashboard)/dashboard/[storeId]/billboards/[billboardId]/components/billboard-form'
import prismadb from '@/lib/prismadb'

export default async function Page({ params }: { params: { billboardId: string } }) {
  const billboard = await prismadb.billboard.findUnique({
    where: {
      id: params.billboardId
    }
  })

  return (
    <>
      <div className='flex-col'>
        <div className='flex-1 space-w-4 p-8 pt-6'>
          <BillboardForm
            initialData={billboard}
          />
        </div>
      </div>
    </>
  )
}
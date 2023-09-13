
import { ColorForm } from '@/app/(dashboard)/dashboard/[storeId]/colors/[colorId]/components/color-form'
import prismadb from '@/lib/prismadb'

export default async function Page({ params }: { params: { colorId: string } }) {
  const size = await prismadb.color.findUnique({
    where: {
      id: params.colorId
    }
  })

  return (
    <>
      <div className='flex-col'>
        <div className='flex-1 space-w-4 p-8 pt-6'>
          <ColorForm
            initialData={size}
          />
        </div>
      </div>
    </>
  )
}
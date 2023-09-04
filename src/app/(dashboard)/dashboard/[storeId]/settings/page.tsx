import { SettingForm } from '@/app/(dashboard)/dashboard/[storeId]/settings/components/setting-form'
import { NotFound } from '@/components/exceptions/not-found'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import prismadb from '@/lib/prismadb'

type Props = {
  params: { storeId: string }
}

export default async function Page({ params }: Props) {
  const { userId } = auth()
  if (!userId) redirect('/sign-in')

  const store = await prismadb.store.findFirst({
    where: {
      userId,
      id: params.storeId
    }
  })

  if (!store) return <NotFound />

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <SettingForm initialData={store} />
      </div>
    </div>
  )
}
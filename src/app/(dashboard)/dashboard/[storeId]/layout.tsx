import { auth } from '@clerk/nextjs'
import { PropsWithChildren } from 'react'
import { redirect } from 'next/navigation'
import { NotFound } from '@/components/exceptions/not-found'
import { StoreInstanceProvider } from '@/providers/store-instance-provider'
import prismadb from '@/lib/prismadb'


export default async function Layout(
  {params: { storeId }, children }:
  { params: {storeId: string} } & PropsWithChildren)
  {
    const { userId } = auth()

    if (!userId) redirect('/sign-in')

    const store = await prismadb.store.findFirst({
      where: {
        id: storeId,
        userId
      }
    })

    if (!store) return <NotFound />

    return (
      <StoreInstanceProvider store={store}>
        {children}
      </StoreInstanceProvider>
    )
}
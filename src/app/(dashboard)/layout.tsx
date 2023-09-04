import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { PropsWithChildren } from 'react'
import { headers } from 'next/headers'
import { Navigation } from '@/components/layout/navigation'
import prismadb from '@/lib/prismadb'

export default async function Layout({ children }: PropsWithChildren) {
  const pathname = headers().get('x-invoke-path') || '';
  const { userId } = auth()
  // check user, if null redirect
  if (!userId) redirect('/sign-in')

  // check store, if has storem redirect to dashboard/storeId
  const store = await prismadb.store.findFirst({ where: { userId } })
  if (store && pathname === '/dashboard') redirect(`/dashboard/${store.id}`)

  return (
  <>
    <Navigation />
    {children}
  </>
  )
}
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { PropsWithChildren } from 'react'
import prismadb from '@/lib/prismadb'
import { headers } from 'next/headers'

export default async function Layout({ children }: PropsWithChildren) {
  const pathname = headers().get('x-invoke-path') || '';
  const { userId } = auth()
  // check user, if null redirect
  if (!userId) redirect('/sign-in')

  // check store, if has storem redirect to dashboard/storeId
  const store = await prismadb.store.findFirst({ where: { userId } })
  if (store && pathname === '/dashboard') redirect(`/dashboard/${store.id}`)

  return <>{children}</>
}
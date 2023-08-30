import { NavLayout } from '@/components/layout/nav-layout'
import { StoreSwitcher } from '@/components/layout/store-switcher'
import prismadb from '@/lib/prismadb'
import { UserButton, auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

export async function Navigation() {
  const { userId } = auth()
  if (!userId) redirect('/sign-in')

  const stores = await prismadb.store.findMany({
    where: {
      userId
    }
  })

  return (
    <>
      <nav className='w-full h-16 border-b flex justify-between items-center px-4'>
        <div className='flex gap-6'>
          <StoreSwitcher items={stores} />
          <NavLayout />
        </div>
        <UserButton afterSignOutUrl='/' />
      </nav>
    </>
  )
}

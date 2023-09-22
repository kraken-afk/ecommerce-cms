import { MainNav } from '@/app/(public)/components/main-nav'
import { NavbarActions } from '@/app/(public)/components/navbar-actions'
import { Container } from '@/app/(public)/components/ui/container'
import { getCategories } from '@/lib/actions/get-categories'
import Link from 'next/link'

export async function Navbar() {

  const categories = await getCategories()

  return (
    <div className='border-b'>
      <Container>
        <div className='relative px-4 sm:px-6 lg:px-8 flex items-center'>
          <Link href={"/store"} className='ml-4 flex lg:ml-0 gap-x-2'>
            <span className='font-bold text-xl'>STORE</span>
          </Link>
          <MainNav data={categories} />
          <NavbarActions />
        </div>
      </Container>
    </div>
  )
}
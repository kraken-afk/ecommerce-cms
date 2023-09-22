'use client'

import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export type MainNavProps = {
  data: Category[]
}

export function MainNav(props: MainNavProps) {
  const pathname = usePathname()
  const routes = props.data.map(route => ({
    href: `/store/category/${route.id}`,
    label: route.name,
    active: pathname === `/store/category/${route.id}`
  }))

  return (
    <nav
      className='mx-6 flex items-center space-x-4 lg:space-x-6 py-6'
    >
      {
        routes.map(route => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "text-sm font-medium transition-colors hover:text-black",
              route.active ? "text-black" : 'text-neutral-500'
            )}
          >
            {route.label}
          </Link>
        ))
      }
    </nav>
  )
}
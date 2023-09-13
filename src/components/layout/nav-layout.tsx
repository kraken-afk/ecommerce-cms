'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import { HTMLAttributes } from 'react'

type Props = HTMLAttributes<HTMLDivElement>

export function NavLayout(props: Props) {
  const pathname = usePathname()
  const params = useParams()

  const routes = [
    {
      href: `/dashboard/${params.storeId}`,
      label: 'Overview',
      active: pathname === `/dashboard/${params.storeId}`
    },
    {
      href: `/dashboard/${params.storeId}/billboards`,
      label: 'Billboards',
      active: pathname === `/dashboard/${params.storeId}/billboards`
    },
    {
      href: `/dashboard/${params.storeId}/settings`,
      label: 'Settings',
      active: pathname === `/dashboard/${params.storeId}/settings`
    },
    {
      href: `/dashboard/${params.storeId}/categories`,
      label: 'Categories',
      active: pathname === `/dashboard/${params.storeId}/categories`
    },
    {
      href: `/dashboard/${params.storeId}/sizes`,
      label: 'Sizes',
      active: pathname === `/dashboard/${params.storeId}/sizes`
    },
  ]

  return (
    <div
      className={cn('flex items-center space-x-4 lg:space-x-6', props.className)}
      {...props}
    >
      {
        routes.map(route =>
          <Link
            key={route.href}
            href={route.href}
            className={
              cn('text-sm font-medium transition-colors hover:text-primary', route.active ? 'text-black dark:text-white' : 'text-muted-foreground')
            }
          >
            {route.label}
          </Link>
        )
      }
    </div>
  )
}
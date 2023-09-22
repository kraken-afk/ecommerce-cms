'use client'

import { Button } from '@/components/ui/button'
import { ShoppingBag } from 'lucide-react'
import { useEffect, useState } from 'react'

export function NavbarActions() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted)
    return null

  return (
    <div className='ml-auto flex items-centergap-x-4'>
      <Button size={'sm'} className='space-x-1'>
        <ShoppingBag
          size={20}
          color='white'
        />
        <span>0</span>
      </Button>
    </div>
  )
}
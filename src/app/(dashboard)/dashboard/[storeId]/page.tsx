'use client'

import { NotFound } from '@/components/exceptions/not-found'
import { Navigation } from '@/components/layout/navigation'
import { StoreInstanceContext } from '@/context/store-instance-context'
import { useContext } from 'react'

export default function Page() {
  const store = useContext(StoreInstanceContext)

  if (!store) return <NotFound />

 return (
  <>
     <Navigation />
     <p>{store.id}</p>
     <p>{store.name}</p>
  </>
 )
}
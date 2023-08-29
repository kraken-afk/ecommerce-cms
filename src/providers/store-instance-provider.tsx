'use client'

import { PropsWithChildren } from 'react'
import { StoreInstanceContext } from '@/context/store-instance-context'
import { Store } from '@prisma/client'

export function StoreInstanceProvider({ children, store }: { store: Store } & PropsWithChildren) {
  return (
    <StoreInstanceContext.Provider value={store}>
      {children}
    </StoreInstanceContext.Provider>
  )
}
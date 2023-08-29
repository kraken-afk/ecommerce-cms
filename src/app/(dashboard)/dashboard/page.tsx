'use client'

import { useStoreModal } from '@/hooks/use-store-modal'
import { useEffect } from 'react'

function Page() {
  const { onOpen, isOpen } = useStoreModal()

  // if user doesn't have store, pop a modal form.
  useEffect(() => {
    if (!isOpen) onOpen()
  })

  return (
    <>
      <h1>default dashboard</h1>
    </>
  )
}

export default Page;
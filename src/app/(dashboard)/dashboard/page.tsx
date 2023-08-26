'use client'

import { Navigation } from '@/components/layout/navigation'
import { useStoreModal } from '@/hooks/use-store-modal'
import { useEffect } from 'react'

function Page() {
  const { onOpen, isOpen } = useStoreModal()

  useEffect(() => {
    if (!isOpen) onOpen()
  })

  return (
    <>
      <Navigation />
    </>
  )
}

export default Page;
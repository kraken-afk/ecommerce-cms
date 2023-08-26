'use client'

import { Modal } from '@/components/ui/modal'
import { useStoreModal } from '@/hooks/use-store-modal'

export function StoreModal() {
  const { isOpen, onClose, onOpen } = useStoreModal()

  return (
    <Modal
      title='Create store'
      description='Add a new store to manage products and categories'
      isOpen={isOpen}
      onClose={onClose}
    >
      Future create modal
    </Modal>
  )
}
'use client'

import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal'
import { useEffect, useState } from 'react'

type Props = {
  isOpen: boolean,
  loading: boolean,
  onClose: () => void,
  onConfirm: () => void,
}

export function AlertModal(props: Props) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null;

  return (
    <Modal
      title='Are you sure?'
      description='This action cannot be undone'
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <div className='pt-6 space-x-2 flex items-center justify-end w-full'>
        <Button disabled={props.loading} variant={'outline'} onClick={props.onClose}>
          Cancel
        </Button>
        <Button disabled={props.loading} variant={'destructive'} onClick={props.onConfirm}>
          Delete
        </Button>
      </div>
    </Modal>
  )
}

'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { PropsWithChildren } from 'react'

type ModalProps = {
  title: string,
  description: string,
  isOpen: boolean,
  onClose: () => void,
} & PropsWithChildren

export function Modal({
  title,
  description,
  isOpen,
  children,
  onClose,
}: ModalProps) {
  const onChange = (open: boolean) => !open && onClose()

  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  )
}
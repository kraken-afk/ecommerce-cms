'use-client'

import { SizeColumn } from '@/app/(dashboard)/dashboard/[storeId]/sizes/components/columns'
import { AlertModal } from '@/components/layout/alert-modal'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Copy, Edit, MoreHorizontal, Trash } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'

type Props = {
  data: SizeColumn,
}

export function CellAction({ data }: Props) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const router = useRouter()
  const params = useParams()
  const onCopy = () => {
    navigator.clipboard.writeText(data.id)
    toast.success('API route copied to clipboard')
  }
  const onUpdate = () => {
    router.push(`/dashboard/${params.storeId}/sizes/${data.id}`)
  }
  const onDelete = async () => {
    setLoading(true)
    toast.promise(
      fetch(`/api/stores/${params?.storeId}/sizes/${data.id}`, {
        method: 'DELETE',
      }),
      {
        error: 'Make sure you removed all product using this size first.',
        loading: 'Deleting size..',
        success: 'size deleted.'
      }
    )
    setLoading(false)
    setOpen(false)
     window.location.reload()
  }

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={'ghost'} className='h-8 w-8 p-0'>
            <span className='sr-only'>Open menu</span>
            <MoreHorizontal className='w-4 h-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>
            Actions
          </DropdownMenuLabel>
          <DropdownMenuItem onClick={onCopy}>
            <Copy className='mr-2 h-4 w-4' />
            Copy ID
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onUpdate}>
            <Edit className='mr-2 h-4 w-4' />
            Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className='mr-2 h-4 w-4' />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
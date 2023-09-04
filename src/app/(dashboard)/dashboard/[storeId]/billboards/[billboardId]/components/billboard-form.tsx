'use client'

import * as z from 'zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Trash } from 'lucide-react'
import { Billboard } from '@prisma/client'
import { Heading } from '@/components/ui/heading'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { Separator } from '@/components/ui/separator'
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { billboardSchema } from '@/lib/types'
import { useParams, useRouter } from 'next/navigation'
import { AlertModal } from '@/components/layout/alert-modal'
import { ImageUpload } from '@/components/ui/image-upload'
import toast from 'react-hot-toast'

type Props = {
  initialData: Billboard | null
}

type BillboardFormValues = z.infer<typeof billboardSchema>

export function BillboardForm({ initialData }: Props) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const params = useParams()
  const router = useRouter()
  const title = initialData ? 'Edit Billboard' : 'Create Billboard'
  const description = initialData ? 'Edit a billboard' : 'Create a new Billboard'
  const toastMessage = initialData ? 'Billboard Edited' : 'Billboard Created'
  const action = initialData ? 'Save changes' : 'Create'

  const form = useForm<BillboardFormValues
  >({
    resolver: zodResolver(billboardSchema),
    defaultValues: initialData || {
      label: '',
      imgUrl: '',
    }
  })
  const submitHandler = async (data: BillboardFormValues) => {
    try {
      setLoading(true)

      if (initialData)
        await fetch(`/api/stores/${params?.storeId}/billboards/${params.billboardId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
      else
        await fetch(`/api/stores/${params?.storeId}/billboards`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })

      toast.success(toastMessage)
      setTimeout(() => router.refresh(), 2000)
    } catch (error) {
      toast.error('Something went error')
    } finally {
      setLoading(false)
    }
  }
  const onDelete = async () => {
    try {
      setLoading(true)
      await fetch(`/api/stores/${params?.storeId}/billboards`, {
        method: 'DELETE',
      })
      toast.success('Store deleted')
      window.location.assign('/dashboard')
    } catch (error) {
      toast.error('Make sure you removed all categories using this billboards first.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className='flex items-center justify-between'>
        <Heading
          title={title}
          description={description}
        />
        {
          initialData &&
          <Button
            variant={'destructive'}
            size={'sm'}
            onClick={() => setOpen(true)}
          >
            <Trash className='w-4 h-4' />
          </Button>
        }
      </div>
      <Separator className='my-6' />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitHandler)}>
          <FormField
            control={form.control}
            name='imgUrl'
            render={({ field }) =>
              <FormItem>
                <FormLabel>Background Image</FormLabel>
                <ImageUpload
                  value={field.value ? [field.value] : []}
                  disabled={loading}
                  onChange={(url) => field.onChange(url)}
                  onRemove={() => field.onChange('')}
                />
                <FormMessage />
              </FormItem>
            }
          />
          <div className='grid grid-cols-3 gap-12'>
            <FormField
              control={form.control}
              name='label'
              render={({ field }) =>
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <Input disabled={loading} placeholder='Billboard label...' {...field} />
                  <FormMessage />
                </FormItem>
              }
            />

          </div>
          <Button disabled={loading} type='submit' className='mt-6 w-32 h-10'>
            {action}
          </Button>
        </form>
      </Form>
    </>
  )
}
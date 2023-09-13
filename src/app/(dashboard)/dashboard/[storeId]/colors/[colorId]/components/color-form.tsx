'use client'

import * as z from 'zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Trash } from 'lucide-react'
import { Size } from '@prisma/client'
import { Heading } from '@/components/ui/heading'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { Separator } from '@/components/ui/separator'
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { colorSchema } from '@/lib/types'
import { useParams, useRouter } from 'next/navigation'
import { AlertModal } from '@/components/layout/alert-modal'
import { ImageUpload } from '@/components/ui/image-upload'
import toast from 'react-hot-toast'

type Props = {
  initialData: Size | null
}

type ColorFormValues = z.infer<typeof colorSchema>

export function ColorForm({ initialData }: Props) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const params = useParams()
  const router = useRouter()
  const title = initialData ? 'Edit Color' : 'Create Color'
  const description = initialData ? 'Edit a Color' : 'Create a new Color'
  const toastMessage = initialData ? 'Color Edited' : 'Color Created'
  const action = initialData ? 'Save changes' : 'Create'

  const form = useForm<ColorFormValues
  >({
    resolver: zodResolver(colorSchema),
    defaultValues: initialData || {
      name: '',
      value: '',
    }
  })
  const submitHandler = async (data: ColorFormValues) => {
    try {
      setLoading(true)

      if (initialData)
        await fetch(`/api/stores/${params?.storeId}/colors/${params.colorId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
      else
        await fetch(`/api/stores/${params?.storeId}/colors`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })

      toast.success(toastMessage)
      setTimeout(() => {
        router.refresh()
        window.location.assign(`/dashboard/${params.storeId}/colors`)
      }, 1000)
    } catch (error) {
      toast.error('Something went error')
    } finally {
      setLoading(false)
    }
  }
  const onDelete = async () => {
    try {
      setLoading(true)
      const res = await fetch(`/api/stores/${params?.storeId}/colors/${params.colorId}`, {
        method: 'DELETE',
      })
      console.log(res)
      toast.success('Color deleted')
      window.location.assign(`/dashboard/${params.storeId}/colors`)
    } catch (error) {
      toast.error('Make sure you removed all product using this color first.')
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
          <div className='grid grid-cols-3 gap-12'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) =>
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <Input disabled={loading} placeholder='Color name...' {...field} />
                  <FormMessage />
                </FormItem>
              }
            />

            <FormField
              control={form.control}
              name='value'
              render={({ field }) =>
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <div className='flex items-center gap-x-4'>
                    <Input disabled={loading} placeholder='Color value...' {...field} />
                    <div className='border p-4 rounded-full' style={{ backgroundColor: field.value }} />
                  </div>
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

'use client'

import * as z from 'zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Trash } from 'lucide-react'
import { Billboard, Category } from '@prisma/client'
import { Heading } from '@/components/ui/heading'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { Separator } from '@/components/ui/separator'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { categorySchema } from '@/lib/types'
import { useParams, useRouter } from 'next/navigation'
import { AlertModal } from '@/components/layout/alert-modal'
import toast from 'react-hot-toast'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

type Props = {
  initialData: Category | null
  billboards: Billboard[]
}

type CategoryFormValues = z.infer<typeof categorySchema>

export function CategoryForm({ initialData, billboards }: Props) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const params = useParams()
  const router = useRouter()
  const title = initialData ? 'Edit Category' : 'Create Category'
  const description = initialData ? 'Edit a Category' : 'Create a new Category'
  const toastMessage = initialData ? 'Category Edited' : 'Category Created'
  const action = initialData ? 'Save changes' : 'Create'

  const form = useForm<CategoryFormValues
  >({
    resolver: zodResolver(categorySchema),
    defaultValues: initialData || {
      name: '',
      billboardId: '',
    }
  })
  const submitHandler = async (data: CategoryFormValues) => {
    try {
      setLoading(true)

      if (initialData)
        await fetch(`/api/stores/${params?.storeId}/categories/${params.categoryId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
      else
        await fetch(`/api/stores/${params?.storeId}/categories`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })

      toast.success(toastMessage)
      setTimeout(() => {
        router.refresh()
        window.location.assign(`/dashboard/${params.storeId}/categories`)
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
      const res = await fetch(`/api/stores/${params?.storeId}/categories/${params.categoryId}`, {
        method: 'DELETE',
      })
      toast.success('Store deleted')
      window.location.assign(`/dashboard/${params.storeId}/categories`)
    } catch (error) {
      toast.error('Make sure you removed all products using this category first.')
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
                  <FormLabel>Label</FormLabel>
                    <Input disabled={loading} placeholder='Category name...' {...field} />
                  <FormMessage />
                </FormItem>
              }
            />
            <FormField
              control={form.control}
              name='billboardId'
              render={({ field }) =>
                <FormItem>
                  <FormLabel>Billboard</FormLabel>
                    <Select
                      disabled={loading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                          defaultValue={field.value}
                          placeholder={'Select a billboard'}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {
                          billboards.map((billboard) =>
                            <SelectItem
                              key={billboard.id}
                              value={billboard.id}
                            >
                              {billboard.label}
                            </SelectItem>
                          )
                        }
                      </SelectContent>
                    </Select>
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

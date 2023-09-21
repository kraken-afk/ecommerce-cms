'use client'

import * as z from 'zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Trash } from 'lucide-react'
import { Category, Color, Image, Product, Size } from '@prisma/client'
import { Heading } from '@/components/ui/heading'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { Separator } from '@/components/ui/separator'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { productSchema } from '@/lib/types'
import { useParams, useRouter } from 'next/navigation'
import { AlertModal } from '@/components/layout/alert-modal'
import { ImageUpload } from '@/components/ui/image-upload'
import toast from 'react-hot-toast'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'

type Props = {
  initialData: Product & {
    images: Image[]
  } | null,
  categories: Category[],
  colors: Color[],
  sizes: Size[],
}

type ProductFormValues = z.infer<typeof productSchema>

export function ProductForm({ initialData, categories, colors, sizes }: Props) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const params = useParams()
  const router = useRouter()
  const title = initialData ? 'Edit Product' : 'Create Product'
  const description = initialData ? 'Edit a product' : 'Create a new Product'
  const toastMessage = initialData ? 'Product Edited' : 'Product Created'
  const action = initialData ? 'Save changes' : 'Create'

  const form = useForm<ProductFormValues
  >({
    resolver: zodResolver(productSchema),
    defaultValues: initialData ? {
      ...initialData,
      price: parseFloat(String(initialData?.price))
    } : {
      name: '',
      images: [],
      price: 0,
      categoryId: '',
      colorId: '',
      sizeId: '',
      isFeatured: false,
      isArchived: false,
    }
  })
  const submitHandler = async (data: ProductFormValues) => {
    try {
      setLoading(true)

      if (initialData)
        await fetch(`/api/stores/${params?.storeId}/products/${params.productId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
      else
        await fetch(`/api/stores/${params?.storeId}/products`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })

      toast.success(toastMessage)
      setTimeout(() => {
        router.refresh()
        window.location.assign(`/dashboard/${params.storeId}/products`)
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
      const res = await fetch(`/api/stores/${params?.storeId}/products/${params.productId}`, {
        method: 'DELETE',
      })
      console.log(res)
      toast.success('Product deleted')
      window.location.assign(`/dashboard/${params.storeId}/products`)
    } catch (error) {
      toast.error('Something went wrong')
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
            name='images'
            render={({ field }) =>
              <FormItem>
                <FormLabel>Images</FormLabel>
                <ImageUpload
                  value={field.value.map(img => img.url)}
                  disabled={loading}
                  onChange={(url) => field.onChange([...field.value, { url }])}
                  onRemove={(url) => field.onChange([...field.value.filter(img => img.url !== url)])}
                />
                <FormMessage />
              </FormItem>
            }
          />
          <div className='grid grid-cols-3 gap-12'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) =>
                <FormItem>
                  <FormLabel>name</FormLabel>
                  <Input disabled={loading} placeholder='Product name...' {...field} />
                  <FormMessage />
                </FormItem>
              }
            />
            <FormField
              control={form.control}
              name='price'
              render={({ field }) =>
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <Input type='number' disabled={loading} placeholder='9.99' {...field} />
                  <FormMessage />
                </FormItem>
              }
            />
            <FormField
              control={form.control}
              name='categoryId'
              render={({ field }) =>
                <FormItem>
                  <FormLabel>Category</FormLabel>
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
                          placeholder={'Select a category'}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {
                        categories.map((category) =>
                          <SelectItem
                            key={category.id}
                            value={category.id}
                          >
                            {category.name}
                          </SelectItem>
                        )
                      }
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              }
            />
            <FormField
              control={form.control}
              name='sizeId'
              render={({ field }) =>
                <FormItem>
                  <FormLabel>Size</FormLabel>
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
                          placeholder={'Select a size'}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {
                        sizes.map((size) =>
                          <SelectItem
                            key={size.id}
                            value={size.id}
                          >
                            {size.name}
                          </SelectItem>
                        )
                      }
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              }
            />
            <FormField
              control={form.control}
              name='colorId'
              render={({ field }) =>
                <FormItem>
                  <FormLabel>Color</FormLabel>
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
                          placeholder={'Select a color'}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {
                        colors.map((color) =>
                          <SelectItem
                            key={color.id}
                            value={color.id}
                          >
                            {color.name}
                          </SelectItem>
                        )
                      }
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              }
            />
            <FormField
              control={form.control}
              name='isFeatured'
              render={({ field }) =>
                <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className='space-y-1 leading-none'>
                    <FormLabel>
                      Featured
                    </FormLabel>
                    <FormDescription>
                      This Product will appear on the homepae
                    </FormDescription>
                  </div>
                </FormItem>
              }
            />
            <FormField
              control={form.control}
              name='isArchived'
              render={({ field }) =>
                <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className='space-y-1 leading-none'>
                    <FormLabel>
                      Archived
                    </FormLabel>
                    <FormDescription>
                      This Product will not appear anywhere in the store
                    </FormDescription>
                  </div>
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

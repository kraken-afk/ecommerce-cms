'use client'

import * as z from 'zod'
import { Modal } from '@/components/ui/modal'
import { useStoreModal } from '@/hooks/use-store-modal'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { Store } from '@prisma/client'
import toast from 'react-hot-toast'

const formSchema = z.object({
  name: z.string().min(1)
})

export function StoreModal() {
  const { isOpen, onClose } = useStoreModal()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema as any),
    defaultValues: {
      name: ''
    }
  })
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true)

      const response = await (await fetch('/api/stores', {
        method: "POST",
        body: JSON.stringify(values)
      })).json() as Store


      toast.success('Store created.')
      setTimeout(() => window.location.assign(`/dashboard/${response.id}`), 800)
    } catch (err) {
      console.error(err)
      toast.error('Something went error')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Modal
      title='Create store'
      description='Add a new store to manage products and categories'
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className='space-y-4 py-2 pb-4'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Ecommerce...' {...field} disabled={isLoading}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='pt-6 space-x-2 flex items-center justify-end'>
              <Button type='button' onClick={onClose} variant={'outline'} disabled={isLoading}>Cancel</Button>
              <Button type='submit' disabled={isLoading}>Save</Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  )
}
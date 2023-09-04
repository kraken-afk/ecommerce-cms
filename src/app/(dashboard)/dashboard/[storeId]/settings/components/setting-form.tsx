'use client'

import * as z from 'zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { RotateCcw, Trash } from 'lucide-react'
import { Store } from '@prisma/client'
import { Heading } from '@/components/ui/heading'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { Separator } from '@/components/ui/separator'
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { formSchema } from '@/lib/types'
import { useParams, useRouter } from 'next/navigation'
import styles from '@/styles/animate.module.css'
import toast from 'react-hot-toast'

type Props = {
  initialData: Store
}

type SettingsFormValues = z.infer<typeof formSchema>

export function SettingForm({ initialData }: Props) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const params = useParams()
  const router = useRouter()
  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
  })
  const submitHandler = async ({ name }: { name: string }) => {
    try {
      setLoading(true);
      await fetch(`/api/stores/${params?.storeId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name })
      })
      toast.success('Name updated')
      setTimeout(() => router.refresh(), 2000)
    } catch (error) {
      toast.error('Something went error')
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          title='Settings'
          description='Manage store preferences'
        />
        <Button
          variant={'destructive'}
          size={'sm'}
          onClick={() => { }}
        >
          <Trash className='w-4 h-4' />
        </Button>
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitHandler)}>
          <div className='grid grid-cols-3 gap-12'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) =>
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <Input disabled={loading} placeholder='Store name...' {...field} />
                  <FormMessage />
                </FormItem>
              }
            />
          </div>
        <Button disabled={loading} type='submit' className='mt-6 w-32 h-10'>
          {
            loading
              ? <RotateCcw size={'1rem'} className={cn(styles.rotate_animate, 'block')} />
              : 'Save changes'
          }
        </Button>
        </form>
      </Form>
    </>
  )
}
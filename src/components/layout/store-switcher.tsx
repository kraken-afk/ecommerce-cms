'use client'

import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from '@/components/ui/command'
import { PopoverContent, Popover, PopoverTrigger } from '@/components/ui/popover'
import { useStoreModal } from '@/hooks/use-store-modal'
import { cn } from '@/lib/utils'
import { Store } from '@prisma/client'
import { Check, ChevronsUpDown, PlusCircle, StoreIcon } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { ComponentPropsWithoutRef, useState } from 'react'

type PopoverTriggerProps = ComponentPropsWithoutRef<typeof PopoverTrigger>
type Props = PopoverTriggerProps & {
  items?: Store[]
}

export function StoreSwitcher(props: Props) {
  const items = props.items || []
  const storeModal = useStoreModal()
  const params = useParams()
  const router = useRouter()
  const formattedItem = items.map((item) => ({
    label: item.name,
    value: item.id,
  }))
  const activeStore = formattedItem.find((item) => item.value === params.storeId)
  const [open, setOpen] = useState(false)
  const onStoreSelect = (store: { value: string, label: string }) => {
    setOpen(false)
    router.push(`/dashboard/${store.value}`)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          size={'sm'}
          role='combobox'
          aria-expanded={open}
          aria-label='Select a store'
          className={cn('w-[200px] justify-between', props.className)}
        >
          <StoreIcon className='mr-2 h-4 w-4' />
          {activeStore?.label}
          <ChevronsUpDown
            className='ml-auto h-4 w-4 shrink-0 opacity-50 '
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0'>
        <Command>
          <CommandList>
            <CommandInput placeholder='Search store...' />
            <CommandEmpty>No store found..</CommandEmpty>
            <CommandGroup heading='Stores'>
              {
                formattedItem.map((store) =>
                  <CommandItem
                    key={store.value}
                    onSelect={() => onStoreSelect(store)}
                    className='text-sm'
                  >
                    <StoreIcon className='mr-2 h-4 w-4'></StoreIcon>
                    {store.label}
                    <Check className={
                      cn(
                        'ml-auto h-4 w-4',
                        activeStore?.value === store.value
                        ? 'opacity-100'
                        : 'opacity-0'
                      )
                    } />
                  </CommandItem>
                )
              }
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false)
                  storeModal.onOpen()
                }}
              >
                <Button
                  variant={'ghost'}
                  size={'sm'}
                  role='dialog'
                  aria-expanded={storeModal.isOpen}
                  aria-label='Create new store'
                  className='w-full h-6'
                >
                  <PlusCircle
                    className='mr-2 h-5 w-5'
                  />
                  Create Store
                </Button>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
'use client'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { useRouter, useSearchParams } from 'next/navigation'
import qs from 'query-string'

type FilterProps = {
  data: (Size | Color)[],
  name: string,
  valueKey: string
}

export function Filter({ data, name, valueKey }: FilterProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const selectedValue = searchParams.get(valueKey)
  const onClickHandler = (id: string) => {
    const current = qs.parse(searchParams.toString())
    const query = {
      ...current,
      [valueKey]: id
    }
    if (current[valueKey] === id) {
      query[valueKey] = null
    }

    const url = qs.stringifyUrl({
      url: window.location.href,
      query
    }, { skipNull: true })

    router.push(url)
  }

  return (
    <div className='mb-8'>
      <h3 className='text-lg font-semibold'>
        {name}
      </h3>
      <Separator className='my-4' />
      <div className='flex items-center'>
        {data.map(filter => (
          <div key={filter.id} className='flex items-center'>
            <Button variant={
              selectedValue === filter.id
                ? 'default'
                : 'outline'
            }
              onClick={() => onClickHandler(filter.id)}
            >
              {filter.name}
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
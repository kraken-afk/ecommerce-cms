import { Currency } from '@/app/(public)/components/ui/currency'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ShoppingCart } from 'lucide-react'

type InfoProps = {
  data: Product
}

export function Info({ data }: InfoProps) {
  return (
    <div>
      <h1 className='text-3xl font-bold text-gray-900'>{data.name}</h1>
      <div className='mt-3 flex flex-col items-start justify-between'>
        <p className='text-2xl text-gray-900'>
          <Currency value={data.price} />
        </p>
        <Separator className="my-4" />
        <div className='flex flex-col justify-end gap-y-4'>
          <div className='flex items-center gap-x-4'>
            <h3 className='font-semibold text-black'>
              Size:
            </h3>
            <div className='font-semibold'>{data.size.name}</div>
          </div>
          <div className='flex items-center gap-x-4'>
            <h3 className='font-semibold text-black'>
              Color:
            </h3>
            <div className='h-6 w-6 rounded-full border border-gray-600' style={{ backgroundColor: data.color.value }} />
          </div>
        </div>
        <div className='mt-10 flex items-center gap-x-3'>
          <Button size={'lg'} className='flex item-center gap-2'>
            Add to Cart
            <ShoppingCart />
          </Button>
        </div>
      </div>
    </div>
  )
}
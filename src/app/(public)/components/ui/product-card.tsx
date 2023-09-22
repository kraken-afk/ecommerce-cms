'use client'

import { Currency } from '@/app/(public)/components/ui/currency'
import { IconButton } from '@/app/(public)/components/ui/icon-button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { usePreviewModal } from '@/hooks/use-preview-modal'
import { Expand, ShoppingCart } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { MouseEventHandler } from 'react'

type ProductCardProps = {
  data: Product
}

export function ProductCard({ data }: ProductCardProps) {
  const previewModal = usePreviewModal()
  const router = useRouter()
  const handleClick = () => {
    router.push(`/store/product/${data.id}`)
  }
  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation()
    previewModal.onOpen(data)
  }

  return (
    <Card className='cursor-pointer w-[240px] group relative' onClick={handleClick}>
      <CardHeader>
        <img
          src={data.Image[0].url}
          alt='Img'
          className='aspect-square object-cover rounded-md'
        />
      </CardHeader>
      <CardContent>
        <CardTitle className='font-semibold text-lg'>{data.name}</CardTitle>
        <CardDescription>
          {data.category.name}
        </CardDescription>
        <div className='pt-4 flex items-center justify-between'>
          <Currency value={data?.price} />
        </div>
      </CardContent>
      <div className='opacity-0 group-hover:opacity-100 transition absolute w-full px-6 top-48'>
        <div className='flex gap-x-6 justify-center'>
          <IconButton
            icon={<Expand size={20} className='text-gray-500' />}
            onClick={onPreview}
          />
          <IconButton
            icon={<ShoppingCart size={20} className='text-gray-500' />}
            onClick={() => alert("Hello")}
          />
        </div>
      </div>
    </Card>
  )
}
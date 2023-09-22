'use client'

import { Button } from '@/components/ui/button'
import { ImagePlus, Trash } from 'lucide-react'
import { useEffect, useState } from 'react'
import { CldUploadWidget } from 'next-cloudinary'
import Image from 'next/image'

type Props = {
  disabled?: boolean,
  value: string[],
  onChange: (value: string) => void,
  onRemove: (value: string) => void,
}

export function ImageUpload({ onChange, onRemove, value, disabled }: Props) {
  const [isMounted, setIsMounted] = useState(false)
  const onUpload = (result: any) => {
    onChange(result.info.secure_url)
  }

  useEffect(() => {
    setIsMounted(true)
  }, [])


  if (!isMounted) return null

  return (
    <div>
      <div className='mb-4 flex flex-4 items-center gap-4'>
        {
          value.map((url) =>
            <div key={url} className='relative w-[200px] h-[200px] rounded-md overflow-hidden'>
              <div className='z-10 absolute top-2 right-2'>
                <Button
                  type='button'
                  onClick={() => onRemove(url)}
                  variant={'destructive'}
                  size={'icon'}
                >
                  <Trash className='h-4 w-4' />
                </Button>
              </div>
              <Image
                fill
                className='object-cover'
                alt='Image'
                src={url}
              />
            </div>
          )
        }
      </div>
      <CldUploadWidget onUpload={onUpload} uploadPreset='cgzagwui'>
        {({ open }) => {
          const onClick = () => open()

          return (
            <Button
              title='Button'
              disabled={disabled}
              variant={'secondary'}
              onClick={onClick}
            >
              <ImagePlus className='h-4 w-4 mr-2' />
              Upload an Image
            </Button>
          )
        }}
      </CldUploadWidget>
    </div>
  )
}
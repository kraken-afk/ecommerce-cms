'use client'

import { GalleryTab } from '@/app/(public)/components/gallery/gallery-tab'
import { Tab } from '@headlessui/react'
import Image from 'next/image'

type GalleryProps = {
  images: Image[]
}

export function Gallery(props: GalleryProps) {
  return (
    <Tab.Group as="div" className={'flex flex-col-reverse'}>
      <div className='mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none space-y-6'>
        <Tab.Panels className={'aspect-square w-full max-w-[320px]'}>
          {props.images.map(img => (
            <Tab.Panel key={img.id}>
              <div className='aspect-square relative h-full w-full sm:rounded-lg overflow-hidden'>
                <Image
                  fill
                  src={img.url}
                  alt='Image'
                  className='object-cover object-center'
                />
              </div>
            </Tab.Panel>
          ))}
        </Tab.Panels>
        <Tab.List className={"grid grid-cols-4 gap-6"}>
          {props.images.map(img =>
            <GalleryTab key={img.id} image={img} />
          )}
        </Tab.List>
      </div>
    </Tab.Group>
  )
}
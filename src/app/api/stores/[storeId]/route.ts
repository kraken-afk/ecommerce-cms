import prismadb from '@/lib/prismadb'
import { formSchema } from '@/lib/types'
import { auth } from '@clerk/nextjs'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

export async function PATCH(
  req: NextRequest,
  { params: { storeId } }: { params: { storeId: string } }
  ) {
    try {
      const { userId } = auth()
      const body = await req.json() as z.infer<typeof formSchema>

      if (!body?.name)
        return new NextResponse('Name is required', { status: 400 })

      if (!userId)
        return new NextResponse('Unauthenticanted', { status: 401 })

      if (!storeId)
        return new NextResponse('Store id is required', { status: 400 })

      const store = await prismadb.store.update({
        where: {
          id: storeId,
          userId
        },
        data: {
          name: body.name
        }
      })

      return NextResponse.json(store)
    } catch (error) {
      console.error('[STORE_PATCH]', error)
      return new Response('Internal error', { status: 500 })
    }
}

export async function DELETE(
  _req: NextRequest,
  { params: { storeId } }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth()

    if (!userId)
      return new NextResponse('Unauthenticanted', { status: 401 })

    if (!storeId)
      return new NextResponse('Store id is required', { status: 400 })

    const store = await prismadb.store.delete({
      where: {
        id: storeId,
        userId
      }
    })

    return NextResponse.json(store)
  } catch (error) {
    console.error('[STORE_DELETE]', error)
    return new Response('Internal error', { status: 500 })
  }
}

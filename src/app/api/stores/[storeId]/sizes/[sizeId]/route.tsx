import { auth } from '@clerk/nextjs'
import { sizeSchema } from '@/lib/types'
import { NextRequest, NextResponse } from 'next/server'
import prismadb from '@/lib/prismadb'

export async function GET(
  req: NextRequest,
  { params: { sizeId } }:
    { params: { storeId: string, sizeId: string } }
) {
  try {

    const sizes = await prismadb.size.findUnique({
      where: {
        id: sizeId
      }
    })

    return NextResponse.json(sizes)
  } catch (error) {
    console.error('[SIZE_DELETE]', error)
    return new Response('Internal error', { status: 500 })
  }
}

export async function PATCH(
  req: NextRequest,
  { params: { storeId, sizeId } }:
    { params: { storeId: string, sizeId: string } }
) {
  try {
    const { userId } = auth()
    const body = sizeSchema.safeParse(await req.json())

    if (!body.success)
      return new NextResponse(body.error.message, { status: 400 })

    if (!userId)
      return new NextResponse('Unauthenticanted', { status: 401 })

    if (!storeId)
      return new NextResponse('Store id is required', { status: 400 })

    if (!sizeId)
      return new NextResponse('Size id is required', { status: 400 })

    const { name, value } = body.data

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: storeId,
        userId
      }
    })

    if (!storeByUserId)
      return new NextResponse('Unauthorized', { status: 403 })

    const size = await prismadb.size.update({
      where: {
        id: sizeId
      },
      data: {
        value,
        name
      }
    })

    return NextResponse.json(size)
  } catch (error) {
    console.error('[SIZE_PATCH]', error)
    return new Response('Internal error', { status: 500 })
  }
}

export async function DELETE(
  _req: NextRequest,
  { params: { storeId, sizeId } }:
    { params: { storeId: string, sizeId: string } }
) {
  try {
    const { userId } = auth()

    if (!userId)
      return new NextResponse('Unauthenticanted', { status: 401 })

    if (!storeId)
      return new NextResponse('Store id is required', { status: 400 })

    if (!sizeId)
      return new NextResponse('Size id is required', { status: 400 })

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: storeId,
        userId
      }
    })

    if (!storeByUserId)
      return new NextResponse('Unauthorized', { status: 403 })

    const sizes = await prismadb.size.deleteMany({
      where: {
        id: sizeId
      }
    })


    return NextResponse.json(sizes)
  } catch (error) {
    console.error('[SIZE_DELETE]', error)
    return new Response('Internal error', { status: 500 })
  }
}

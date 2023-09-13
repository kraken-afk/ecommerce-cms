import { auth } from '@clerk/nextjs'
import { colorSchema } from '@/lib/types'
import { NextRequest, NextResponse } from 'next/server'
import prismadb from '@/lib/prismadb'

export async function GET(
  req: NextRequest,
  { params: { colorId } }:
    { params: { storeId: string, colorId: string } }
) {
  try {

    const colors = await prismadb.color.findUnique({
      where: {
        id: colorId
      }
    })

    return NextResponse.json(colors)
  } catch (error) {
    console.error('[COLORS_DELETE]', error)
    return new Response('Internal error', { status: 500 })
  }
}

export async function PATCH(
  req: NextRequest,
  { params: { storeId, colorId } }:
    { params: { storeId: string, colorId: string } }
) {
  try {
    const { userId } = auth()
    const body = colorSchema.safeParse(await req.json())

    if (!body.success)
      return new NextResponse(body.error.message, { status: 400 })

    if (!userId)
      return new NextResponse('Unauthenticanted', { status: 401 })

    if (!storeId)
      return new NextResponse('Store id is required', { status: 400 })

    if (!colorId)
      return new NextResponse('Color id is required', { status: 400 })

    const { name, value } = body.data

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: storeId,
        userId
      }
    })

    if (!storeByUserId)
      return new NextResponse('Unauthorized', { status: 403 })

    const color = await prismadb.color.update({
      where: {
        id: colorId
      },
      data: {
        value,
        name
      }
    })

    return NextResponse.json(color)
  } catch (error) {
    console.error('[COLOR_PATCH]', error)
    return new Response('Internal error', { status: 500 })
  }
}

export async function DELETE(
  _req: NextRequest,
  { params: { storeId, colorId } }:
    { params: { storeId: string, colorId: string } }
) {
  try {
    const { userId } = auth()

    if (!userId)
      return new NextResponse('Unauthenticanted', { status: 401 })

    if (!storeId)
      return new NextResponse('Store id is required', { status: 400 })

    if (!colorId)
      return new NextResponse('Color id is required', { status: 400 })

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: storeId,
        userId
      }
    })

    if (!storeByUserId)
      return new NextResponse('Unauthorized', { status: 403 })

    const colors = await prismadb.color.deleteMany({
      where: {
        id: colorId
      }
    })


    return NextResponse.json(colors)
  } catch (error) {
    console.error('[COLORS_DELETE]', error)
    return new Response('Internal error', { status: 500 })
  }
}

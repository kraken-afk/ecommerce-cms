import { auth } from '@clerk/nextjs'
import { billboardSchema } from '@/lib/types'
import { NextRequest, NextResponse } from 'next/server'
import prismadb from '@/lib/prismadb'

export async function GET(
  req: NextRequest,
  { params: { billboardId } }:
    { params: { storeId: string, billboardId: string } }
) {
  try {

    const billboards = await prismadb.billboard.findUnique({
      where: {
        id: billboardId
      }
    })

    return NextResponse.json(billboards)
  } catch (error) {
    console.error('[BILLBOARD_DELETE]', error)
    return new Response('Internal error', { status: 500 })
  }
}

export async function PATCH(
  req: NextRequest,
  { params: { storeId, billboardId } }:
    { params: { storeId: string, billboardId: string } }
) {
  try {
    const { userId } = auth()
    const body = billboardSchema.safeParse(await req.json())

    if (!body.success)
      return new NextResponse(body.error.message, { status: 400 })

    if (!userId)
      return new NextResponse('Unauthenticanted', { status: 401 })

    if (!storeId)
      return new NextResponse('Store id is required', { status: 400 })

    if (!billboardId)
      return new NextResponse('Billboard id is required', { status: 400 })

    const { imgUrl, label } = body.data

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: storeId,
        userId
      }
    })

    if (!storeByUserId)
      return new NextResponse('Unauthorized', { status: 403 })

    const billboard = await prismadb.billboard.update({
      where: {
        id: billboardId
      },
      data: {
        label,
        imgUrl
      }
    })

    return NextResponse.json(billboard)
  } catch (error) {
    console.error('[BILLBOARD_PATCH]', error)
    return new Response('Internal error', { status: 500 })
  }
}

export async function DELETE(
  _req: NextRequest,
  { params: { storeId, billboardId } }:
    { params: { storeId: string, billboardId: string } }
) {
  try {
    const { userId } = auth()

    if (!userId)
      return new NextResponse('Unauthenticanted', { status: 401 })

    if (!storeId)
      return new NextResponse('Store id is required', { status: 400 })

    if (!billboardId)
      return new NextResponse('Billboard id is required', { status: 400 })

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: storeId,
        userId
      }
    })

    if (!storeByUserId)
      return new NextResponse('Unauthorized', { status: 403 })

    const billboards = await prismadb.billboard.deleteMany({
      where: {
        id: billboardId
      }
    })

    console.log(billboards)

    return NextResponse.json(billboards)
  } catch (error) {
    console.error('[BILLBOARD_DELETE]', error)
    return new Response('Internal error', { status: 500 })
  }
}

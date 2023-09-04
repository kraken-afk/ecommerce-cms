import { auth } from '@clerk/nextjs'
import { billboardSchema } from '@/lib/types'
import { NextRequest, NextResponse } from 'next/server'
import prismadb from '@/lib/prismadb'
import { nanoid } from 'nanoid'

export async function POST(
  req: NextRequest,
  { params: { storeId } }:
    { params: { storeId: string } }
) {
  try {
    const { userId } = auth()
    const body = billboardSchema.safeParse(await req.json())

    console.log(body)

    if (body.success)
    ''
    else {
      console.log(body.error)
    }


    if (!body.success) {
      return new NextResponse(body.error.message, { status: 400 })
    }

    if (!userId)
      return new NextResponse('Unauthenticanted', { status: 401 })

    if (!storeId)
      return new NextResponse('Store id is required', { status: 400 })

    const { imgUrl, label } = body.data

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: storeId,
        userId
      }
    })

    if (!storeByUserId)
      return new NextResponse('Unauthorized', { status: 403 })

    const billboard = await prismadb.billboard.create({
      data: {
        label,
        imgUrl,
        storeId,
        id: nanoid()
      }
    })

    return NextResponse.json(billboard)
  } catch (error) {
    console.error('[BILLBOARD_POST]', error)
    return new Response('Internal error', { status: 500 })
  }
}

export async function GET(
  req: NextRequest,
  { params: { storeId } }:
    { params: { storeId: string, billboardId: string } }
) {
  try {
    const { userId } = auth()

    if (!userId)
      return new NextResponse('Unauthenticanted', { status: 401 })

    if (!storeId)
      return new NextResponse('Store id is required', { status: 400 })

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: storeId,
        userId
      }
    })

    if (!storeByUserId)
      return new NextResponse('Unauthorized', { status: 403 })

    const billboards = prismadb.billboard.findMany({
      where: {
        storeId
      }
    })

    return NextResponse.json(billboards)
  } catch (error) {
    console.error('[BILLBOARD_POST]', error)
    return new Response('Internal error', { status: 500 })
  }
}
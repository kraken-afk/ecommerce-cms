import { auth } from '@clerk/nextjs'
import { colorSchema } from '@/lib/types'
import { NextRequest, NextResponse } from 'next/server'
import { nanoid } from 'nanoid'
import prismadb from '@/lib/prismadb'

export async function POST(
  req: NextRequest,
  { params: { storeId } }:
    { params: { storeId: string } }
) {
  try {
    const { userId } = auth()
    const body = colorSchema.safeParse(await req.json())

    if (!body.success) {
      return new NextResponse(body.error.message, { status: 400 })
    }

    if (!userId)
      return new NextResponse('Unauthenticanted', { status: 401 })

    if (!storeId)
      return new NextResponse('Store id is required', { status: 400 })

    const { name, value } = body.data

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: storeId,
        userId
      }
    })

    if (!storeByUserId)
      return new NextResponse('Unauthorized', { status: 403 })

    const color = await prismadb.color.create({
      data: {
        name,
        value,
        storeId,
        id: nanoid()
      }
    })

    return NextResponse.json(color)
  } catch (error) {
    console.error('[COLORS_POST]', error)
    return new Response('Internal error', { status: 500 })
  }
}

export async function GET(
  req: NextRequest,
  { params: { storeId } }:
    { params: { storeId: string } }
) {
  try {

    if (!storeId)
      return new NextResponse('Store id is required', { status: 400 })

    const colors = await prismadb.color.findMany({
      where: {
        storeId
      }
    })

    return NextResponse.json(colors)
  } catch (error) {
    console.error('[COLORS_POST]', error)
    return new Response('Internal error', { status: 500 })
  }
}
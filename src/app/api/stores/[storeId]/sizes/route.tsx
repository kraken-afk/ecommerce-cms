import { auth } from '@clerk/nextjs'
import { sizeSchema } from '@/lib/types'
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
    const body = sizeSchema.safeParse(await req.json())

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

    const size = await prismadb.size.create({
      data: {
        name,
        value,
        storeId,
        id: nanoid()
      }
    })

    return NextResponse.json(size)
  } catch (error) {
    console.error('[SIZE_POST]', error)
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

    const sizes = await prismadb.size.findMany({
      where: {
        storeId
      }
    })

    return NextResponse.json(sizes)
  } catch (error) {
    console.error('[SIZE_POST]', error)
    return new Response('Internal error', { status: 500 })
  }
}
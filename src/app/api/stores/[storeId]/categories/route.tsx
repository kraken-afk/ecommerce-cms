import { auth } from '@clerk/nextjs'
import { categorySchema } from '@/lib/types'
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
    const body = categorySchema.safeParse(await req.json())

    if (!body.success) {
      return new NextResponse(body.error.message, { status: 400 })
    }

    if (!userId)
      return new NextResponse('Unauthenticanted', { status: 401 })

    if (!storeId)
      return new NextResponse('Store id is required', { status: 400 })

    const { billboardId, name } = body.data

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: storeId,
        userId
      }
    })

    if (!storeByUserId)
      return new NextResponse('Unauthorized', { status: 403 })

    const category = await prismadb.category.create({
      data: {
        name,
        storeId,
        billboardId,
        id: nanoid()
      }
    })

    return NextResponse.json(category)
  } catch (error) {
    console.error('[CATEGORY_POST]', error)
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

    const categories = await prismadb.category.findMany({
      where: {
        storeId
      }
    })

    return NextResponse.json(categories)
  } catch (error) {
    console.error('[CATEGORY_POST]', error)
    return new Response('Internal error', { status: 500 })
  }
}
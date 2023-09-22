import { auth } from '@clerk/nextjs'
import { categorySchema } from '@/lib/types'
import { NextRequest, NextResponse } from 'next/server'
import prismadb from '@/lib/prismadb'

export async function GET(
  _req: NextRequest,
  { params: { categoryId } }:
    { params: { storeId: string, categoryId: string } }
) {
  try {

    const category = await prismadb.category.findUnique({
      where: {
        id: categoryId
      },
      include: {
        billboard: true
      }
    })

    return NextResponse.json(category)
  } catch (error) {
    console.error('[CATEGORY_GET]', error)
    return new Response('Internal error', { status: 500 })
  }
}

export async function PATCH(
  req: NextRequest,
  { params: { storeId, categoryId } }:
    { params: { storeId: string, categoryId: string } }
) {
  try {
    const { userId } = auth()
    const body = categorySchema.safeParse(await req.json())

    if (!body.success)
      return new NextResponse(body.error.message, { status: 400 })

    if (!userId)
      return new NextResponse('Unauthenticanted', { status: 401 })

    if (!storeId)
      return new NextResponse('Store id is required', { status: 400 })

    if (!categoryId)
      return new NextResponse('Category id is required', { status: 400 })

    const { billboardId, name } = body.data

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: storeId,
        userId
      }
    })

    if (!storeByUserId)
      return new NextResponse('Unauthorized', { status: 403 })

    const category = await prismadb.category.update({
      where: {
        id: categoryId
      },
      data: {
        name, billboardId
      }
    })

    return NextResponse.json(category)
  } catch (error) {
    console.error('[CATEGORY_PATCH]', error)
    return new Response('Internal error', { status: 500 })
  }
}

export async function DELETE(
  _req: NextRequest,
  { params: { storeId, categoryId } }:
    { params: { storeId: string, categoryId: string } }
) {
  try {
    const { userId } = auth()

    if (!userId)
      return new NextResponse('Unauthenticanted', { status: 401 })

    if (!storeId)
      return new NextResponse('Store id is required', { status: 400 })

    if (!categoryId)
      return new NextResponse('Category id is required', { status: 400 })

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: storeId,
        userId
      }
    })

    if (!storeByUserId)
      return new NextResponse('Unauthorized', { status: 403 })

    const category = await prismadb.category.deleteMany({
      where: {
        id: categoryId
      }
    })

    return NextResponse.json(category)
  } catch (error) {
    console.error('[CATEGORY_DELETE]', error)
    return new Response('Internal error', { status: 500 })
  }
}

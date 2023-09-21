import { auth } from '@clerk/nextjs'
import { productSchema } from '@/lib/types'
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
    const body = productSchema.safeParse(await req.json())

    if (!body.success) {
      return new NextResponse(body.error.message, { status: 400 })
    }

    if (!userId)
      return new NextResponse('Unauthenticanted', { status: 401 })

    if (!storeId)
      return new NextResponse('Store id is required', { status: 400 })

    const { name, price, images, categoryId, colorId, sizeId, isArchived, isFeatured } = body.data

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: storeId,
        userId
      }
    })

    if (!storeByUserId)
      return new NextResponse('Unauthorized', { status: 403 })

    const billboard = await prismadb.product.create({
      data: {
        name,
        price,
        Image: {
          createMany: {
            data: [
              ...images.map((img: { url: string }) => img)
            ]
          }
        },
        categoryId,
        colorId,
        sizeId,
        isArchived,
        isFeatured,
        storeId,
        id: nanoid()
      }
    })

    return NextResponse.json(billboard)
  } catch (error) {
    console.error('[PRODUCT_POST]', error)
    return new Response('Internal error', { status: 500 })
  }
}

export async function GET(
  req: NextRequest,
  { params: { storeId } }:
    { params: { storeId: string } }
) {
  try {
    const { searchParams } = new URL(req.url)
    const categoryId = searchParams.get('categoryId') || undefined
    const colorId = searchParams.get('colorId') || undefined
    const sizeId = searchParams.get('sizeId') || undefined
    const isFeatured = searchParams.get('isFeatured')

    if (!storeId)
      return new NextResponse('Store id is required', { status: 400 })

    const billboards = await prismadb.product.findMany({
      where: {
        storeId: storeId,
        categoryId,
        colorId,
        sizeId,
        isFeatured: isFeatured ? true : undefined,
        isArchived: false,
      },
      include: {
        Image: true,
        category: true,
        color: true,
        size: true,
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(billboards)
  } catch (error) {
    console.error('[PRODUCT_POST]', error)
    return new Response('Internal error', { status: 500 })
  }
}
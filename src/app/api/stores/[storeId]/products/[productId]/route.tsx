import { auth } from '@clerk/nextjs'
import { productSchema } from '@/lib/types'
import { NextRequest, NextResponse } from 'next/server'
import prismadb from '@/lib/prismadb'

export async function GET(
  req: NextRequest,
  { params: { productId } }:
    { params: { storeId: string, productId: string } }
) {
  try {

    const billboards = await prismadb.product.findUnique({
      where: {
        id: productId
      },
      include: {
        Image: true,
        category: true,
        size: true,
        color: true,
      }
    })

    return NextResponse.json(billboards)
  } catch (error) {
    console.error('[PRODUCT_GET]', error)
    return new Response('Internal error', { status: 500 })
  }
}

export async function PATCH(
  req: NextRequest,
  { params: { storeId, productId } }:
    { params: { storeId: string, productId: string } }
) {
  try {
    const { userId } = auth()
    const body = productSchema.safeParse(await req.json())

    if (!body.success)
      return new NextResponse(body.error.message, { status: 400 })

    if (!userId)
      return new NextResponse('Unauthenticanted', { status: 401 })

    if (!storeId)
      return new NextResponse('Store id is required', { status: 400 })

    if (!productId)
      return new NextResponse('Product id is required', { status: 400 })

    const { name, images, categoryId, colorId, price, sizeId, isArchived, isFeatured } = body.data

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: storeId,
        userId
      }
    })

    if (!storeByUserId)
      return new NextResponse('Unauthorized', { status: 403 })

    await prismadb.product.update({
      where: {
        id: productId
      },
      data: {
        name,
        categoryId,
        colorId,
        price,
        sizeId,
        isArchived,
        isFeatured,
        Image: {
          deleteMany: {}
        },
      }
    })

    const product = await prismadb.product.update({
      where: {
        id: productId
      },
      data: {
        Image: {
          createMany: {
            data: [...images]
          }
        }
      }
    })

    return NextResponse.json(product)
  } catch (error) {
    console.error('[PRODUCT_PATCH]', error)
    return new Response('Internal error', { status: 500 })
  }
}

export async function DELETE(
  _req: NextRequest,
  { params: { storeId, productId } }:
    { params: { storeId: string, productId: string } }
) {
  try {
    const { userId } = auth()

    if (!userId)
      return new NextResponse('Unauthenticanted', { status: 401 })

    if (!storeId)
      return new NextResponse('Store id is required', { status: 400 })

    if (!productId)
      return new NextResponse('product id is required', { status: 400 })

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: storeId,
        userId
      }
    })

    if (!storeByUserId)
      return new NextResponse('Unauthorized', { status: 403 })

    const product = await prismadb.product.deleteMany({
      where: {
        id: productId
      }
    })

    return NextResponse.json(product)
  } catch (error) {
    console.error('[PRODUCT_DELETE]', error)
    return new Response('Internal error', { status: 500 })
  }
}

import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs'
import { NextRequest, NextResponse } from 'next/server'
import { nanoid } from 'nanoid'


export async function POST(req: NextRequest) {
  try {
    const { userId } = auth()
    const body = await req.json()
    const { name } = body

    if (!userId) return new NextResponse("Unauthorized", { status: 401 })
    if (!name) return new NextResponse("Name is required", { status: 400 })

    const store = await prismadb.store.create({
      data: {
        id: nanoid(),
        name, userId
      }
    })

    return NextResponse.json(store)
  } catch (err) {
    console.error('[STORE_POST]: ', err)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
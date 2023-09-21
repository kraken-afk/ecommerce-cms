import {
  OrdersClient
} from '@/app/(dashboard)/dashboard/[storeId]/orders/components/client'
import {
  OrderColumn
} from '@/app/(dashboard)/dashboard/[storeId]/orders/components/columns'
import {
  format
} from 'date-fns'
import prismadb from '@/lib/prismadb'
import {
  formatter
} from '@/lib/utils'

export default async function Page({
  params
}: {
  params: {
    storeId: string
  }
}) {
  const orders = await prismadb.order.findMany({
    where: {
      storeId: params.storeId
    },
    include: {
      orderItems: {
        include: {
          product: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  const formattedOrders: OrderColumn[] =
    orders.map(({
      id,
      phone,
      createdAt,
      address,
      orderItems,
      isPaid,

    }) => {
      return ({
        id,
        phone,
        isPaid,
        address,
        createdAt: format(createdAt, 'MM do, yyyy'),
        products: orderItems.map(item => item.product.name).join(', '),
        totalPrice: formatter.format(orderItems.reduce((total, order) => total + Number(order.product.price), 0)),
      })
    })

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <OrdersClient data={formattedOrders} />
      </div>
    </div>
  )
}
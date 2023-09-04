import { NotFound } from '@/components/exceptions/not-found'
import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

type Props = {
   params: { storeId: string }
}

export default async function Page({ params }: Props) {
   const { userId } = auth()
   if (!userId) redirect('/sign-in')

   const store = await prismadb.store.findFirst({
      where: {
         id: params.storeId,
         userId
      }
   })

   if (!store) return <NotFound />

   return (
      <>
         <p>{store.id}</p>
         <p>{store.name}</p>
      </>
   )
}
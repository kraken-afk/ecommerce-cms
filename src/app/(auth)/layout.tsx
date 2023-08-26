import { Metadata } from 'next'
import { PropsWithChildren } from 'react'

export const metadata: Metadata = {
  title: 'Welcome'
}

function Layout({children}: PropsWithChildren) {
  return (
    <body className='w-full h-[100vh] flex items-center justify-center'>
      {children}
    </body>
   )
}

export default Layout;
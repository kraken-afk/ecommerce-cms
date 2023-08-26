import { Metadata } from 'next'
import { PropsWithChildren } from 'react'

export const metadata: Metadata = {
  title: 'Dashboard'
}

async function Layout({ children }: PropsWithChildren) {
  return (
    <div>
      {children}
    </div>
  )
}

export default Layout
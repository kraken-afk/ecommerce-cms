import { UserButton } from '@clerk/nextjs'

function Page() {
  return (
    <nav className='w-full h-16 border-b flex justify-between items-center px-4'>
      <div>
        <h1>Hello World</h1>
      </div>
      <UserButton />
    </nav>
  )
}

export default Page;
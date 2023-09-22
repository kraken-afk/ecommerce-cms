export function Footer() {
  return (
    <footer className='border-t'>
      <div className='mx-auto py-10'>
        <p className='text-center text-xs text-black'>
          &copy; {new Date().getFullYear()} FakeStore, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
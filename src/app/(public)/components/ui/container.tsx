type ContainerProps = {
  children: any
}

export function Container(props: ContainerProps) {

  return (
    <div className='mx-auto max-w-7xl'>
      {props.children}
    </div>
  )
}
type Props = {
  title: string,
  description: string,
}

export function Heading({ title, description}: Props) {
  return (
    <div>
      <h2 className='text-3xl font-bold tracking-tight mb-3'>{title}</h2>
      <p className='text-sm text-muted-foreground'>{description}</p>
    </div>
  )
}
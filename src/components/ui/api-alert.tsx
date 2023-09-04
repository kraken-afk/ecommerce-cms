import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge, BadgeProps } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CopyIcon, Server } from 'lucide-react'
import toast from 'react-hot-toast'

type Props = {
  title: string,
  description: string,
  variant: 'public' | 'admin'
}

const textMap: Record<Props['variant'], string> = {
  public: 'public',
  admin: 'admin',
}
const variantMap: Record<Props['variant'], BadgeProps['variant']> = {
  public: 'secondary',
  admin: 'destructive',
}

export function ApiAlerts({ title, description, variant }: Props) {
  const onCopy = () => {
    navigator.clipboard.writeText(description)
    toast.success('API route copied to clipboard')
  }

  return (
    <Alert>
      <Server className='w-4 h-4' />
      <AlertTitle className='flex items-center gap-x-2'>
        {title}
        <Badge variant={variantMap[variant]}>
          {textMap[variant].toUpperCase()}
        </Badge>
      </AlertTitle>
      <AlertDescription className='mt-4 flex items-center justify-between'>
        <code className='relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold'>
          {description}
        </code>
        <Button variant={'outline'} size={'sm'} onClick={onCopy}>
          <CopyIcon className='h-4 w-4' />
        </Button>
      </AlertDescription>
    </Alert>
  )
}
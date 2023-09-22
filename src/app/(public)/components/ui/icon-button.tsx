import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type IconButtonProps =
  React.HTMLAttributes<HTMLButtonElement> & { icon: React.ReactNode }

export function IconButton(props: IconButtonProps) {
  return (
    <Button variant={'outline'} size={'icon'} {...props} className={cn(
      'rounded-full hover:scale-125 transition-all', props.className
    )}>
      {props.icon}
    </Button>
  )
}
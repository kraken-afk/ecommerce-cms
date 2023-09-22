'use client'

import { ApiAlerts } from '@/components/ui/api-alert'

export function StoreApi({ storeId }: { storeId: string }) {
  return (
    <ApiAlerts
      title='NEXT_PUBLIC_API_URL'
      variant='public'
      description={origin + `/api/${storeId}`}
    />
  )
}
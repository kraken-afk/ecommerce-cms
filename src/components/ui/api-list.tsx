'use client'

import { ApiAlerts } from '@/components/ui/api-alert'
import { useOrigin } from '@/hooks/use-origin'
import { useParams } from 'next/navigation'

type Props = {
  entityName: string,
  entityIdName: string,
}

export function ApiList({ entityIdName, entityName }: Props) {
  const params = useParams()
  const origin = useOrigin()
  const baseUrl = `${origin}/api/stores/${params.storeId}`
  return (
    <>
      <ApiAlerts
        title='GET'
        variant='public'
        description={`${baseUrl}/${entityName}`}
      />
      <ApiAlerts
        title='GET'
        variant='public'
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
      <ApiAlerts
        title='POST'
        variant='admin'
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
      <ApiAlerts
        title='PATCH'
        variant='admin'
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
      <ApiAlerts
        title='DELETE'
        variant='admin'
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
    </>
  )
}
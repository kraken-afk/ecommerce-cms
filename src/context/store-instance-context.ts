'use client'

import { Store } from '@prisma/client'
import { createContext } from 'react'

export const StoreInstanceContext = createContext<Store | null>(null)

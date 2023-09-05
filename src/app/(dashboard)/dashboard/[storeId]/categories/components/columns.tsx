"use client"

import { CellAction } from '@/app/(dashboard)/dashboard/[storeId]/categories/components/cell-action'
import { ColumnDef } from "@tanstack/react-table"

export type CategoryColumns = {
  id: string
  name: string
  createdAt: string
  billboardLabel: string
}

export const columns: ColumnDef<CategoryColumns>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "billboard",
    header: "Billboard",
    cell: ({ row }) => row.original.billboardLabel
  },
  {
    accessorKey: 'createdAt',
    header: 'Date'
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
]

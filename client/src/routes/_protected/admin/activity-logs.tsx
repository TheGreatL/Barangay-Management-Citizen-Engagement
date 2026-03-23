import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { Activity, Shield, User, Database, Terminal } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { Badge } from '@/shared/components/ui/badge'
import * as React from 'react'
import { DataTable } from '@/shared/components/ui/DataTable'
import type { ColumnDef, PaginationState, SortingState } from '@tanstack/react-table'
import { getActivityLogs } from '@/mock/activity-log-service'
import { Card } from '@/shared/components/ui/card'

export const Route = createFileRoute('/_protected/admin/activity-logs')({
  component: AdminActivityLogsComponent,
})

type ActivityLog = {
  id: string
  user: string
  action: string
  module: string
  details: string
  ipAddress: string
  timestamp: string
}

function AdminActivityLogsComponent() {
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const [sorting, setSorting] = React.useState<SortingState>([{ id: 'timestamp', desc: true }])
  const [searchValue, setSearchValue] = React.useState('')

  const { data, isLoading } = useQuery({
    queryKey: ['admin-activity-logs', pagination, sorting, searchValue],
    queryFn: () =>
      getActivityLogs({
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
        sort: sorting[0]?.id,
        order: sorting[0]?.desc ? 'desc' : 'asc',
        search: searchValue,
      }),
  })

  const columns: ColumnDef<ActivityLog>[] = [
    {
      accessorKey: 'timestamp',
      header: 'Time',
      cell: ({ row }) => {
        const date = new Date(row.getValue('timestamp'))
        return (
          <div className="flex flex-col">
            <span className="font-medium">{date.toLocaleDateString()}</span>
            <span className="text-xs text-muted-foreground">{date.toLocaleTimeString()}</span>
          </div>
        )
      },
    },
    {
      accessorKey: 'user',
      header: 'User',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-full bg-slate-100 flex items-center justify-center">
            <User className="h-3 w-3 text-slate-600" />
          </div>
          <span className="font-medium text-sm">{row.original.user}</span>
        </div>
      ),
    },
    {
      accessorKey: 'action',
      header: 'Action',
      cell: ({ row }) => {
        const action = row.original.action
        return (
          <Badge variant="outline" className="text-[10px] font-mono border-slate-200 bg-slate-50 uppercase">
            {action}
          </Badge>
        )
      },
    },
    {
      accessorKey: 'module',
      header: 'Module',
      cell: ({ row }) => {
        const module = row.original.module
        return (
          <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
            <Terminal className="h-3 w-3" />
            {module}
          </div>
        )
      },
    },
    {
      accessorKey: 'details',
      header: 'Details',
      cell: ({ row }) => <span className="text-sm truncate max-w-[300px] block">{row.original.details}</span>,
    },
    {
      accessorKey: 'ipAddress',
      header: 'IP Address',
      cell: ({ row }) => <span className="text-xs font-mono text-muted-foreground">{row.getValue('ipAddress')}</span>,
    },
  ]

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <Activity className="text-primary h-8 w-8" />
            System Activity Logs
          </h1>
          <p className="text-muted-foreground mt-1">Audit trail for all system actions and security events.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Export CSV</Button>
          <Button variant="outline" className="text-red-600">
            Clear Logs
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-blue-200 bg-blue-50 text-blue-600 p-4 flex items-center justify-between shadow-sm">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest opacity-70 mb-1">Login Events</p>
            <p className="text-2xl font-black">1,245</p>
          </div>
          <Shield className="h-8 w-8 opacity-20" />
        </Card>
        <Card className="border-orange-200 bg-orange-50 text-orange-600 p-4 flex items-center justify-between shadow-sm">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest opacity-70 mb-1">Data Mutations</p>
            <p className="text-2xl font-black">452</p>
          </div>
          <Database className="h-8 w-8 opacity-20" />
        </Card>
        <Card className="border-red-200 bg-red-50 text-red-600 p-4 flex items-center justify-between shadow-sm">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest opacity-70 mb-1">Security Alerts</p>
            <p className="text-2xl font-black">3</p>
          </div>
          <Shield className="h-8 w-8 opacity-20" />
        </Card>
      </div>

      <DataTable
        columns={columns}
        data={data?.data || []}
        pageCount={data?.meta.totalPages}
        pagination={pagination}
        onPaginationChange={setPagination}
        sorting={sorting}
        onSortingChange={setSorting}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        isLoading={isLoading}
        searchPlaceholder="Search by user, action or details..."
      />
    </div>
  )
}


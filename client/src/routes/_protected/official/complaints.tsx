import { createFileRoute } from '@tanstack/react-router'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  CheckCircle2,
  Search,
  MoreHorizontal,
  User,
  MapPin,
  ExternalLink,
  ShieldAlert,
} from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { Badge } from '@/shared/components/ui/badge'
import { DataTable } from '@/shared/components/ui/DataTable'
import type { ColumnDef } from '@tanstack/react-table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'
import * as React from 'react'
import {
  getOfficialComplaints,
  updateOfficialComplaintStatus,
} from '@/mock/official-service'
import { cn } from '@/shared/lib/utils'

export const Route = createFileRoute('/_protected/official/complaints')({
  component: OfficialComplaintsComponent,
})

type OfficialComplaint = {
  id: string
  title: string
  complainant: string
  category: string
  status: 'pending' | 'investigating' | 'resolved'
  createdAt: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
}

function OfficialComplaintsComponent() {
  const queryClient = useQueryClient()
  const [searchTerm, setSearchTerm] = React.useState('')
  const [filterStatus, setFilterStatus] = React.useState('all')
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  })

  const { data, isLoading } = useQuery({
    queryKey: ['official-complaints', searchTerm, filterStatus, pagination],
    queryFn: () =>
      getOfficialComplaints({
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
        search: searchTerm,
        status: filterStatus !== 'all' ? filterStatus : undefined,
      }),
  })

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      updateOfficialComplaintStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['official-complaints'] })
    },
  })

  const columns: ColumnDef<OfficialComplaint, any>[] = [
    {
      accessorKey: 'title',
      header: 'Incident Details',
      cell: ({ row }) => (
        <div className="flex max-w-md flex-col">
          <span className="font-semibold text-slate-900">
            {row.original.title}
          </span>
          <div className="mt-1 flex items-center gap-2">
            <span className="text-xs font-medium text-slate-400">
              {row.original.category}
            </span>
            <span className="h-1 w-1 rounded-full bg-slate-200" />
            <span className="text-xs font-medium text-slate-500">
              ID: {row.original.id.slice(0, 8)}
            </span>
          </div>
        </div>
      ),
    },
    {
      accessorKey: 'complainant',
      header: 'Reported By',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-500">
            <User className="h-3.5 w-3.5" />
          </div>
          <span className="text-sm font-medium text-slate-700">
            {row.original.complainant}
          </span>
        </div>
      ),
    },
    {
      accessorKey: 'priority',
      header: 'Priority',
      cell: ({ row }) => {
        const priorities = {
          low: 'text-slate-500 bg-slate-50 border-slate-100',
          medium: 'text-blue-600 bg-blue-50 border-blue-100',
          high: 'text-orange-600 bg-orange-50 border-orange-100',
          urgent: 'text-red-600 bg-red-50 border-red-100 animate-pulse',
        }
        return (
          <div
            className={cn(
              'flex w-fit items-center gap-1.5 rounded px-2 py-0.5 text-xs font-bold border',
              priorities[row.original.priority],
            )}
          >
            {row.original.priority}
          </div>
        )
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const statuses = {
          pending: 'bg-amber-50 text-amber-700 border-amber-100',
          investigating: 'bg-blue-50 text-blue-700 border-blue-100',
          resolved: 'bg-green-50 text-green-700 border-green-100',
        }
        return (
          <Badge
            className={cn(
              'border px-2 py-0 text-xs font-medium capitalize',
              statuses[row.original.status],
            )}
            variant="outline"
          >
            {row.original.status}
          </Badge>
        )
      },
    },
    {
      accessorKey: 'createdAt',
      header: 'Date',
      cell: ({ row }) => (
        <div className="flex flex-col text-sm text-slate-600">
          <span>{new Date(row.original.createdAt).toLocaleDateString()}</span>
          <span className="text-xs text-slate-400">
            {new Date(row.original.createdAt).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
        </div>
      ),
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-8 rounded-lg px-3 text-xs font-semibold"
          >
            Manage
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-8 w-8 p-0"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56"
            >
              <DropdownMenuItem
                onClick={() =>
                  updateStatusMutation.mutate({
                    id: row.original.id,
                    status: 'investigating',
                  })
                }
              >
                <ShieldAlert className="mr-2 h-4 w-4 text-blue-500" />{' '}
                Mark as Investigating
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  updateStatusMutation.mutate({
                    id: row.original.id,
                    status: 'resolved',
                  })
                }
              >
                <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />{' '}
                Mark as Resolved
              </DropdownMenuItem>
              <DropdownMenuItem className="border-t mt-1">
                <MapPin className="mr-2 h-4 w-4 text-slate-500" />{' '}
                View Location
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ]

  return (
    <div className="animate-in fade-in slide-in-from-top-4 space-y-8 p-8 duration-500">
      <div className="mx-auto w-full max-w-6xl space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Incident & Complaints
            </h1>
            <p className="text-slate-500 mt-1">
              Investigate and resolve community issues with transparency and efficiency.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <StatSmall label="Action Needed" value="12" color="red" />
            <StatSmall label="Avg Response" value="1.5h" color="blue" />
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-card p-6 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:max-w-md">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Find incidents by title, name, or ID..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 bg-slate-50/50 focus:ring-2 focus:ring-primary/10 transition-all outline-none text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
              {['all', 'pending', 'investigating', 'resolved'].map((status) => (
                <Button
                  key={status}
                  variant={filterStatus === status ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setFilterStatus(status)}
                  className="capitalize h-8 rounded-lg"
                >
                  {status === 'investigating' ? 'Investigation' : status}
                </Button>
              ))}
            </div>
          </div>

          <DataTable
            columns={columns}
            data={data?.data || []}
            isLoading={isLoading}
            pagination={pagination}
            onPaginationChange={setPagination}
            pageCount={Math.ceil(
              (data?.meta.total || 0) / pagination.pageSize,
            )}
          />
        </div>
      </div>
    </div>
  )
}

function StatSmall({
  label,
  value,
  color,
}: {
  label: string
  value: string
  color: string
}) {
  const colors: Record<string, string> = {
    red: 'text-red-600',
    blue: 'text-blue-600',
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white px-4 py-2 shadow-sm">
      <p className="text-xs font-bold text-slate-400 leading-none mb-1">
        {label}
      </p>
      <p className={cn('text-xl font-bold leading-none', colors[color])}>
        {value}
      </p>
    </div>
  )
}

function FilterTab({
  active,
  onClick,
  label,
  count,
  color = 'slate',
}: {
  active: boolean
  onClick: () => void
  label: string
  count: string
  color?: string
}) {
  const activeColors: Record<string, string> = {
    slate: 'bg-slate-900 text-white',
    amber: 'bg-amber-50 text-white',
    blue: 'bg-blue-600 text-white',
    green: 'bg-green-600 text-white',
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center gap-3 rounded-2xl border px-6 py-4 text-sm font-black transition-all',
        active
          ? cn('scale-105 shadow-xl', activeColors[color])
          : 'border-slate-100 bg-white text-slate-500 hover:bg-slate-50',
      )}
    >
      {label}
      <span className={cn('rounded-lg bg-black/10 px-2 py-0.5 text-xs')}>
        {count}
      </span>
    </button>
  )
}

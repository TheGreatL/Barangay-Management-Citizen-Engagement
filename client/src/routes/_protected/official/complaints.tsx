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
          <span className="leading-tight font-bold text-slate-900">
            {row.original.title}
          </span>
          <div className="mt-1 flex items-center gap-2">
            <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
              {row.original.category}
            </span>
            <span className="h-1 w-1 rounded-full bg-slate-300" />
            <span className="text-[10px] font-bold text-slate-500">
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
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full border bg-slate-100 text-slate-500">
            <User className="h-4 w-4" />
          </div>
          <span className="text-sm font-bold text-slate-700">
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
          low: 'text-slate-500 bg-slate-50',
          medium: 'text-blue-600 bg-blue-50',
          high: 'text-orange-600 bg-orange-50',
          urgent: 'text-red-600 bg-red-50 animate-pulse',
        }
        return (
          <div
            className={cn(
              'flex w-fit items-center gap-1.5 rounded-lg border border-transparent px-2.5 py-1 text-[10px] font-black tracking-tighter uppercase',
              priorities[row.original.priority],
            )}
          >
            <div
              className={cn(
                'h-1.5 w-1.5 rounded-full',
                row.original.priority === 'urgent'
                  ? 'bg-red-600'
                  : 'bg-current',
              )}
            />
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
          pending: 'bg-amber-100 text-amber-700 border-amber-200',
          investigating: 'bg-blue-100 text-blue-700 border-blue-200',
          resolved: 'bg-green-100 text-green-700 border-green-200',
        }
        return (
          <Badge
            className={cn(
              'border px-3 py-1 text-[10px] font-black capitalize shadow-xs',
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
      header: 'Reported Date',
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="text-sm font-bold text-slate-600">
            {new Date(row.original.createdAt).toLocaleDateString()}
          </span>
          <span className="text-[10px] font-medium text-slate-400">
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
            className="text-primary border-primary/20 hover:bg-primary/5 h-9 rounded-xl bg-white px-4 font-bold transition-all"
          >
            Manage Case
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-9 w-9 rounded-xl p-0 hover:bg-slate-100"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 overflow-hidden rounded-2xl border-slate-200 p-1 font-bold shadow-2xl"
            >
              <DropdownMenuItem
                className="group cursor-pointer rounded-xl py-3"
                onClick={() =>
                  updateStatusMutation.mutate({
                    id: row.original.id,
                    status: 'investigating',
                  })
                }
              >
                <ShieldAlert className="mr-3 h-4 w-4 text-blue-500 transition-transform group-hover:scale-110" />{' '}
                Mark as Investigating
              </DropdownMenuItem>
              <DropdownMenuItem
                className="group cursor-pointer rounded-xl py-3"
                onClick={() =>
                  updateStatusMutation.mutate({
                    id: row.original.id,
                    status: 'resolved',
                  })
                }
              >
                <CheckCircle2 className="mr-3 h-4 w-4 text-green-500 transition-transform group-hover:scale-110" />{' '}
                Mark as Resolved
              </DropdownMenuItem>
              <DropdownMenuItem className="group mt-1 cursor-pointer rounded-xl border-t py-3">
                <MapPin className="mr-3 h-4 w-4 text-slate-500 transition-transform group-hover:scale-110" />{' '}
                View Location
              </DropdownMenuItem>
              <DropdownMenuItem className="group cursor-pointer rounded-xl py-3">
                <ExternalLink className="mr-3 h-4 w-4 text-slate-500 transition-transform group-hover:scale-110" />{' '}
                Export Record
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ]

  return (
    <div className="flex flex-col bg-slate-50/10">
      <div className="border-b bg-white px-10 py-12">
        <div className="mx-auto flex max-w-425 flex-col justify-between gap-10 xl:flex-row xl:items-center">
          <div className="space-y-3">
            <h1 className="flex items-center gap-5 text-5xl font-black tracking-tighter text-slate-900">
              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-red-600 text-white shadow-xl shadow-red-200">
                <ShieldAlert className="h-8 w-8" />
              </div>
              Incident & Complaint Center
            </h1>
            <p className="max-w-2xl text-xl leading-relaxed font-medium text-slate-500">
              Investigate and resolve community issues with transparency and
              efficiency. Coordinate with relevant departments for faster
              resolution.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <StatSmall label="Action Needed" value="12" color="red" />
            <StatSmall label="Avg Response" value="1.5h" color="blue" />
            <Button className="shadow-primary/30 h-16 rounded-2xl bg-slate-900 px-10 text-xl font-black shadow-2xl transition-all hover:scale-105 active:scale-95">
              Generate Weekly Analysis
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 p-10">
        <div className="mx-auto max-w-425 space-y-10">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="relative w-full md:max-w-xl">
              <Search className="absolute top-1/2 left-6 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Find incidents by title, complainant, or ID..."
                className="focus:ring-primary/5 w-full rounded-[22px] border border-slate-200 bg-white py-5 pr-8 pl-16 text-lg font-bold text-slate-800 shadow-sm transition-all outline-none focus:ring-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-3 overflow-x-auto pb-4 md:pb-0">
              <FilterTab
                active={filterStatus === 'all'}
                onClick={() => setFilterStatus('all')}
                label="All Reports"
                count="154"
              />
              <FilterTab
                active={filterStatus === 'pending'}
                onClick={() => setFilterStatus('pending')}
                label="Pending"
                count="42"
                color="amber"
              />
              <FilterTab
                active={filterStatus === 'investigating'}
                onClick={() => setFilterStatus('investigating')}
                label="Investigation"
                count="18"
                color="blue"
              />
              <FilterTab
                active={filterStatus === 'resolved'}
                onClick={() => setFilterStatus('resolved')}
                label="Resolved"
                count="94"
                color="green"
              />
            </div>
          </div>

          <div className="overflow-hidden rounded-[40px] border border-slate-200 bg-white p-4 shadow-2xl shadow-slate-200/50">
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
    <div className="rounded-2xl border border-slate-200 bg-white px-5 py-3 shadow-sm">
      <p className="mb-1 text-[10px] font-black tracking-widest text-slate-400 uppercase">
        {label}
      </p>
      <p className={cn('text-2xl leading-none font-black', colors[color])}>
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
        'flex items-center gap-3 rounded-2xl border px-6 py-4 text-sm font-black tracking-widest uppercase transition-all',
        active
          ? cn('scale-105 shadow-xl', activeColors[color])
          : 'border-slate-100 bg-white text-slate-500 hover:bg-slate-50',
      )}
    >
      {label}
      <span className={cn('rounded-lg bg-black/10 px-2 py-0.5 text-[10px]')}>
        {count}
      </span>
    </button>
  )
}

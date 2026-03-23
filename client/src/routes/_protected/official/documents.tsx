import { createFileRoute } from '@tanstack/react-router'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  FileText,
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
  Download,
  Printer,
  MoreVertical,
  Search,
  AlertCircle,
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
  getOfficialDocuments,
  updateOfficialDocumentStatus,
} from '@/mock/official-service'
import { cn } from '@/shared/lib/utils'

export const Route = createFileRoute('/_protected/official/documents')({
  component: OfficialDocumentsComponent,
})

type OfficialDocument = {
  id: string
  residentId: string
  residentName: string
  type: string
  status: 'pending' | 'processing' | 'approved' | 'rejected' | 'ready'
  requestDate: string
  trackingNumber: string
}

function OfficialDocumentsComponent() {
  const queryClient = useQueryClient()
  const [searchTerm, setSearchTerm] = React.useState('')
  const [filterStatus, setFilterStatus] = React.useState('all')
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  })

  const { data, isLoading } = useQuery({
    queryKey: ['official-documents', searchTerm, filterStatus, pagination],
    queryFn: () =>
      getOfficialDocuments({
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
        search: searchTerm,
        status: filterStatus !== 'all' ? filterStatus : undefined,
      }),
  })

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      updateOfficialDocumentStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['official-documents'] })
    },
  })

  const columns: ColumnDef<OfficialDocument, any>[] = [
    {
      accessorKey: 'trackingNumber',
      header: 'Tracking #',
      cell: ({ row }) => (
        <span className="rounded-md border bg-slate-100 px-2 py-0.5 text-[10px] font-black tracking-widest text-slate-800">
          {row.original.trackingNumber}
        </span>
      ),
    },
    {
      accessorKey: 'residentName',
      header: 'Requestor',
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-bold text-slate-900">
            {row.original.residentName}
          </span>
          <span className="text-[10px] font-medium text-slate-400">
            ID: {row.original.residentId}
          </span>
        </div>
      ),
    },
    {
      accessorKey: 'type',
      header: 'Document Type',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 shadow-inner">
            <FileText className="h-4 w-4" />
          </div>
          <span className="text-sm font-bold text-slate-700">
            {row.original.type}
          </span>
        </div>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const statuses = {
          pending: 'bg-amber-100 text-amber-700 border-amber-200',
          processing: 'bg-blue-100 text-blue-700 border-blue-200',
          approved: 'bg-green-100 text-green-700 border-green-200',
          rejected: 'bg-red-100 text-red-700 border-red-200',
          ready: 'bg-indigo-100 text-indigo-700 border-indigo-200',
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
      accessorKey: 'requestDate',
      header: 'Request Date',
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="text-sm font-bold text-slate-600">
            {new Date(row.original.requestDate).toLocaleDateString()}
          </span>
          <span className="text-[10px] font-medium text-slate-400">
            at{' '}
            {new Date(row.original.requestDate).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
        </div>
      ),
    },
    {
      id: 'actions',
      header: 'Review',
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="hover:bg-primary/5 text-primary h-9 w-9 p-0"
          >
            <Eye className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-9 w-9 p-0 hover:bg-slate-100"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-48 overflow-hidden rounded-xl border-slate-200 font-bold shadow-xl"
            >
              <DropdownMenuItem
                className="cursor-pointer py-2.5 text-blue-600 focus:bg-blue-50 focus:text-blue-700"
                onClick={() =>
                  updateStatusMutation.mutate({
                    id: row.original.id,
                    status: 'processing',
                  })
                }
              >
                <Clock className="mr-3 h-4 w-4" /> Set Under Processing
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer py-2.5 text-indigo-600 focus:bg-indigo-50 focus:text-indigo-700"
                onClick={() =>
                  updateStatusMutation.mutate({
                    id: row.original.id,
                    status: 'ready',
                  })
                }
              >
                <CheckCircle2 className="mr-3 h-4 w-4" /> Ready for Pickup
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer py-2.5 text-green-600 focus:bg-green-50 focus:text-green-700"
                onClick={() =>
                  updateStatusMutation.mutate({
                    id: row.original.id,
                    status: 'approved',
                  })
                }
              >
                <Printer className="mr-3 h-4 w-4" /> Approve & Print
              </DropdownMenuItem>
              <DropdownMenuItem
                className="mt-1 cursor-pointer border-t py-2.5 text-red-500 focus:bg-red-50 focus:text-red-600"
                onClick={() =>
                  updateStatusMutation.mutate({
                    id: row.original.id,
                    status: 'rejected',
                  })
                }
              >
                <XCircle className="mr-3 h-4 w-4" /> Deny Request
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ]

  return (
    <div className="flex flex-col bg-slate-50/20">
      <div className="border-b bg-white px-8 py-10 shadow-sm">
        <div className="mx-auto flex max-w-400 flex-col justify-between gap-8 lg:flex-row lg:items-center">
          <div className="space-y-2">
            <h1 className="flex items-center gap-4 text-4xl font-black tracking-tighter text-slate-900">
              <div className="bg-primary shadow-primary/20 flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-lg">
                <FileText className="h-6 w-6" />
              </div>
              Document Approval Workflow
            </h1>
            <p className="max-w-xl text-lg leading-tight font-medium text-slate-500">
              Review and manage certification requests from citizens. Ensure all
              information is verified before approval.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="h-14 rounded-2xl border-slate-200 px-6 font-bold text-slate-600"
            >
              <Download className="mr-2 h-5 w-5" /> Download Report
            </Button>
            <Button className="shadow-primary/30 h-14 rounded-2xl px-8 text-lg font-black shadow-xl transition-all hover:scale-105 active:scale-95">
              <Printer className="mr-2 h-5 w-5" /> Bulk Print Ready
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 p-8">
        <div className="mx-auto max-w-400 space-y-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
            <SummaryCard
              label="Pending Review"
              value="18"
              icon={Clock}
              color="amber"
              sub="Awaiting official action"
            />
            <SummaryCard
              label="In Processing"
              value="12"
              icon={FileText}
              color="blue"
              sub="Currently being handled"
            />
            <SummaryCard
              label="Ready to Claim"
              value="25"
              icon={CheckCircle2}
              color="indigo"
              sub="Notify citizens to collect"
            />
            <SummaryCard
              label="Declined Total"
              value="8"
              icon={AlertCircle}
              color="red"
              sub="Issues with requirements"
            />
          </div>

          <div className="bg-card space-y-8 rounded-4xl border p-8 shadow-sm">
            <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
              <div className="relative w-full md:max-w-md">
                <Search className="absolute top-1/2 left-5 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search tracking #, name, or type..."
                  className="focus:ring-primary/10 w-full rounded-3xl border border-slate-200 bg-slate-50/50 py-4 pr-6 pl-14 font-bold text-slate-700 transition-all outline-none focus:bg-white focus:ring-4"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex w-full items-center gap-3 overflow-x-auto pb-2 md:w-auto md:pb-0">
                <FilterButton
                  active={filterStatus === 'all'}
                  onClick={() => setFilterStatus('all')}
                  label="All Requests"
                />
                <FilterButton
                  active={filterStatus === 'pending'}
                  onClick={() => setFilterStatus('pending')}
                  label="Pending"
                />
                <FilterButton
                  active={filterStatus === 'processing'}
                  onClick={() => setFilterStatus('processing')}
                  label="Processing"
                />
                <FilterButton
                  active={filterStatus === 'ready'}
                  onClick={() => setFilterStatus('ready')}
                  label="Ready"
                />
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl border bg-white shadow-inner">
              <DataTable
                columns={columns}
                data={data?.data || []}
                isLoading={isLoading}
                pagination={pagination}
                onPaginationChange={setPagination}
                pageCount={Math.ceil((data?.meta.total || 0) / pagination.pageSize)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function SummaryCard({
  label,
  value,
  icon: Icon,
  color,
  sub,
}: {
  label: string
  value: string
  icon: any
  color: string
  sub: string
}) {
  const colors: Record<string, string> = {
    amber: 'bg-amber-50 text-amber-600 border-amber-100',
    blue: 'bg-blue-50 text-blue-600 border-blue-100',
    indigo: 'bg-indigo-50 text-indigo-600 border-indigo-100',
    red: 'bg-red-50 text-red-600 border-red-100',
  }

  return (
    <div className="group rounded-3xl border bg-white p-8 shadow-sm transition-all hover:shadow-lg">
      <div className="mb-4 flex items-start justify-between">
        <div
          className={cn(
            'rounded-2xl border p-4 shadow-inner transition-all group-hover:scale-110',
            colors[color],
          )}
        >
          <Icon className="h-6 w-6" />
        </div>
        <div className="h-2 w-2 rounded-full bg-slate-200" />
      </div>
      <div>
        <h4 className="mb-1 text-sm font-black tracking-widest text-slate-400 uppercase">
          {label}
        </h4>
        <div className="flex items-end gap-2">
          <span className="text-4xl leading-none font-black tracking-tighter text-slate-900">
            {value}
          </span>
          <span className="mb-1 text-[10px] leading-none font-bold text-slate-400">
            {sub}
          </span>
        </div>
      </div>
    </div>
  )
}

function FilterButton({
  active,
  onClick,
  label,
}: {
  active: boolean
  onClick: () => void
  label: string
}) {
  return (
    <Button
      variant={active ? 'default' : 'ghost'}
      onClick={onClick}
      className={cn(
        'h-12 rounded-2xl px-6 text-xs font-black tracking-widest uppercase transition-all',
        !active && 'text-slate-500 hover:bg-slate-100',
      )}
    >
      {label}
    </Button>
  )
}

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
        <span className="rounded-md border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-xs font-medium text-slate-600">
          {row.original.trackingNumber}
        </span>
      ),
    },
    {
      accessorKey: 'residentName',
      header: 'Requestor',
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-semibold text-slate-900">
            {row.original.residentName}
          </span>
          <span className="text-xs text-slate-400">
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
          <FileText className="h-4 w-4 text-slate-400" />
          <span className="text-sm font-medium text-slate-700">
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
          pending: 'bg-amber-50 text-amber-700 border-amber-100',
          processing: 'bg-blue-50 text-blue-700 border-blue-100',
          approved: 'bg-green-50 text-green-700 border-green-100',
          rejected: 'bg-red-50 text-red-700 border-red-100',
          ready: 'bg-indigo-50 text-indigo-700 border-indigo-100',
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
      accessorKey: 'requestDate',
      header: 'Request Date',
      cell: ({ row }) => (
        <div className="flex flex-col text-sm text-slate-600">
          <span>{new Date(row.original.requestDate).toLocaleDateString()}</span>
          <span className="text-xs text-slate-400">
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
      header: 'Action',
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
          >
            <Eye className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-8 w-8 p-0"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem
                onClick={() =>
                  updateStatusMutation.mutate({
                    id: row.original.id,
                    status: 'processing',
                  })
                }
              >
                <Clock className="mr-2 h-4 w-4" /> Process
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  updateStatusMutation.mutate({
                    id: row.original.id,
                    status: 'ready',
                  })
                }
              >
                <CheckCircle2 className="mr-2 h-4 w-4" /> Ready for Pickup
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-green-600"
                onClick={() =>
                  updateStatusMutation.mutate({
                    id: row.original.id,
                    status: 'approved',
                  })
                }
              >
                <Printer className="mr-2 h-4 w-4" /> Approve & Print
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-600"
                onClick={() =>
                  updateStatusMutation.mutate({
                    id: row.original.id,
                    status: 'rejected',
                  })
                }
              >
                <XCircle className="mr-2 h-4 w-4" /> Reject
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-8 py-8">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Document Approvals
            </h1>
            <p className="text-slate-500 mt-1">Review and manage certification requests from citizens.</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" /> Export
            </Button>
            <Button>
              <Printer className="mr-2 h-4 w-4" /> Bulk Print
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <SummaryCard
            label="Pending Review"
            value="18"
            icon={Clock}
            color="amber"
          />
          <SummaryCard
            label="In Processing"
            value="12"
            icon={FileText}
            color="blue"
          />
          <SummaryCard
            label="Ready to Claim"
            value="25"
            icon={CheckCircle2}
            color="indigo"
          />
          <SummaryCard
            label="Declined Total"
            value="8"
            icon={AlertCircle}
            color="red"
          />
        </div>

        <div className="rounded-xl border border-slate-200 bg-card p-6 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:max-w-md">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search tracking #, name, or type..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 bg-slate-50/50 focus:ring-2 focus:ring-primary/10 transition-all outline-none text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
              {['all', 'pending', 'processing', 'ready'].map((status) => (
                <Button
                  key={status}
                  variant={filterStatus === status ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setFilterStatus(status)}
                  className="capitalize h-8 rounded-lg"
                >
                  {status}
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
            pageCount={Math.ceil((data?.meta.total || 0) / pagination.pageSize)}
          />
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
}: {
  label: string
  value: string
  icon: any
  color: string
}) {
  const colors: Record<string, string> = {
    amber: 'bg-amber-50 text-amber-600',
    blue: 'bg-blue-50 text-blue-600',
    indigo: 'bg-indigo-50 text-indigo-600',
    red: 'bg-red-50 text-red-600',
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-card p-6 shadow-sm">
      <div className="flex items-start justify-between mb-4">
        <div className={cn('p-2 rounded-lg', colors[color])}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <div>
        <p className="text-sm font-medium text-slate-500 mb-1">{label}</p>
        <span className="text-2xl font-bold text-slate-900">{value}</span>
      </div>
    </div>
  )
}


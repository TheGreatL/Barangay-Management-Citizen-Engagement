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
        <span className="rounded-md border border-border/60 bg-muted px-1.5 py-0.5 text-xs font-medium text-muted-foreground">
          {row.original.trackingNumber}
        </span>
      ),
    },
    {
      accessorKey: 'residentName',
      header: 'Requestor',
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-medium text-foreground">
            {row.original.residentName}
          </span>
          <span className="text-xs text-muted-foreground">
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
          <FileText className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">
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
          pending: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800',
          processing: 'bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-900/20 dark:text-sky-400 dark:border-sky-800',
          approved: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800',
          rejected: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-900/20 dark:text-rose-400 dark:border-rose-800',
          ready: 'bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-900/20 dark:text-violet-400 dark:border-violet-800',
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
        <div className="flex flex-col text-sm text-muted-foreground">
          <span>{new Date(row.original.requestDate).toLocaleDateString()}</span>
          <span className="text-xs">
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
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Eye className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
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
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              Document Approvals
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Review and manage certification requests from citizens.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" /> Export
            </Button>
            <Button size="sm">
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

        <div className="bg-card space-y-6 rounded-xl border border-border/60 p-5">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="relative w-full md:max-w-md">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search tracking #, name, or type..."
                className="w-full rounded-lg border border-border/60 bg-muted/30 py-2 pr-4 pl-10 text-sm transition-all outline-none focus:border-border focus:bg-background focus:ring-1 focus:ring-border/50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex w-full items-center gap-1 overflow-x-auto md:w-auto">
              {['all', 'pending', 'processing', 'ready'].map((status) => (
                <Button
                  key={status}
                  variant={filterStatus === status ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setFilterStatus(status)}
                  className="h-8 rounded-lg text-xs capitalize"
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
    amber: 'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400',
    blue: 'bg-sky-50 text-sky-600 dark:bg-sky-900/20 dark:text-sky-400',
    indigo: 'bg-violet-50 text-violet-600 dark:bg-violet-900/20 dark:text-violet-400',
    red: 'bg-rose-50 text-rose-600 dark:bg-rose-900/20 dark:text-rose-400',
  }

  return (
    <div className="bg-card rounded-xl border border-border/60 p-5 transition-all hover:border-border">
      <div className="mb-4 flex items-start justify-between">
        <div className={cn('rounded-lg p-2', colors[color])}>
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <div>
        <p className="mb-1 text-xs font-medium text-muted-foreground">{label}</p>
        <span className="text-2xl font-semibold text-foreground">{value}</span>
      </div>
    </div>
  )
}

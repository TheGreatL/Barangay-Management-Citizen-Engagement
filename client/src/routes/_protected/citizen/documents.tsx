import { createFileRoute, Link } from '@tanstack/react-router'
import { Plus, FileText, Clock, CheckCircle2, XCircle, Download, MoreHorizontal } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { Badge } from '@/shared/components/ui/badge'
import * as React from 'react'
import { DataTable } from '@/shared/components/ui/DataTable'
import type { ColumnDef, PaginationState, SortingState } from '@tanstack/react-table'
import { getCitizenDocuments } from '@/mock/citizen-service'
import { useQuery } from '@tanstack/react-query'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'

export const Route = createFileRoute('/_protected/citizen/documents')({
  component: DocumentsComponent,
})

type CitizenDocument = {
  id: string
  documentType: string
  status: string
  purpose: string
  createdAt: string
  pickupDate?: string
}

function DocumentsComponent() {
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const [sorting, setSorting] = React.useState<SortingState>([{ id: 'createdAt', desc: true }])
  const [searchValue, setSearchValue] = React.useState('')

  const { data, isLoading } = useQuery({
    queryKey: ['citizen-documents', pagination, sorting, searchValue],
    queryFn: () =>
      getCitizenDocuments({
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
        sort: sorting[0]?.id,
        order: sorting[0]?.desc ? 'desc' : 'asc',
        search: searchValue,
      }),
  })

  const columns: ColumnDef<CitizenDocument>[] = [
    {
      accessorKey: 'documentType',
      header: 'Document Type',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-blue-500" />
          <span className="font-semibold">{row.getValue('documentType')}</span>
        </div>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue('status')
        const colors: Record<string, string> = {
          pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
          processing: 'bg-blue-100 text-blue-700 border-blue-200',
          ready_for_pickup: 'bg-purple-100 text-purple-700 border-purple-200',
          completed: 'bg-green-100 text-green-700 border-green-200',
          rejected: 'bg-red-100 text-red-700 border-red-200',
        }
        return (
          <Badge variant="outline" className={cn('capitalize h-6', colors[status as string] || 'bg-slate-100')}>
            {String(status).replace(/_/g, ' ')}
          </Badge>
        )
      },
    },
    {
      accessorKey: 'createdAt',
      header: 'Request Date',
      cell: ({ row }) => new Date(row.getValue('createdAt')).toLocaleDateString(),
    },
    {
      accessorKey: 'pickupDate',
      header: 'Pickup Date',
      cell: ({ row }) => {
        const date = row.getValue('pickupDate')
        return date ? new Date(date as string).toLocaleDateString() : 'N/A'
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Options</DropdownMenuLabel>
            <DropdownMenuItem>View Details</DropdownMenuItem>
            {row.original.status === 'completed' && (
              <DropdownMenuItem className="text-blue-600">
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">Cancel Request</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Document Requests</h1>
          <p className="text-muted-foreground mt-1">Request and manage your official barangay documents.</p>
        </div>
        <Link to="/citizen/documents-new">
          <Button size="lg" className="shadow-lg transition-all hover:-translate-y-px">
            <Plus className="mr-2 h-4 w-4" />
            New Request
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatusCard title="Pending" value="2" icon={Clock} color="yellow" />
        <StatusCard title="Ready for Pickup" value="1" icon={CheckCircle2} color="green" />
        <StatusCard title="Total Completed" value="15" icon={FileText} color="blue" />
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
        searchPlaceholder="Filter by document type or status..."
      />
    </div>
  )
}

function StatusCard({ title, value, icon: Icon, color }: { title: string; value: string; icon: any; color: string }) {
  const colors: Record<string, string> = {
    yellow: 'border-yellow-200 bg-yellow-50 text-yellow-600',
    green: 'border-green-200 bg-green-50 text-green-600',
    blue: 'border-blue-200 bg-blue-50 text-blue-600',
  }

  return (
    <div className={cn('rounded-xl border p-4 shadow-sm flex items-center justify-between', colors[color])}>
      <div>
        <p className="text-xs font-bold opacity-80">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
      <Icon className="h-8 w-8 opacity-20" />
    </div>
  )
}

function cn(...classes: (string | undefined | null | boolean | Record<string, boolean>)[]) {
  return classes
    .filter(Boolean)
    .map((c) => {
      if (typeof c === 'object') {
        return Object.entries(c!)
          .filter(([_, value]) => value)
          .map(([key]) => key)
          .join(' ')
      }
      return c
    })
    .join(' ')
}

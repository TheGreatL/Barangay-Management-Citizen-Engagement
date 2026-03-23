import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { FileText, Plus, CheckCircle2, XCircle, Clock, Search, MoreHorizontal, Download, Printer } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { Badge } from '@/shared/components/ui/badge'
import * as React from 'react'
import { DataTable } from '@/shared/components/ui/DataTable'
import type { ColumnDef, PaginationState, SortingState } from '@tanstack/react-table'
import { getCertificateRequests } from '@/mock/certificate-service'
import { cn } from '@/shared/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs'

export const Route = createFileRoute('/_protected/admin/certificates')({
  component: AdminCertificatesComponent,
})

type CertificateRequest = {
  id: string
  residentName: string
  type: string
  status: string
  purpose: string
  requestedAt: string
  processedAt: string
}

function AdminCertificatesComponent() {
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [searchValue, setSearchValue] = React.useState('')
  const [activeTab, setActiveTab] = React.useState('all')

  const { data, isLoading } = useQuery({
    queryKey: ['admin-certificates', pagination, sorting, searchValue, activeTab],
    queryFn: () =>
      getCertificateRequests({
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
        sort: sorting[0]?.id,
        order: sorting[0]?.desc ? 'desc' : 'asc',
        search: searchValue,
      }),
  })

  const columns: ColumnDef<CertificateRequest>[] = [
    {
      accessorKey: 'residentName',
      header: 'Resident Name',
      cell: ({ row }) => <span className="font-medium">{row.getValue('residentName')}</span>,
    },
    {
      accessorKey: 'type',
      header: 'Type',
      cell: ({ row }) => {
        const type = row.getValue('type') as string
        return (
          <Badge variant="secondary" className="bg-slate-100 text-slate-700">
            {type.replace('_', ' ')}
          </Badge>
        )
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue('status') as string
        const colors: Record<string, string> = {
          PENDING: 'bg-yellow-100 text-yellow-700 border-yellow-200',
          APPROVED: 'bg-blue-100 text-blue-700 border-blue-200',
          DENIED: 'bg-red-100 text-red-700 border-red-200',
          READY_FOR_PICKUP: 'bg-green-100 text-green-700 border-green-200',
        }
        return (
          <Badge variant="outline" className={colors[status]}>
            {status.replace(/_/g, ' ')}
          </Badge>
        )
      },
    },
    {
      accessorKey: 'requestedAt',
      header: 'Requested Date',
      cell: ({ row }) => new Date(row.getValue('requestedAt')).toLocaleDateString(),
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
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-blue-600">
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Approve
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">
              <XCircle className="mr-2 h-4 w-4" />
              Deny
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Printer className="mr-2 h-4 w-4" />
              Print
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Document & Certificates</h1>
          <p className="text-muted-foreground mt-1">Manage and process document requests from residents.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Manage Templates
          </Button>
          <Button size="lg" className="shadow-xs transition-all hover:-translate-y-px">
            <Plus className="mr-2 h-4 w-4" />
            New Request
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" onValueChange={setActiveTab}>
        <TabsList className="bg-muted/50 p-1 mb-4">
          <TabsTrigger value="all">All Requests</TabsTrigger>
          <TabsTrigger value="PENDING">Pending</TabsTrigger>
          <TabsTrigger value="APPROVED">Approved</TabsTrigger>
          <TabsTrigger value="READY_FOR_PICKUP">Ready for Pickup</TabsTrigger>
        </TabsList>
        <TabsContent value={activeTab}>
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
            searchPlaceholder="Search by resident name or purpose..."
          />
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCard title="Pending Review" value="12" icon={Clock} color="yellow" />
        <SummaryCard title="Ready for Release" value="8" icon={CheckCircle2} color="green" />
        <SummaryCard title="Total This Month" value="156" icon={FileText} color="blue" />
      </div>
    </div>
  )
}

function SummaryCard({ title, value, icon: Icon, color }: { title: string; value: string; icon: any; color: string }) {
  const colors: Record<string, string> = {
    yellow: 'bg-yellow-50 text-yellow-600',
    green: 'bg-green-50 text-green-600',
    blue: 'bg-blue-50 text-blue-600',
  }

  return (
    <div className="rounded-xl border bg-card p-4 flex items-center justify-between shadow-sm">
      <div className="space-y-1">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
      <div className={cn('h-12 w-12 rounded-xl flex items-center justify-center', colors[color])}>
        <Icon className="h-6 w-6" />
      </div>
    </div>
  )
}

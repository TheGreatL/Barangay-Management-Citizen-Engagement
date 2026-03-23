import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { AlertCircle, Plus, CheckCircle2, Clock, MoreHorizontal, User, MessageSquare, ShieldAlert } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { Badge } from '@/shared/components/ui/badge'
import * as React from 'react'
import { DataTable } from '@/shared/components/ui/DataTable'
import type { ColumnDef, PaginationState, SortingState } from '@tanstack/react-table'
import { getComplaints } from '@/mock/complaint-service'
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
import { Card } from '@/shared/components/ui/card'

export const Route = createFileRoute('/_protected/admin/complaints')({
  component: AdminComplaintsComponent,
})

type Complaint = {
  id: string
  title: string
  description: string
  status: string
  priority: string
  category: string
  reporterId: string
  assignedToId: string
  createdAt: string
}

function AdminComplaintsComponent() {
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [searchValue, setSearchValue] = React.useState('')
  const [activeTab, setActiveTab] = React.useState('all')

  const { data, isLoading } = useQuery({
    queryKey: ['admin-complaints', pagination, sorting, searchValue, activeTab],
    queryFn: () =>
      getComplaints({
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
        sort: sorting[0]?.id,
        order: sorting[0]?.desc ? 'desc' : 'asc',
        search: searchValue,
      }),
  })

  const columns: ColumnDef<Complaint>[] = [
    {
      accessorKey: 'title',
      header: 'Complaint Title',
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-medium truncate max-w-[200px]">{row.original.title}</span>
          <span className="text-xs text-muted-foreground">ID: {row.original.id.slice(0, 8)}</span>
        </div>
      ),
    },
    {
      accessorKey: 'category',
      header: 'Category',
      cell: ({ row }) => {
        const category = row.original.category
        return (
          <Badge variant="secondary" className="bg-slate-100 text-slate-700 text-xs">
            {category}
          </Badge>
        )
      },
    },
    {
      accessorKey: 'priority',
      header: 'Priority',
      cell: ({ row }) => {
        const priority = row.original.priority
        const colors: Record<string, string> = {
          LOW: 'bg-slate-100 text-slate-700',
          MEDIUM: 'bg-blue-100 text-blue-700',
          HIGH: 'bg-orange-100 text-orange-700',
          URGENT: 'bg-red-100 text-red-700 font-bold',
        }
        return (
          <Badge variant="outline" className={cn('text-xs', colors[priority])}>
            {priority}
          </Badge>
        )
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.original.status
        const colors: Record<string, string> = {
          PENDING: 'bg-yellow-100 text-yellow-700',
          IN_PROGRESS: 'bg-blue-100 text-blue-700',
          RESOLVED: 'bg-green-100 text-green-700',
          CLOSED: 'bg-slate-100 text-slate-700',
        }
        return (
          <Badge variant="outline" className={cn('text-xs', colors[status])}>
            {status.replace(/_/g, ' ')}
          </Badge>
        )
      },
    },
    {
      accessorKey: 'createdAt',
      header: 'Reported',
      cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
    },
    {
      id: 'actions',
      cell: () => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Manage Case</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <MessageSquare className="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              Assign Official
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-blue-600">
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Mark Resolved
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">
              <ShieldAlert className="mr-2 h-4 w-4" />
              Escalate
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]

  return (
    <div className="space-y-8 py-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Complaint & Case Management</h1>
          <p className="text-muted-foreground mt-1">Track and resolve community issues and reports.</p>
        </div>
        <div className="flex gap-2">
          <Button size="lg" className="shadow-xs transition-all hover:-translate-y-px">
            <Plus className="mr-2 h-4 w-4" />
            File Formal Complaint
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="flex flex-col justify-between h-25 p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-muted-foreground">New Today</p>
            <Plus className="h-4 w-4 text-blue-600" />
          </div>
          <p className="text-3xl font-bold">5</p>
        </Card>
        <Card className="flex flex-col justify-between h-25 p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-muted-foreground">In Progress</p>
            <Clock className="h-4 w-4 text-orange-600" />
          </div>
          <p className="text-3xl font-bold">18</p>
        </Card>
        <Card className="flex flex-col justify-between h-25 p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-muted-foreground">Resolved</p>
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          </div>
          <p className="text-3xl font-bold">142</p>
        </Card>
        <Card className="flex flex-col justify-between h-25 p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-muted-foreground">Pending</p>
            <AlertCircle className="h-4 w-4 text-yellow-600" />
          </div>
          <p className="text-3xl font-bold">12</p>
        </Card>
      </div>

      <Tabs defaultValue="all" onValueChange={setActiveTab}>
        <TabsList className="bg-muted/50 p-1 mb-4">
          <TabsTrigger value="all">All Cases</TabsTrigger>
          <TabsTrigger value="PENDING">Pending</TabsTrigger>
          <TabsTrigger value="IN_PROGRESS">In Progress</TabsTrigger>
          <TabsTrigger value="RESOLVED">Resolved</TabsTrigger>
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
            searchPlaceholder="Search by title, category or status..."
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}


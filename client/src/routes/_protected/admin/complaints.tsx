import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { AlertCircle, Plus, CheckCircle2, Clock, MoreHorizontal, MessageSquare, ShieldAlert, Search } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import * as React from 'react'
import { DataTable } from '@/shared/components/ui/DataTable'
import type { ColumnDef, PaginationState } from '@tanstack/react-table'
import { complaintService } from '@/features/complaints/complaint-service'
import type { TComplaint } from '@/features/complaints/complaint-schema'
import { ComplaintStatusBadge } from '@/features/complaints/components/complaint-status-badge'
import { ComplaintPriorityBadge } from '@/features/complaints/components/complaint-priority-badge'
import { ComplaintStatsCard } from '@/features/complaints/components/complaint-stats-card'
import { PageHeader } from '@/shared/components/layout/page-header'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'
import { Tabs, TabsList, TabsTrigger } from '@/shared/components/ui/tabs'

export const Route = createFileRoute('/_protected/admin/complaints')({
  component: AdminComplaintsComponent,
})

function AdminComplaintsComponent() {
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const [searchValue, setSearchValue] = React.useState('')
  const [activeTab, setActiveTab] = React.useState('all')

  const { data, isLoading } = useQuery({
    queryKey: ['admin-complaints', pagination, searchValue, activeTab],
    queryFn: () =>
      complaintService.listAdmin({
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
        search: searchValue,
        status: activeTab === 'all' ? undefined : activeTab,
      }),
  })

  const columns: ColumnDef<TComplaint>[] = [
    {
      accessorKey: 'title',
      header: 'Complaint details',
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-bold text-slate-900 truncate max-w-50">{row.original.title}</span>
          <span className="text-[10px] font-black text-slate-400">ID: {row.original.id.slice(0, 8)}</span>
        </div>
      ),
    },
    {
      accessorKey: 'category',
      header: 'Category',
      cell: ({ row }) => (
        <span className="text-xs font-black text-slate-500 bg-slate-50 px-2 py-1 rounded-lg border border-slate-100 italic">
          {row.original.category}
        </span>
      ),
    },
    {
      accessorKey: 'priority',
      header: 'Priority',
      cell: ({ row }) => <ComplaintPriorityBadge priority={row.original.priority} />,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => <ComplaintStatusBadge status={row.original.status} />,
    },
    {
      accessorKey: 'createdAt',
      header: 'Reported',
      cell: ({ row }) => (
        <span className="text-xs font-bold text-slate-500">
          {new Date(row.original.createdAt).toLocaleDateString()}
        </span>
      ),
    },
    {
      id: 'actions',
      cell: () => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-10 w-10 p-0 rounded-xl hover:bg-slate-100">
              <MoreHorizontal className="h-5 w-5 text-slate-400" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 rounded-2xl p-2 shadow-xl border-slate-100">
            <DropdownMenuLabel className="px-3 py-2 text-[10px] font-black text-slate-400">Manage Case</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-slate-50" />
            <DropdownMenuItem className="rounded-xl p-3 cursor-pointer">
              <MessageSquare className="mr-2 h-4 w-4 text-blue-500" />
              <span className="font-bold text-sm">View Details</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="rounded-xl p-3 cursor-pointer">
              <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
              <span className="font-bold text-sm">Mark Resolved</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="rounded-xl p-3 cursor-pointer">
              <ShieldAlert className="mr-2 h-4 w-4 text-red-500" />
              <span className="font-bold text-sm">Escalate</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]

  const complaints = data?.data || []
  const stats = data?.stats || { total: 0, pending: 0, resolved: 0 }

  return (
    <div className="flex flex-col">
      <PageHeader
        title="Command Center: Reports"
        description="Oversee and orchestrate the resolution of community-wide concerns"
        icon={<ShieldAlert className="h-6 w-6" />}
        action={
          <Button className="rounded-2xl h-12 px-6 font-black shadow-xl shadow-primary/20 leading-none">
            <Plus className="mr-2 h-5 w-5" />
            Global Incident Log
          </Button>
        }
      />

      <div className="flex flex-col gap-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <ComplaintStatsCard 
            label="Inbound Today" 
            value="8" 
            icon={Plus}
            color="text-blue-600 bg-blue-50"
          />
          <ComplaintStatsCard 
            label="Under Review" 
            value={stats.pending || 0} 
            icon={Clock}
            color="text-amber-600 bg-amber-50"
          />
          <ComplaintStatsCard 
            label="Monthly Goal" 
            value="142" 
            icon={CheckCircle2}
            color="text-green-600 bg-green-50"
          />
          <ComplaintStatsCard 
            label="Escalated" 
            value="3" 
            icon={AlertCircle}
            color="text-red-600 bg-red-50"
          />
        </div>

        <div className="bg-slate-50/50 p-6 rounded-4xl border border-slate-100 flex flex-col gap-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search global reports repository..."
                className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 bg-white text-sm font-medium focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
              <TabsList className="bg-slate-100 p-1.5 rounded-2xl h-12 flex gap-1">
                <TabsTrigger value="all" className="rounded-xl font-bold px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm">All Cases</TabsTrigger>
                <TabsTrigger value="pending" className="rounded-xl font-bold px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm text-amber-600">Pending</TabsTrigger>
                <TabsTrigger value="investigating" className="rounded-xl font-bold px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm text-blue-600">Active</TabsTrigger>
                <TabsTrigger value="resolved" className="rounded-xl font-bold px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm text-green-600">Resolved</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <DataTable
              columns={columns}
              data={complaints}
              pageCount={data?.meta?.totalPages}
              pagination={pagination}
              onPaginationChange={setPagination}
              searchValue={searchValue}
              onSearchChange={setSearchValue}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  )
}


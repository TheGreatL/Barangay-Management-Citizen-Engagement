import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import {
  AlertCircle,
  Plus,
  CheckCircle2,
  Clock,
  MoreHorizontal,
  MessageSquare,
  ShieldAlert,
  Search,
} from 'lucide-react'
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
          <span className="max-w-50 truncate font-bold text-slate-900">
            {row.original.title}
          </span>
          <span className="text-[10px] font-black text-slate-400">
            ID: {row.original.id.slice(0, 8)}
          </span>
        </div>
      ),
    },
    {
      accessorKey: 'category',
      header: 'Category',
      cell: ({ row }) => (
        <span className="rounded-lg border border-slate-100 bg-slate-50 px-2 py-1 text-xs font-black text-slate-500 italic">
          {row.original.category}
        </span>
      ),
    },
    {
      accessorKey: 'priority',
      header: 'Priority',
      cell: ({ row }) => (
        <ComplaintPriorityBadge priority={row.original.priority} />
      ),
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
            <Button
              variant="ghost"
              className="h-10 w-10 rounded-xl p-0 hover:bg-slate-100"
            >
              <MoreHorizontal className="h-5 w-5 text-slate-400" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-56 rounded-2xl border-slate-100 p-2 shadow-xl"
          >
            <DropdownMenuLabel className="px-3 py-2 text-[10px] font-black text-slate-400">
              Manage Case
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-slate-50" />
            <DropdownMenuItem className="cursor-pointer rounded-xl p-3">
              <MessageSquare className="mr-2 h-4 w-4 text-blue-500" />
              <span className="text-sm font-bold">View Details</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer rounded-xl p-3">
              <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
              <span className="text-sm font-bold">Mark Resolved</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer rounded-xl p-3">
              <ShieldAlert className="mr-2 h-4 w-4 text-red-500" />
              <span className="text-sm font-bold">Escalate</span>
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
          <Button className="shadow-primary/20 h-12 rounded-2xl px-6 leading-none font-black shadow-xl">
            <Plus className="mr-2 h-5 w-5" />
            Global Incident Log
          </Button>
        }
      />

      <div className="flex flex-col gap-8 py-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
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

        <div className="flex flex-col gap-8 rounded-4xl border border-slate-100 bg-slate-50/50 p-6">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="relative w-full max-w-md">
              <Search className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search global reports repository..."
                className="focus:ring-primary/5 w-full rounded-2xl border border-slate-200 bg-white py-3 pr-4 pl-11 text-sm font-medium transition-all focus:ring-4 focus:outline-none"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>

            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full md:w-auto"
            >
              <TabsList className="flex h-12 gap-1 rounded-2xl bg-slate-100 p-1.5">
                <TabsTrigger
                  value="all"
                  className="rounded-xl px-6 font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  All Cases
                </TabsTrigger>
                <TabsTrigger
                  value="pending"
                  className="rounded-xl px-6 font-bold text-amber-600 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  Pending
                </TabsTrigger>
                <TabsTrigger
                  value="investigating"
                  className="rounded-xl px-6 font-bold text-blue-600 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  Active
                </TabsTrigger>
                <TabsTrigger
                  value="resolved"
                  className="rounded-xl px-6 font-bold text-green-600 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  Resolved
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
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

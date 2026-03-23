import { createFileRoute, Link } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { Plus, Search, MessageSquare, Clock, CheckCircle2 } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { DataTable } from '@/shared/components/ui/DataTable'
import type { ColumnDef } from '@tanstack/react-table'
import * as React from 'react'
import { complaintService } from '@/features/complaints/complaint-service'
import type { TComplaint } from '@/features/complaints/complaint-schema'
import { ComplaintStatusBadge } from '@/features/complaints/components/complaint-status-badge'
import { ComplaintPriorityBadge } from '@/features/complaints/components/complaint-priority-badge'
import { ComplaintStatsCard } from '@/features/complaints/components/complaint-stats-card'
import { PageHeader } from '@/shared/components/layout/page-header'

export const Route = createFileRoute('/_protected/citizen/complaints')({
  component: CitizenComplaintsComponent,
})

function CitizenComplaintsComponent() {
  const [searchTerm, setSearchTerm] = React.useState('')
  const [filterStatus, setFilterStatus] = React.useState('all')

  const { data, isLoading } = useQuery({
    queryKey: ['citizen-complaints', filterStatus],
    queryFn: () => complaintService.listCitizen({ page: 1, limit: 100, status: filterStatus === 'all' ? undefined : filterStatus }),
  })

  const columns: ColumnDef<TComplaint>[] = [
    {
      accessorKey: 'title',
      header: 'Complaint Details',
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-bold text-slate-900">{row.original.title}</span>
          <span className="text-xs text-slate-500">{row.original.category}</span>
        </div>
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
      accessorKey: 'updatedAt',
      header: 'Last Updated',
      cell: ({ row }) => (
        <span className="text-sm text-slate-600 font-medium">
          {new Date(row.original.updatedAt).toLocaleDateString()}
        </span>
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: () => (
        <Button variant="ghost" size="sm" className="font-black text-primary hover:bg-primary/5 rounded-xl text-[10px]">
          View Resolution
        </Button>
      ),
    },
  ]

  const complaints = data?.data || []
  const stats = data?.stats || { total: 0, resolved: 0, pending: 0 }

  return (
    <div className="flex flex-col">
      <PageHeader
        title="Complaints & Feedback"
        description="Report community issues and track our progress in resolving them"
        icon={<MessageSquare className="h-6 w-6" />}
        action={
          <Link to="/citizen/complaints-new">
            <Button className="rounded-2xl h-12 px-6 font-black shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95 leading-none">
              <Plus className="mr-2 h-5 w-5" />
              File a New Complaint
            </Button>
          </Link>
        }
      />

      <div className="flex flex-col gap-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ComplaintStatsCard 
            label="Active Cases" 
            value={stats.pending || 0} 
            icon={Clock}
            color="text-amber-600 bg-amber-50"
          />
          <ComplaintStatsCard 
            label="Resolved Overall" 
            value={stats.resolved || 0} 
            icon={CheckCircle2}
            color="text-green-600 bg-green-50"
          />
          <ComplaintStatsCard 
            label="Average Response" 
            value="24 Hours" 
            icon={MessageSquare}
            color="text-blue-600 bg-blue-50"
          />
        </div>

        <div className="bg-slate-50/50 p-6 rounded-3xl border border-slate-100 flex flex-col gap-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search your reports..."
                className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 bg-white text-sm font-medium focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
              {['all', 'pending', 'investigating', 'resolved', 'closed'].map((status) => (
                <Button
                  key={status}
                  variant={filterStatus === status ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterStatus(status)}
                  className="capitalize font-bold rounded-xl px-4 h-9"
                >
                  {status}
                </Button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <DataTable
              columns={columns}
              data={complaints}
              isLoading={isLoading}
              searchValue={searchTerm}
              onSearchChange={setSearchTerm}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

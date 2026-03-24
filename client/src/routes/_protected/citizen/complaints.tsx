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
    queryFn: () =>
      complaintService.listCitizen({
        page: 1,
        limit: 100,
        status: filterStatus === 'all' ? undefined : filterStatus,
      }),
  })

  const columns: ColumnDef<TComplaint>[] = [
    {
      accessorKey: 'title',
      header: 'Complaint Details',
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-medium text-foreground">{row.original.title}</span>
          <span className="text-xs text-muted-foreground">
            {row.original.category}
          </span>
        </div>
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
      accessorKey: 'updatedAt',
      header: 'Last Updated',
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground">
          {new Date(row.original.updatedAt).toLocaleDateString()}
        </span>
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: () => (
        <Button
          variant="ghost"
          size="sm"
          className="text-primary hover:bg-primary/5 rounded-xl text-[10px] font-bold"
        >
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
            <Button className="shadow-primary/20 h-12 rounded-2xl px-6 leading-none font-bold shadow-xl transition-all hover:scale-105 active:scale-95">
              <Plus className="mr-2 h-5 w-5" />
              File a New Complaint
            </Button>
          </Link>
        }
      />

      <div className="flex flex-col gap-8 py-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
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

        <div className="flex flex-col gap-6 rounded-xl border border-border/60 bg-muted/30 p-5">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search your reports..."
                className="w-full rounded-lg border border-border/60 bg-background py-2.5 pr-4 pl-10 text-sm transition-all outline-none focus:border-border focus:ring-1 focus:ring-border/50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex w-full items-center gap-2 overflow-x-auto pb-2 sm:w-auto sm:pb-0">
              {['all', 'pending', 'investigating', 'resolved', 'closed'].map(
                (status) => (
                  <Button
                    key={status}
                    variant={filterStatus === status ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilterStatus(status)}
                    className="h-8 rounded-lg px-3 text-xs font-medium capitalize"
                  >
                    {status}
                  </Button>
                ),
              )}
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-border/60 bg-card">
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

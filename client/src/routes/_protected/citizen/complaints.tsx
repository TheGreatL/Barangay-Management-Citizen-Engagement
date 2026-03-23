import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { Plus, Search, MessageSquare, Clock, CheckCircle2, AlertCircle } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { Badge } from '@/shared/components/ui/badge'
import { DataTable } from '@/shared/components/ui/DataTable'
import type { ColumnDef } from '@tanstack/react-table'
import * as React from 'react'
import { getCitizenComplaints } from '@/mock/citizen-service'

export const Route = createFileRoute('/_protected/citizen/complaints')({
  component: CitizenComplaintsComponent,
})

type CitizenComplaint = {
  id: string
  title: string
  category: string
  status: 'pending' | 'investigating' | 'resolved' | 'closed'
  createdAt: string
  updatedAt: string
}

function CitizenComplaintsComponent() {
  const [searchTerm, setSearchTerm] = React.useState('')
  const [filterStatus, setFilterStatus] = React.useState<'all' | 'pending' | 'investigating' | 'resolved' | 'closed'>('all')

  const { data, isLoading } = useQuery({
    queryKey: ['citizen-complaints'],
    queryFn: () => getCitizenComplaints({ page: 1, limit: 100 }),
  })

  const columns: ColumnDef<CitizenComplaint>[] = [
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
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.original.status
        const config = {
          pending: { color: 'bg-amber-100 text-amber-700 border-amber-200', icon: Clock },
          investigating: { color: 'bg-blue-100 text-blue-700 border-blue-200', icon: AlertCircle },
          resolved: { color: 'bg-green-100 text-green-700 border-green-200', icon: CheckCircle2 },
          closed: { color: 'bg-slate-100 text-slate-700 border-slate-200', icon: CheckCircle2 },
        }
        const { color, icon: Icon } = config[status]
        return (
          <Badge className={`${color} border flex items-center gap-1.5 w-fit px-2.5 py-0.5`} variant="outline">
            <Icon className="h-3 w-3" />
            <span className="capitalize">{status}</span>
          </Badge>
        )
      },
    },
    {
      accessorKey: 'updatedAt',
      header: 'Last Updated',
      cell: ({ row }) => (
        <span className="text-sm text-slate-600">
          {new Date(row.original.updatedAt).toLocaleDateString()}
        </span>
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: () => (
        <Button variant="ghost" size="sm" className="font-bold text-primary hover:bg-primary/5">
          View Details
        </Button>
      ),
    },
  ]

  const filteredComplaints = data?.data.filter((complaint: CitizenComplaint) => {
    const matchesSearch = complaint.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || complaint.status === filterStatus
    return matchesSearch && matchesStatus
  })

  return (
    <div className="flex flex-col">
      <div className="bg-white border-b px-8 py-12">
        <div className="mx-auto w-full max-w-6xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-6">
            <h1 className="text-3xl font-black text-slate-900 flex items-center gap-3">
              <MessageSquare className="h-8 w-8 text-primary" />
              Complaints & Feedback
            </h1>
            <p className="text-slate-500 font-medium">Report issues and track their resolution status</p>
          </div>
          <Button size="lg" className="rounded-xl shadow-lg border-b-4 border-primary-foreground/20 active:border-b-0 active:translate-y-1 transition-all h-12 px-6">
            <Plus className="mr-2 h-5 w-5" />
            File a New Complaint
          </Button>
        </div>
      </div>

      <div className="flex-1 py-8">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="relative w-full sm:max-w-50">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search complaints..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
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
                  onClick={() => setFilterStatus(status as any)}
                  className="capitalize whitespace-nowrap"
                >
                  {status}
                </Button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
            <DataTable
              columns={columns}
              data={filteredComplaints || []}
              isLoading={isLoading}
              searchValue={searchTerm}
              onSearchChange={setSearchTerm}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <StatsCard 
              label="Active Complaints" 
              value={(filteredComplaints?.filter((c: CitizenComplaint) => c.status !== 'resolved').length || 0).toString()} 
              icon={Clock}
              color="text-amber-600 bg-amber-50"
            />
            <StatsCard 
              label="Resolved This Month" 
              value="12" 
              icon={CheckCircle2}
              color="text-green-600 bg-green-50"
            />
            <StatsCard 
              label="Average Response" 
              value="2 Days" 
              icon={MessageSquare}
              color="text-blue-600 bg-blue-50"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function StatsCard({ label, value, icon: Icon, color }: { label: string; value: string; icon: any; color: string }) {
  return (
    <div className="bg-white p-6 rounded-2xl border shadow-sm flex items-center gap-4">
      <div className={`${color} p-3 rounded-xl`}>
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <p className="text-xs font-bold text-slate-500 leading-none mb-1">{label}</p>
        <p className="text-2xl font-black text-slate-900">{value}</p>
      </div>
    </div>
  )
}

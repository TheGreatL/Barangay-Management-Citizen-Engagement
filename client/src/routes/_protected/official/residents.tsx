import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { Search, UserCheck, UserMinus, ShieldCheck, Mail, Phone, MoreHorizontal, FileText, History } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { Badge } from '@/shared/components/ui/badge'
import { DataTable } from '@/shared/components/ui/DataTable'
import type { ColumnDef, SortingState } from '@tanstack/react-table'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/shared/components/ui/dropdown-menu'
import * as React from 'react'
import { getOfficialResidents } from '@/mock/official-service'
import { cn } from '@/shared/lib/utils'

export const Route = createFileRoute('/_protected/official/residents')({
  component: OfficialResidentsComponent,
})

type Resident = {
  id: string
  firstName: string
  lastName: string
  residentId: string
  email: string
  phone: string
  address: string
  status: 'active' | 'inactive' | 'pending'
  lastVerified: string
}

function OfficialResidentsComponent() {
  const [searchTerm, setSearchTerm] = React.useState('')
  const [pagination, setPagination] = React.useState({ pageIndex: 0, pageSize: 10 })
  const [sorting, setSorting] = React.useState<SortingState>([])

  const { data, isLoading } = useQuery({
    queryKey: ['official-residents', searchTerm, pagination, sorting],
    queryFn: () => getOfficialResidents({
      page: pagination.pageIndex + 1,
      limit: pagination.pageSize,
      search: searchTerm,
      sort: sorting[0]?.id,
      order: sorting[0]?.desc ? 'desc' : 'asc'
    }),
  })

  const columns: ColumnDef<Resident, any>[] = [
    {
      accessorKey: 'firstName',
      header: 'Resident Name',
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-bold text-slate-900">{row.original.firstName} {row.original.lastName}</span>
          <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{row.original.residentId}</span>
        </div>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const statuses = {
          active: 'bg-green-100 text-green-700 border-green-200',
          inactive: 'bg-slate-100 text-slate-600 border-slate-200',
          pending: 'bg-amber-100 text-amber-700 border-amber-200',
        }
        return (
          <Badge className={cn("capitalize px-3 py-0.5 border shadow-xs font-black", statuses[row.original.status])} variant="outline">
            {row.original.status}
          </Badge>
        )
      },
    },
    {
      accessorKey: 'lastVerified',
      header: 'Last Verified',
      cell: ({ row }) => (
        <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
          <ShieldCheck className="h-3.5 w-3.5 text-blue-500" />
          {new Date(row.original.lastVerified).toLocaleDateString()}
        </div>
      ),
    },
    {
      id: 'contact',
      header: 'Contact Info',
      cell: ({ row }) => (
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Mail className="h-3 w-3" />
            {row.original.email}
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Phone className="h-3 w-3" />
            {row.original.phone}
          </div>
        </div>
      ),
    },
    {
      id: 'actions',
      cell: () => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-slate-100 rounded-lg transition-all">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 font-bold rounded-xl shadow-xl overflow-hidden border-slate-200">
            <DropdownMenuItem className="text-blue-600 focus:text-blue-700 focus:bg-blue-50 cursor-pointer py-2">
              <UserCheck className="mr-2 h-4 w-4" /> Verify Resident
            </DropdownMenuItem>
            <DropdownMenuItem className="py-2 cursor-pointer">
              <FileText className="mr-2 h-4 w-4" /> View Documents
            </DropdownMenuItem>
            <DropdownMenuItem className="py-2 cursor-pointer">
              <History className="mr-2 h-4 w-4" /> Activity Logs
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-500 focus:text-red-600 focus:bg-red-50 cursor-pointer py-2 border-t mt-1">
              <UserMinus className="mr-2 h-4 w-4" /> Deactivate
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]

  return (
    <div className="p-6 space-y-8 max-w-400 mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-slate-900">Resident Directory</h1>
          <p className="text-muted-foreground mt-1 text-lg font-medium tracking-tight">Access, verify, and manage all community member profile.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl font-bold h-12 shadow-sm">Export Data</Button>
          <Button className="rounded-xl font-black h-12 px-6 shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95">Add New Resident</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatsTile label="Total Residents" value={data?.meta.total.toString() || '0'} growth="+4.2%" color="blue" />
        <StatsTile label="Verified Profiles" value="1,240" growth="+12%" color="green" />
        <StatsTile label="Pending Verification" value="48" growth="-2" color="amber" />
        <StatsTile label="Recent Inactive" value="12" growth="0" color="slate" />
      </div>

      <div className="bg-card border rounded-3xl shadow-sm overflow-hidden p-6 space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, resident ID, or email..."
              className="w-full pl-12 pr-4 py-3 rounded-2xl border bg-slate-50 focus:ring-4 focus:ring-primary/10 transition-all outline-none font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="h-10 px-4 rounded-xl font-black uppercase text-[10px] tracking-widest bg-slate-50">Filter Options</Badge>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={data?.data || []}
          isLoading={isLoading}
          pagination={pagination}
          onPaginationChange={setPagination}
          pageCount={Math.ceil((data?.meta.total || 0) / pagination.pageSize)}
          sorting={sorting}
          onSortingChange={setSorting}
        />
      </div>
    </div>
  )
}

function StatsTile({ label, value, growth, color }: { label: string; value: string; growth: string; color: string }) {
  const colors: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    amber: 'bg-amber-50 text-amber-600',
    slate: 'bg-slate-50 text-slate-600',
  }

  return (
    <div className="bg-card border rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow group">
      <div className="flex items-center justify-between mb-4">
        <div className={cn("p-2 rounded-xl transition-transform group-hover:scale-110", colors[color])}>
          <ShieldCheck className="h-6 w-6" />
        </div>
        <Badge variant={growth.includes('+') ? 'default' : 'secondary'} className={cn("text-[10px] h-5 rounded-full px-2", growth.includes('+') ? 'bg-green-500 text-white' : 'bg-slate-100 text-slate-600')}>
          {growth}
        </Badge>
      </div>
      <p className="text-xs font-black text-slate-400 uppercase tracking-widest leading-none mb-2">{label}</p>
      <h3 className="text-3xl font-black text-slate-900 tracking-tighter">{value}</h3>
    </div>
  )
}

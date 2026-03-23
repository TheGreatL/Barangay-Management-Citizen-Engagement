import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { Search, ShieldCheck, MoreHorizontal } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { Badge } from '@/shared/components/ui/badge'
import { DataTable } from '@/shared/components/ui/DataTable'
import type { ColumnDef, SortingState } from '@tanstack/react-table'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/shared/components/ui/dropdown-menu'
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
          <span className="font-semibold text-slate-900">{row.original.firstName} {row.original.lastName}</span>
          <span className="text-xs font-medium text-slate-400">{row.original.residentId}</span>
        </div>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const statuses = {
          active: 'bg-green-50 text-green-700 border-green-100',
          inactive: 'bg-slate-50 text-slate-600 border-slate-100',
          pending: 'bg-amber-50 text-amber-700 border-amber-100',
        }
        return (
          <Badge className={cn("capitalize px-2 py-0 border font-medium", statuses[row.original.status])} variant="outline">
            {row.original.status}
          </Badge>
        )
      },
    },
    {
      accessorKey: 'lastVerified',
      header: 'Last Verified',
      cell: ({ row }) => (
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <ShieldCheck className="h-3.5 w-3.5 text-blue-500" />
          {new Date(row.original.lastVerified).toLocaleDateString()}
        </div>
      ),
    },
    {
      id: 'contact',
      header: 'Contact Info',
      cell: ({ row }) => (
        <div className="flex flex-col text-xs text-slate-500">
          <span>{row.original.email}</span>
          <span>{row.original.phone}</span>
        </div>
      ),
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
            <DropdownMenuItem>Verify Resident</DropdownMenuItem>
            <DropdownMenuItem>View Documents</DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">Deactivate</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]

  return (
    <div className="animate-in fade-in slide-in-from-top-4 space-y-8 p-8 duration-500">
      <div className="mx-auto w-full max-w-6xl space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Resident Directory</h1>
            <p className="text-slate-500 mt-1">Access, verify, and manage all community member profiles.</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline">Export Data</Button>
            <Button>Add New Resident</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsTile label="Total Residents" value={data?.meta.total.toString() || '0'} growth="+4.2%" color="blue" />
          <StatsTile label="Verified Profiles" value="1,240" growth="+12%" color="green" />
          <StatsTile label="Pending Verification" value="48" growth="-2" color="amber" />
          <StatsTile label="Recent Inactive" value="12" growth="0" color="slate" />
        </div>

        <div className="rounded-xl border border-slate-200 bg-card p-6 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name, ID, or email..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 bg-slate-50/50 focus:ring-2 focus:ring-primary/10 transition-all outline-none text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs font-bold text-slate-500">Filters</Badge>
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
    <div className="rounded-xl border border-slate-200 bg-card p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className={cn("p-2 rounded-lg", colors[color])}>
          <ShieldCheck className="h-5 w-5" />
        </div>
        <Badge variant={growth.includes('+') ? 'default' : 'secondary'} className="text-xs rounded-full px-2">
          {growth}
        </Badge>
      </div>
      <p className="text-sm font-medium text-slate-500 mb-1">{label}</p>
      <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
    </div>
  )
}

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
  DropdownMenuTrigger,
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
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  })
  const [sorting, setSorting] = React.useState<SortingState>([])

  const { data, isLoading } = useQuery({
    queryKey: ['official-residents', searchTerm, pagination, sorting],
    queryFn: () =>
      getOfficialResidents({
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
        search: searchTerm,
        sort: sorting[0]?.id,
        order: sorting[0]?.desc ? 'desc' : 'asc',
      }),
  })

  const columns: ColumnDef<Resident, any>[] = [
    {
      accessorKey: 'firstName',
      header: 'Resident Name',
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="text-foreground font-semibold">
            {row.original.firstName} {row.original.lastName}
          </span>
          <span className="text-muted-foreground text-xs font-medium">
            {row.original.residentId}
          </span>
        </div>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const statuses = {
          active:
            'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800',
          inactive: 'bg-muted text-muted-foreground border-border',
          pending:
            'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800',
        }
        return (
          <Badge
            className={cn(
              'border px-2 py-0 font-medium capitalize',
              statuses[row.original.status],
            )}
            variant="outline"
          >
            {row.original.status}
          </Badge>
        )
      },
    },
    {
      accessorKey: 'lastVerified',
      header: 'Last Verified',
      cell: ({ row }) => (
        <div className="text-muted-foreground flex items-center gap-2 text-sm">
          <ShieldCheck className="h-3.5 w-3.5 text-sky-500" />
          {new Date(row.original.lastVerified).toLocaleDateString()}
        </div>
      ),
    },
    {
      id: 'contact',
      header: 'Contact Info',
      cell: ({ row }) => (
        <div className="text-muted-foreground flex flex-col text-xs">
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
            <DropdownMenuItem className="text-red-600">
              Deactivate
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]

  return (
    <div className="space-y-8 py-8">
      <div className="space-y-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-foreground text-2xl font-semibold tracking-tight">
              Resident Directory
            </h1>
            <p className="text-muted-foreground mt-1 text-sm">
              Access, verify, and manage all community member profiles.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline">Export Data</Button>
            <Button>Add New Resident</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsTile
            label="Total Residents"
            value={data?.meta.total.toString() || '0'}
            growth="+4.2%"
            color="blue"
          />
          <StatsTile
            label="Verified Profiles"
            value="1,240"
            growth="+12%"
            color="green"
          />
          <StatsTile
            label="Pending Verification"
            value="48"
            growth="-2"
            color="amber"
          />
          <StatsTile
            label="Recent Inactive"
            value="12"
            growth="0"
            color="slate"
          />
        </div>

        <div className="bg-card border-border/60 space-y-6 rounded-xl border p-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="relative w-full sm:max-w-md">
              <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by name, ID, or email..."
                className="border-border/60 bg-muted/30 focus:border-border focus:bg-background focus:ring-border/50 w-full rounded-lg border py-2 pr-4 pl-10 text-sm transition-all outline-none focus:ring-1"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className="text-muted-foreground text-xs font-medium"
              >
                Filters
              </Badge>
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

function StatsTile({
  label,
  value,
  growth,
  color,
}: {
  label: string
  value: string
  growth: string
  color: string
}) {
  const colors: Record<string, string> = {
    blue: 'bg-sky-50 text-sky-600 dark:bg-sky-900/20 dark:text-sky-400',
    green:
      'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400',
    amber:
      'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400',
    slate: 'bg-muted text-muted-foreground',
  }

  return (
    <div className="bg-card border-border/60 hover:border-border rounded-xl border p-5 transition-all">
      <div className="mb-4 flex items-center justify-between">
        <div className={cn('rounded-lg p-2', colors[color])}>
          <ShieldCheck className="h-4 w-4" />
        </div>
        <Badge
          variant={growth.includes('+') ? 'default' : 'secondary'}
          className="rounded-full px-2 text-xs"
        >
          {growth}
        </Badge>
      </div>
      <p className="text-muted-foreground mb-1 text-xs font-medium">{label}</p>
      <h3 className="text-foreground text-2xl font-semibold">{value}</h3>
    </div>
  )
}

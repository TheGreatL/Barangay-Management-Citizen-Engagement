import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { Plus, Edit2, Trash2, FileText, Users, MapPin, Search } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { Badge } from '@/shared/components/ui/badge'
import * as React from 'react'
import { DataTable } from '@/shared/components/ui/DataTable'
import type { ColumnDef, PaginationState, SortingState } from '@tanstack/react-table'
import { getResidents } from '@/mock/resident-service'
import { cn } from '@/shared/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'
import { MoreHorizontal } from 'lucide-react'

export const Route = createFileRoute('/_protected/admin/residents')({
  component: AdminResidentsComponent,
})

type Resident = {
  id: string
  firstName: string
  lastName: string
  birthDate: string
  gender: string
  address: string
  householdId: string
  isHeadOfHousehold: boolean
  createdAt: string
}

function AdminResidentsComponent() {
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [searchValue, setSearchValue] = React.useState('')

  const { data, isLoading } = useQuery({
    queryKey: ['admin-residents', pagination, sorting, searchValue],
    queryFn: () =>
      getResidents({
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
        sort: sorting[0]?.id,
        order: sorting[0]?.desc ? 'desc' : 'asc',
        search: searchValue,
      }),
  })

  const columns: ColumnDef<Resident>[] = [
    {
      accessorKey: 'firstName',
      header: 'First Name',
    },
    {
      accessorKey: 'lastName',
      header: 'Last Name',
    },
    {
      accessorKey: 'gender',
      header: 'Gender',
      cell: ({ row }) => {
        const gender = row.getValue('gender') as string
        return (
          <Badge variant="outline" className="capitalize">
            {gender.toLowerCase()}
          </Badge>
        )
      },
    },
    {
      accessorKey: 'birthDate',
      header: 'Age',
      cell: ({ row }) => {
        const birthDate = new Date(row.getValue('birthDate'))
        const age = new Date().getFullYear() - birthDate.getFullYear()
        return age
      },
    },
    {
      accessorKey: 'address',
      header: 'Address',
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
            <MapPin className="h-3 w-3 text-muted-foreground" />
            <span className="max-w-[200px] truncate">{row.getValue('address')}</span>
          </div>
        )
      },
    },
    {
      accessorKey: 'isHeadOfHousehold',
      header: 'Role in HH',
      cell: ({ row }) => {
        const isHead = row.getValue('isHeadOfHousehold') as boolean
        return isHead ? (
          <Badge className="bg-blue-100 text-blue-800 border-blue-200">Head</Badge>
        ) : (
          <Badge variant="outline">Member</Badge>
        )
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const resident = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(resident.id)}>
                Copy ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <FileText className="mr-2 h-4 w-4" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Edit2 className="mr-2 h-4 w-4" />
                Edit Record
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Record
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Resident Records</h1>
          <p className="text-muted-foreground mt-1">
            Maintain and manage exhaustive data for all barangay residents.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Users className="mr-2 h-4 w-4" />
            Household Link
          </Button>
          <Button size="lg" className="shadow-xs transition-all hover:-translate-y-px">
            <Plus className="mr-2 h-4 w-4" />
            Add Resident
          </Button>
        </div>
      </div>

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
        searchPlaceholder="Search residents by name or address..."
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Total Residents" value="4,562" icon={Users} color="blue" />
        <StatCard title="Total Households" value="1,120" icon={FileText} color="purple" />
        <StatCard title="New This Month" value="45" icon={Plus} color="green" />
        <StatCard title="Unassigned Address" value="23" icon={MapPin} color="orange" />
      </div>
    </div>
  )
}

function StatCard({ title, value, icon: Icon, color }: { title: string; value: string; icon: any; color: string }) {
  const colors: Record<string, string> = {
    blue: 'bg-blue-100 text-blue-600',
    purple: 'bg-purple-100 text-purple-600',
    green: 'bg-green-100 text-green-600',
    orange: 'bg-orange-100 text-orange-600',
  }

  return (
    <div className="rounded-xl border bg-card p-4 flex items-center gap-4 shadow-sm">
      <div className={cn('h-10 w-10 rounded-full flex items-center justify-center', colors[color])}>
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  )
}

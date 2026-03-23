import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { Plus, Edit2, Trash2, MoreHorizontal, UserCheck, UserX, Shield } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { Badge } from '@/shared/components/ui/badge'
import * as React from 'react'
import { DataTable } from '@/shared/components/ui/DataTable'
import type { ColumnDef, PaginationState, SortingState } from '@tanstack/react-table'
import { getUsers } from '@/mock/user-service'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'
import { Card } from '@/shared/components/ui/card'

export const Route = createFileRoute('/_protected/admin/users')({
  component: AdminUsersComponent,
})

type User = {
  id: string
  firstName: string
  lastName: string
  email: string
  role: string
  status: string
  createdAt: string
}

function AdminUsersComponent() {
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [searchValue, setSearchValue] = React.useState('')

  const { data, isLoading } = useQuery({
    queryKey: ['admin-users', pagination, sorting, searchValue],
    queryFn: () =>
      getUsers({
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
        sort: sorting[0]?.id,
        order: sorting[0]?.desc ? 'desc' : 'asc',
        search: searchValue,
      }),
  })

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: 'firstName',
      header: 'First Name',
    },
    {
      accessorKey: 'lastName',
      header: 'Last Name',
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'role',
      header: 'Role',
      cell: ({ row }) => {
        const role = row.original.role
        const colors: Record<string, string> = {
          ADMIN: 'bg-red-100 text-red-800 border-red-200',
          CITIZEN: 'bg-blue-100 text-blue-800 border-blue-200',
          OFFICIAL: 'bg-purple-100 text-purple-800 border-purple-200',
        }
        return (
          <Badge variant="outline" className={colors[role]}>
            {role}
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
          ACTIVE: 'bg-green-100 text-green-800 border-green-200',
          INACTIVE: 'bg-gray-100 text-gray-800 border-gray-200',
          DEACTIVATED: 'bg-orange-100 text-orange-800 border-orange-200',
        }
        return (
          <Badge variant="outline" className={colors[status]}>
            {status}
          </Badge>
        )
      },
    },
    {
      accessorKey: 'createdAt',
      header: 'Joined',
      cell: ({ row }) => {
        return new Date(row.getValue('createdAt')).toLocaleDateString()
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const user = row.original

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
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(user.id)}>
                Copy User ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Edit2 className="mr-2 h-4 w-4" />
                Edit User
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Shield className="mr-2 h-4 w-4" />
                Manage Permissions
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                <Trash2 className="mr-2 h-4 w-4" />
                Deactivate Account
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
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground mt-1">
            Create, update, and manage system users and their access levels.
          </p>
        </div>
        <Button size="lg" className="shadow-xs transition-all hover:-translate-y-px">
          <Plus className="mr-2 h-4 w-4" />
          Add New User
        </Button>
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
        searchPlaceholder="Search by name, email or role..."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 flex flex-row items-center gap-4">
          <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
            <UserCheck className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Active Users</p>
            <p className="text-2xl font-bold">1,234</p>
          </div>
        </Card>
        <Card className="p-4 flex flex-row items-center gap-4">
          <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
            <UserX className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Inactive</p>
            <p className="text-2xl font-bold">56</p>
          </div>
        </Card>
        <Card className="p-4 flex flex-row items-center gap-4">
          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
            <Shield className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Officials</p>
            <p className="text-2xl font-bold">12</p>
          </div>
        </Card>
      </div>
    </div>
  )
}


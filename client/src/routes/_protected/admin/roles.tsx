import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import {
  Shield,
  Plus,
  Edit2,
  Trash2,
  Users,
  CheckCircle2,
  MoreHorizontal,
} from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { Badge } from '@/shared/components/ui/badge'
import { DataTable } from '@/shared/components/ui/DataTable'
import type { ColumnDef } from '@tanstack/react-table'
import { getRoles } from '@/mock/role-service'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card'

export const Route = createFileRoute('/_protected/admin/roles')({
  component: AdminRolesComponent,
})

type Role = {
  id: string
  name: string
  description: string
  permissions: string[]
  userCount: number
  createdAt: string
}

function AdminRolesComponent() {
  const { data, isLoading } = useQuery({
    queryKey: ['admin-roles'],
    queryFn: () => getRoles(),
  })

  const columns: ColumnDef<Role>[] = [
    {
      accessorKey: 'name',
      header: 'Role Name',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Shield className="text-primary h-4 w-4" />
          <span className="font-bold">{row.getValue('name')}</span>
        </div>
      ),
    },
    {
      accessorKey: 'description',
      header: 'Description',
      cell: ({ row }) => (
        <span className="text-muted-foreground block min-w-[300px] whitespace-normal">
          {row.getValue('description')}
        </span>
      ),
    },
    {
      accessorKey: 'userCount',
      header: 'Users',
      cell: ({ row }) => (
        <div className="flex items-center gap-1.5">
          <Users className="text-muted-foreground h-4 w-4" />
          <span>{row.getValue('userCount')}</span>
        </div>
      ),
    },
    {
      accessorKey: 'permissions',
      header: 'Permissions',
      cell: ({ row }) => {
        const permissions: string[] = row.getValue('permissions')
        return (
          <div className="flex max-w-[400px] flex-wrap gap-1">
            {permissions.includes('ALL') ? (
              <Badge className="border-red-200 bg-red-100 text-red-800">
                All Access
              </Badge>
            ) : (
              permissions.slice(0, 3).map((p) => (
                <Badge
                  key={p}
                  variant="secondary"
                  className="text-xs"
                >
                  {p.replace('_', ' ')}
                </Badge>
              ))
            )}
            {permissions.length > 3 && !permissions.includes('ALL') && (
              <Badge variant="outline" className="text-xs">
                +{permissions.length - 3} more
              </Badge>
            )}
          </div>
        )
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const role = row.original

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
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Edit2 className="mr-2 h-4 w-4" />
                Edit Role
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Shield className="mr-2 h-4 w-4" />
                Edit Permissions
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Role
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  return (
    <div className="space-y-8 py-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Role & RBAC Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Define roles and fine-grained permissions for users and officials.
          </p>
        </div>
        <Button
          size="lg"
          className="shadow-xs transition-all hover:-translate-y-px"
        >
          <Plus className="mr-2 h-4 w-4" />
          Create New Role
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={data?.data || []}
        isLoading={isLoading}
        searchPlaceholder="Search roles..."
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg font-bold">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              Active Policies
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <PolicyItem
              title="Multi-Factor Auth"
              description="Enforced for all Admin accounts"
              active
            />
            <PolicyItem
              title="Session Timeout"
              description="Automatic logout after 30 mins of inactivity"
              active
            />
            <PolicyItem
              title="Password Rotation"
              description="Require change every 90 days"
              active={false}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg font-bold">
              <Shield className="text-primary h-5 w-5" />
              Security Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted rounded-lg p-3 text-center">
                <p className="text-2xl font-bold">15</p>
                <p className="text-muted-foreground text-xs font-semibold">
                  Total Permissions
                </p>
              </div>
              <div className="bg-muted rounded-lg p-3 text-center">
                <p className="text-2xl font-bold">3</p>
                <p className="text-muted-foreground text-xs font-semibold">
                  Base Roles
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function PolicyItem({
  title,
  description,
  active,
}: {
  title: string
  description: string
  active: boolean
}) {
  return (
    <div className="bg-background/50 flex items-center justify-between rounded-lg border p-3">
      <div>
        <h4 className="text-sm font-semibold">{title}</h4>
        <p className="text-muted-foreground text-xs">{description}</p>
      </div>
      {active ? (
        <Badge className="border-none bg-green-100 text-green-700 hover:bg-green-100">
          Active
        </Badge>
      ) : (
        <Badge variant="outline" className="text-muted-foreground">
          Inactive
        </Badge>
      )}
    </div>
  )
}

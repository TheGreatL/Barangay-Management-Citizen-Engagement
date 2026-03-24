import { createFileRoute, Link } from '@tanstack/react-router'
import { useAuthStore } from '@/shared/stores/auth.store'
import { Button } from '@/shared/components/ui/button'
import {
  Users,
  BarChart3,
  Settings,
  AlertCircle,
  TrendingUp,
  Database,
  Shield,
  LogOut,
} from 'lucide-react'

export const Route = createFileRoute('/_protected/admin/dashboard')({
  component: AdminDashboardComponent,
})

function AdminDashboardComponent() {
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)

  const systemStats = [
    { label: 'Total Users', value: '3,248', icon: Users },
    { label: 'Active Sessions', value: '412', icon: Shield },
    { label: 'System Health', value: '99.8%', icon: TrendingUp },
    { label: 'Database Size', value: '2.4 GB', icon: Database },
  ]

  const adminLinks = [
    {
      title: 'User Management',
      description: 'Manage system users and roles',
      icon: Users,
      href: '/admin/users',
      color: 'bg-blue-50 text-blue-600',
    },
    {
      title: 'System Analytics',
      description: 'View system-wide analytics',
      icon: BarChart3,
      href: '/admin/analytics',
      color: 'bg-purple-50 text-purple-600',
    },
    {
      title: 'Announcements',
      description: 'Manage system announcements',
      icon: AlertCircle,
      href: '/admin/announcements',
      color: 'bg-yellow-50 text-yellow-600',
    },
    {
      title: 'System Settings',
      description: 'Configure system parameters',
      icon: Settings,
      href: '/admin/settings',
      color: 'bg-green-50 text-green-600',
    },
  ]

  return (
    <div className="space-y-8 py-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              Admin Dashboard
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              System administration and configuration panel
            </p>
          </div>
          <Button onClick={logout} variant="outline">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        {/* System Stats */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
          {systemStats.map((stat, idx) => {
            const Icon = stat.icon
            return (
              <div
                key={idx}
                className="rounded-xl border border-border/60 bg-card p-5 transition-all hover:border-border"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">
                      {stat.label}
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-foreground">
                      {stat.value}
                    </p>
                  </div>
                  <Icon className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
            )
          })}
        </div>

        {/* Admin Actions */}
        <div>
          <h2 className="mb-4 text-sm font-semibold text-foreground">
            Administration
          </h2>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
            {adminLinks.map((link) => {
              const Icon = link.icon
              return (
                <Link key={link.href} to={link.href}>
                  <div className="group rounded-xl border border-border/60 bg-card p-5 transition-all hover:border-border hover:shadow-sm">
                    <div className={`inline-flex rounded-lg ${link.color} dark:bg-opacity-20 p-2.5`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-sm font-medium text-foreground">
                      {link.title}
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {link.description}
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

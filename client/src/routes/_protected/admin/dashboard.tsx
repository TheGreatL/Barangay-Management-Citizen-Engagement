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
    <div className="animate-in fade-in slide-in-from-top-4 space-y-8 p-8 duration-500">
      <div className="mx-auto w-full max-w-6xl space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Admin Dashboard
            </h1>
            <p className="mt-2 text-slate-600">
              System administration and configuration panel
            </p>
          </div>
          <Button onClick={logout} variant="outline">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        {/* System Stats */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {systemStats.map((stat, idx) => {
            const Icon = stat.icon
            return (
              <div
                key={idx}
                className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      {stat.label}
                    </p>
                    <p className="mt-2 text-2xl font-bold text-slate-900">
                      {stat.value}
                    </p>
                  </div>
                  <Icon className="h-6 w-6 text-slate-400" />
                </div>
              </div>
            )
          })}
        </div>

        {/* Admin Actions */}
        <div>
          <h2 className="mb-4 text-xl font-bold text-slate-900">
            Administration
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {adminLinks.map((link) => {
              const Icon = link.icon
              return (
                <Link key={link.href} to={link.href}>
                  <div className="group rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:border-slate-300 hover:shadow-md">
                    <div className={`inline-flex rounded-lg ${link.color} p-3`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-4 font-semibold text-slate-900 group-hover:text-blue-600">
                      {link.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-600">
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

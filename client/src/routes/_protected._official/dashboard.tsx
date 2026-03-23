import { createFileRoute, Link } from '@tanstack/react-router'
import { useAuthStore } from '@/shared/stores/auth.store'
import { Button } from '@/shared/components/ui/button'
import {
  AlertCircle,
  Users,
  FileText,
  BarChart3,
  MapPin,
  TrendingUp,
} from 'lucide-react'

export const Route = createFileRoute('/_protected/_official/dashboard')({
  component: OfficialDashboardComponent,
})

function OfficialDashboardComponent() {
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)

  const quickLinks = [
    {
      title: 'Manage Complaints',
      description: 'Review and manage complaints',
      icon: AlertCircle,
      href: '/official/complaints',
      color: 'bg-red-50 text-red-600',
    },
    {
      title: 'Residents',
      description: 'Manage resident records',
      icon: Users,
      href: '/official/residents',
      color: 'bg-blue-50 text-blue-600',
    },
    {
      title: 'Document Requests',
      description: 'Process document requests',
      icon: FileText,
      href: '/official/documents',
      color: 'bg-purple-50 text-purple-600',
    },
    {
      title: 'Reports & Analytics',
      description: 'View analytics and reports',
      icon: BarChart3,
      href: '/official/reports',
      color: 'bg-green-50 text-green-600',
    },
  ]

  const stats = [
    { label: 'Pending Complaints', value: 12, icon: AlertCircle },
    { label: 'Active Residents', value: 1248, icon: Users },
    { label: 'Pending Requests', value: 8, icon: FileText },
    { label: 'This Month Growth', value: '+5%', icon: TrendingUp },
  ]

  return (
    <div className="animate-in fade-in slide-in-from-top-4 space-y-8 p-8 duration-500">
      <div className="mx-auto w-full max-w-6xl space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Official Dashboard
            </h1>
            <p className="mt-2 text-slate-600">
              Manage barangay operations and citizen requests
            </p>
          </div>
          <Button onClick={logout} variant="outline">
            Logout
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, idx) => {
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

        {/* Quick Actions */}
        <div>
          <h2 className="mb-4 text-xl font-bold text-slate-900">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {quickLinks.map((link) => {
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

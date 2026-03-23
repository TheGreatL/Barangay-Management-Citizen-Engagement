import { createFileRoute, Link } from '@tanstack/react-router'
import { useAuthStore } from '@/shared/stores/auth.store'
import { Button } from '@/shared/components/ui/button'
import { LoadingDashboard } from '@/features/dashboard/components/loading-dashboard'
import { AlertCircle, FileText, Bell, Wrench, LayoutGrid } from 'lucide-react'

export const Route = createFileRoute('/_protected/dashboard')({
  component: DashboardComponent,
  pendingComponent: LoadingDashboard,
})

function DashboardComponent() {
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)

  const quickLinks = [
    {
      title: 'Submit Complaint',
      description: 'Report issues or complaints',
      icon: AlertCircle,
      href: '/dashboard/complaints',
      color: 'bg-red-50 text-red-600',
    },
    {
      title: 'Document Requests',
      description: 'Request barangay documents',
      icon: FileText,
      href: '/dashboard/documents',
      color: 'bg-blue-50 text-blue-600',
    },
    {
      title: 'Announcements',
      description: 'Latest barangay updates',
      icon: Bell,
      href: '/dashboard/announcements',
      color: 'bg-yellow-50 text-yellow-600',
    },
    {
      title: 'Services',
      description: 'Available community services',
      icon: Wrench,
      href: '/dashboard/services',
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
              Welcome, {user?.firstName}!
            </h1>
            <p className="mt-2 text-slate-600">
              Here's an overview of your account and available services
            </p>
          </div>
          <Button onClick={logout} variant="outline">
            Logout
          </Button>
        </div>

        {/* Profile Card */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-sm font-medium text-slate-500">Account Type</h3>
            <p className="mt-2 text-2xl font-bold text-slate-900 capitalize">
              {user?.role.replace('_', ' ')}
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-sm font-medium text-slate-500">Email</h3>
            <p className="mt-2 truncate text-xl font-bold text-slate-900">
              {user?.email}
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-sm font-medium text-slate-500">Status</h3>
            <p className="mt-2 text-xl font-bold text-green-600">Active</p>
          </div>
        </div>

        {/* Quick Links Grid */}
        <div>
          <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-slate-900">
            <LayoutGrid className="h-5 w-5" />
            Quick Access
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

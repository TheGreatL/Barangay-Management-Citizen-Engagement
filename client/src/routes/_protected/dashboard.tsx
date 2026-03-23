import { createFileRoute, Link } from '@tanstack/react-router'
import { useAuthStore } from '@/shared/stores/auth.store'
import { LoadingDashboard } from '@/features/dashboard/components/loading-dashboard'
import { PageHeader } from '@/shared/components/layout/page-header'
import { AlertCircle, FileText, Bell, Wrench, Home } from 'lucide-react'

export const Route = createFileRoute('/_protected/dashboard')({
  component: DashboardComponent,
  pendingComponent: LoadingDashboard,
})

function DashboardComponent() {
  const user = useAuthStore((state) => state.user)

  const quickLinks = [
    {
      title: 'Submit Complaint',
      description: 'Report issues or complaints',
      icon: AlertCircle,
      href: '/dashboard/complaints',
      color: 'bg-red-50 text-red-600',
      bgColor: 'hover:bg-red-50',
    },
    {
      title: 'Document Requests',
      description: 'Request barangay documents',
      icon: FileText,
      href: '/dashboard/documents',
      color: 'bg-blue-50 text-blue-600',
      bgColor: 'hover:bg-blue-50',
    },
    {
      title: 'Announcements',
      description: 'Latest barangay updates',
      icon: Bell,
      href: '/dashboard/announcements',
      color: 'bg-yellow-50 text-yellow-600',
      bgColor: 'hover:bg-yellow-50',
    },
    {
      title: 'Services',
      description: 'Available community services',
      icon: Wrench,
      href: '/dashboard/services',
      color: 'bg-green-50 text-green-600',
      bgColor: 'hover:bg-green-50',
    },
  ]

  return (
    <div className="flex flex-col">
      <PageHeader
        title={`Welcome, ${user?.firstName}!`}
        description="Here's an overview of your account and available services"
        icon={<Home className="h-6 w-6" />}
      />

      {/* Main Content */}
      <div className="flex-1 px-6 py-8 sm:px-8">
        <div className="mx-auto w-full max-w-6xl space-y-8">
          {/* Profile Card */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-sm font-medium text-slate-500">Account Type</h3>
              <p className="mt-3 text-2xl font-bold text-slate-900 capitalize">
                {user?.role.replace('_', ' ')}
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-sm font-medium text-slate-500">Email Address</h3>
              <p className="mt-3 truncate text-lg font-semibold text-slate-900">
                {user?.email}
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-sm font-medium text-slate-500">Account Status</h3>
              <div className="mt-3 flex items-center gap-2">
                <span className="inline-block h-3 w-3 rounded-full bg-green-500" />
                <p className="text-lg font-semibold text-slate-900">Active</p>
              </div>
            </div>
          </div>

          {/* Quick Links Grid */}
          <div>
            <h2 className="mb-6 text-xl font-bold text-slate-900">Quick Actions</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {quickLinks.map((link) => {
                const Icon = link.icon
                return (
                  <Link key={link.href} to={link.href}>
                    <div className="group h-full rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:border-slate-300 hover:shadow-lg">
                      <div className={`inline-flex rounded-lg ${link.color} p-3`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="mt-4 font-semibold text-slate-900 group-hover:text-blue-600">
                        {link.title}
                      </h3>
                      <p className="mt-2 text-sm text-slate-600">
                        {link.description}
                      </p>
                      <div className="mt-4 flex items-center text-sm font-medium text-blue-600 opacity-0 transition-opacity group-hover:opacity-100">
                        Get Started →
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

import { createFileRoute, Link } from '@tanstack/react-router'
import { useAuthStore } from '@/shared/stores/auth.store'
import { LoadingDashboard } from '@/features/dashboard/components/loading-dashboard'
import { PageHeader } from '@/shared/components/layout/page-header'
import { DashboardStats } from '@/features/dashboard/components/dashboard-stats'
import { RecentActivity } from '@/features/dashboard/components/recent-activity'
import { UpcomingEvents } from '@/features/dashboard/components/upcoming-events'
import {
  AlertCircle,
  FileText,
  Bell,
  Wrench,
  Home,
  CheckCircle,
  Clock,
} from 'lucide-react'
import { addDays } from 'date-fns'

export const Route = createFileRoute('/_protected/dashboard')({
  component: DashboardComponent,
  pendingComponent: LoadingDashboard,
})

function DashboardComponent() {
  const user = useAuthStore((state) => state.user)

  // Mock stats data
  const stats = [
    {
      label: 'Active Complaints',
      value: '2',
      change: 8,
      trend: 'up' as const,
      color: 'bg-red-50',
    },
    {
      label: 'Pending Documents',
      value: '1',
      change: 5,
      trend: 'down' as const,
      color: 'bg-blue-50',
    },
    {
      label: 'Announcements Read',
      value: '12',
      change: 12,
      trend: 'up' as const,
      color: 'bg-yellow-50',
    },
    {
      label: 'Services Accessed',
      value: '5',
      change: 3,
      trend: 'up' as const,
      color: 'bg-green-50',
    },
  ]

  // Mock recent activity
  const recentActivities = [
    {
      id: '1',
      type: 'complaint' as const,
      title: 'Complaint #C-2024-001',
      description: 'Road damage reported in Zone A',
      status: 'in-progress' as const,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    },
    {
      id: '2',
      type: 'document' as const,
      title: 'Barangay Clearance',
      description: 'Document request submitted',
      status: 'pending' as const,
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    },
    {
      id: '3',
      type: 'announcement' as const,
      title: 'Community Cleanup Drive',
      description: 'Scheduled for this Saturday at 8 AM',
      status: 'completed' as const,
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    },
    {
      id: '4',
      type: 'message' as const,
      title: 'New Service Available',
      description: 'COVID-19 vaccination center opened',
      status: 'completed' as const,
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    },
  ]

  // Mock upcoming events
  const upcomingEvents = [
    {
      id: '1',
      title: 'Barangay Assembly',
      date: addDays(new Date(), 3),
      time: '2:00 PM',
      location: 'Barangay Hall',
      attendees: 150,
      category: 'meeting' as const,
    },
    {
      id: '2',
      title: 'Community Health Drive',
      date: addDays(new Date(), 7),
      time: '9:00 AM',
      location: 'Freedom Park',
      attendees: 200,
      category: 'event' as const,
    },
    {
      id: '3',
      title: 'Digital Literacy Workshop',
      date: addDays(new Date(), 10),
      time: '10:00 AM',
      location: 'Barangay Center',
      attendees: 50,
      category: 'workshop' as const,
    },
  ]

  const quickLinks = [
    {
      title: 'Submit Complaint',
      description: 'Report issues or complaints',
      icon: AlertCircle,
      href: '/dashboard/complaints',
      color: 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400',
    },
    {
      title: 'Document Requests',
      description: 'Request barangay documents',
      icon: FileText,
      href: '/dashboard/documents',
      color: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
    },
    {
      title: 'Announcements',
      description: 'Latest barangay updates',
      icon: Bell,
      href: '/dashboard/announcements',
      color:
        'bg-yellow-50 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400',
    },
    {
      title: 'Services',
      description: 'Available community services',
      icon: Wrench,
      href: '/dashboard/services',
      color:
        'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400',
    },
  ]

  return (
    <div className="flex flex-col bg-slate-50 dark:bg-slate-900">
      <PageHeader
        title={`Welcome back, ${user?.firstName}!`}
        description="Here's what's happening in your barangay today"
        icon={<Home className="h-6 w-6" />}
      />

      {/* Main Content */}
      <div className="flex-1 px-6 py-8 sm:px-8">
        <div className="mx-auto w-full max-w-7xl space-y-8">
          {/* Statistics Overview */}
          <div>
            <h2 className="mb-6 text-lg font-semibold text-slate-900 dark:text-slate-50">
              Your Activity
            </h2>
            <DashboardStats stats={stats} />
          </div>

          {/* Quick Actions */}
          <div>
            <h2 className="mb-6 text-lg font-semibold text-slate-900 dark:text-slate-50">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {quickLinks.map((link) => {
                const Icon = link.icon
                return (
                  <Link key={link.href} to={link.href}>
                    <div className="group h-full rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:border-slate-300 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800">
                      <div className={`inline-flex rounded-lg ${link.color} p-3`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="mt-4 font-semibold text-slate-900 group-hover:text-blue-600 dark:text-slate-50 dark:group-hover:text-blue-400">
                        {link.title}
                      </h3>
                      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                        {link.description}
                      </p>
                      <div className="mt-4 flex items-center text-sm font-medium text-blue-600 opacity-0 transition-opacity group-hover:opacity-100 dark:text-blue-400">
                        Get Started →
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Recent Activity and Upcoming Events */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <RecentActivity activities={recentActivities} />
            <UpcomingEvents events={upcomingEvents} />
          </div>
        </div>
      </div>
    </div>
  )
}

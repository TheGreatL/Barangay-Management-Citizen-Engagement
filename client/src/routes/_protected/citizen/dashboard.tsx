import { createFileRoute, Link } from '@tanstack/react-router'
import { useAuthStore } from '@/shared/stores/auth.store'
import { LoadingDashboard } from '@/features/dashboard/components/loading-dashboard'
import { PageHeader } from '@/shared/components/layout/page-header'
import { DashboardStats } from '@/features/dashboard/components/dashboard-stats'
import { RecentActivity } from '@/features/dashboard/components/recent-activity'
import { UpcomingEvents } from '@/features/dashboard/components/upcoming-events'
import { AlertCircle, FileText, Bell, Wrench, Home } from 'lucide-react'
import { Card, CardContent } from '@/shared/components/ui/card'
import { addDays } from 'date-fns'

export const Route = createFileRoute('/_protected/citizen/dashboard')({
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
      href: '/citizen/complaints',
    },
    {
      title: 'Document Requests',
      description: 'Request barangay documents',
      icon: FileText,
      href: '/citizen/documents',
    },
    {
      title: 'Announcements',
      description: 'Latest barangay updates',
      icon: Bell,
      href: '/citizen/announcements',
    },
    {
      title: 'Services',
      description: 'Available community services',
      icon: Wrench,
      href: '/citizen/services',
    },
  ]

  return (
    <div className="flex flex-col min-h-full">
      <PageHeader
        title={`Welcome back, ${user?.firstName}`}
        description="Here's what's happening in your barangay today"
        icon={<Home className="h-5 w-5" />}
      />

      {/* Main Content */}
      <div className="flex-1 px-4 py-6 lg:px-8 lg:py-8">
        <div className="mx-auto w-full max-w-7xl space-y-8">
          {/* Statistics Overview */}
          <section>
            <h2 className="text-sm font-semibold text-foreground mb-4">
              Your Activity
            </h2>
            <DashboardStats stats={stats} />
          </section>

          {/* Quick Actions */}
          <section>
            <h2 className="text-sm font-semibold text-foreground mb-4">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {quickLinks.map((link) => {
                const Icon = link.icon
                return (
                  <Link key={link.href} to={link.href}>
                    <Card className="group h-full border-border/60 bg-card transition-all duration-200 hover:border-border hover:shadow-sm">
                      <CardContent className="p-5">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-foreground/5 group-hover:bg-foreground group-hover:text-background transition-all duration-200">
                          <Icon className="h-4 w-4" />
                        </div>
                        <h3 className="mt-4 text-sm font-medium text-foreground">
                          {link.title}
                        </h3>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {link.description}
                        </p>
                        <div className="mt-3 flex items-center text-xs font-medium text-foreground opacity-0 transition-all duration-200 group-hover:opacity-100">
                          Get Started
                          <span className="ml-1 transition-transform group-hover:translate-x-0.5">→</span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>
          </section>

          {/* Recent Activity and Upcoming Events */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <RecentActivity activities={recentActivities} />
            <UpcomingEvents events={upcomingEvents} />
          </div>
        </div>
      </div>
    </div>
  )
}

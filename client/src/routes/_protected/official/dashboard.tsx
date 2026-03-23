import { createFileRoute, Link } from '@tanstack/react-router'
import { useAuthStore } from '@/shared/stores/auth.store'
import { Button } from '@/shared/components/ui/button'
import {
  AlertCircle,
  Users,
  FileText,
  BarChart3,
  ArrowRight,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Plus,
} from 'lucide-react'
import { Badge } from '@/shared/components/ui/badge'
import { Card } from '@/shared/components/ui/card'
import { cn } from '@/shared/lib/utils'

export const Route = createFileRoute('/_protected/official/dashboard')({
  component: OfficialDashboardComponent,
})

function OfficialDashboardComponent() {
  const logout = useAuthStore((state) => state.logout)

  const stats = [
    {
      label: 'Pending Docs',
      value: '12',
      icon: FileText,
      color: 'text-amber-600 bg-amber-50',
    },
    {
      label: 'Active Reports',
      value: '8',
      icon: AlertCircle,
      color: 'text-red-600 bg-red-50',
    },
    {
      label: 'Total Verified',
      value: '1,248',
      icon: ShieldCheck,
      color: 'text-green-600 bg-green-50',
    },
    {
      label: 'Monthly Traffic',
      value: '4.2k',
      icon: BarChart3,
      color: 'text-blue-600 bg-blue-50',
    },
  ]

  const recentTasks = [
    {
      id: 1,
      title: 'Barangay Clearance Request',
      name: 'John Doe',
      time: '10 mins ago',
      status: 'pending',
      priority: 'medium',
    },
    {
      id: 2,
      title: 'Noise Complaint: Sector 4',
      name: 'Maria Santos',
      time: '25 mins ago',
      status: 'investigating',
      priority: 'high',
    },
    {
      id: 3,
      title: 'Certificate of Indigency',
      name: 'Robert Chen',
      time: '1 hour ago',
      status: 'pending',
      priority: 'low',
    },
    {
      id: 4,
      title: 'Street Light Issue',
      name: 'Anonymous',
      time: '2 hours ago',
      status: 'resolved',
      priority: 'medium',
    },
  ]

  return (
    <div className="space-y-8 py-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Official Dashboard
            </h1>
            <p className="mt-2 text-slate-600">
              Manage resident requests and community affairs
            </p>
          </div>
          <Button onClick={logout} variant="outline">
            Logout
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, idx) => {
            const Icon = stat.icon
            return (
              <div
                key={idx}
                className="bg-card rounded-xl border border-slate-200 p-6 shadow-sm"
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
                  <div className={cn('rounded-lg p-2', stat.color)}>
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Task List */}
          <div className="space-y-4 lg:col-span-2">
            <h2 className="text-xl font-bold text-slate-900">
              Performance Queue
            </h2>
            <Card className="overflow-hidden rounded-xl border-slate-200 shadow-sm">
              <div className="divide-y border-slate-100">
                {recentTasks.map((task) => (
                  <div
                    key={task.id}
                    className="group flex items-center justify-between p-4 transition-colors hover:bg-slate-50"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={cn(
                          'flex h-10 w-10 items-center justify-center rounded-lg border',
                          task.status === 'pending'
                            ? 'border-amber-100 bg-amber-50 text-amber-600'
                            : task.status === 'investigating'
                              ? 'border-blue-100 bg-blue-50 text-blue-600'
                              : 'border-green-100 bg-green-50 text-green-600',
                        )}
                      >
                        {task.status === 'pending' ? (
                          <Clock className="h-5 w-5" />
                        ) : task.status === 'investigating' ? (
                          <AlertCircle className="h-5 w-5" />
                        ) : (
                          <CheckCircle2 className="h-5 w-5" />
                        )}
                      </div>
                      <div>
                        <p className="leading-none font-semibold text-slate-900">
                          {task.title}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          By {task.name} • {task.time}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={cn(
                        'px-2 py-0.5 text-xs font-bold',
                        task.priority === 'high'
                          ? 'border-red-100 bg-red-50 text-red-600'
                          : task.priority === 'medium'
                            ? 'border-blue-100 bg-blue-50 text-blue-600'
                            : 'border-slate-100 font-medium text-slate-400',
                      )}
                    >
                      {task.priority}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar Quick Actions */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-slate-900">Portal Actions</h3>
            <div className="grid grid-cols-1 gap-3">
              <CommandLink
                icon={Users}
                label="Resident Management"
                href="/_protected/official/residents"
                color="bg-blue-50 text-blue-600"
              />
              <CommandLink
                icon={FileText}
                label="Document Pipeline"
                href="/_protected/official/documents"
                color="bg-indigo-50 text-indigo-600"
              />
              <CommandLink
                icon={AlertCircle}
                label="Complaint Resolution"
                href="/_protected/official/complaints"
                color="bg-red-50 text-red-600"
              />
              <CommandLink
                icon={BarChart3}
                label="Performance Analytics"
                href="/_protected/official/reports"
                color="bg-green-50 text-green-600"
              />
            </div>

            <Card className="group relative overflow-hidden rounded-xl border-none bg-slate-900 p-6 text-white shadow-lg">
              <div className="relative z-10 space-y-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 bg-white/10">
                  <Plus className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="mb-1 text-lg font-bold">New Announcement</h4>
                  <p className="text-xs leading-relaxed text-slate-400">
                    Broadcast news or alerts to citizens.
                  </p>
                </div>
                <Button className="h-10 w-full rounded-lg bg-white font-bold text-slate-900 shadow-sm transition-all hover:bg-slate-100 active:scale-95">
                  Start Publishing
                </Button>
              </div>
              <div className="bg-primary/20 group-hover:bg-primary/30 absolute top-0 right-0 -mt-16 -mr-16 h-32 w-32 rounded-full opacity-50 blur-2xl transition-all duration-700" />
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

function CommandLink({
  icon: Icon,
  label,
  href,
  color,
}: {
  icon: any
  label: string
  href: string
  color: string
}) {
  return (
    <Link to={href}>
      <div className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 transition-all duration-300 hover:border-slate-300 hover:shadow-sm">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-lg border border-transparent transition-all',
              color,
            )}
          >
            <Icon className="h-5 w-5" />
          </div>
          <span className="group-hover:text-primary text-sm font-semibold text-slate-900 transition-colors">
            {label}
          </span>
        </div>
        <ArrowRight className="group-hover:text-primary h-4 w-4 text-slate-300 transition-all group-hover:translate-x-1" />
      </div>
    </Link>
  )
}

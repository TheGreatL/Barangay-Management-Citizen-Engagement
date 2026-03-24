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
      color: 'text-amber-600 bg-amber-50 dark:bg-amber-900/20 dark:text-amber-400',
    },
    {
      label: 'Active Reports',
      value: '8',
      icon: AlertCircle,
      color: 'text-rose-600 bg-rose-50 dark:bg-rose-900/20 dark:text-rose-400',
    },
    {
      label: 'Total Verified',
      value: '1,248',
      icon: ShieldCheck,
      color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 dark:text-emerald-400',
    },
    {
      label: 'Monthly Traffic',
      value: '4.2k',
      icon: BarChart3,
      color: 'text-sky-600 bg-sky-50 dark:bg-sky-900/20 dark:text-sky-400',
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
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              Official Dashboard
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Manage resident requests and community affairs
            </p>
          </div>
          <Button onClick={logout} variant="outline">
            Logout
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, idx) => {
            const Icon = stat.icon
            return (
              <div
                key={idx}
                className="bg-card rounded-xl border border-border/60 p-5 transition-all hover:border-border"
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
                  <div className={cn('rounded-lg p-2', stat.color)}>
                    <Icon className="h-4 w-4" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Main Task List */}
          <div className="space-y-4 lg:col-span-2">
            <h2 className="text-sm font-semibold text-foreground">
              Performance Queue
            </h2>
            <Card className="overflow-hidden rounded-xl border-border/60">
              <div className="divide-y divide-border/50">
                {recentTasks.map((task) => (
                  <div
                    key={task.id}
                    className="group flex items-center justify-between p-4 transition-colors hover:bg-muted/50"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={cn(
                          'flex h-9 w-9 items-center justify-center rounded-lg',
                          task.status === 'pending'
                            ? 'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400'
                            : task.status === 'investigating'
                              ? 'bg-sky-50 text-sky-600 dark:bg-sky-900/20 dark:text-sky-400'
                              : 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400',
                        )}
                      >
                        {task.status === 'pending' ? (
                          <Clock className="h-4 w-4" />
                        ) : task.status === 'investigating' ? (
                          <AlertCircle className="h-4 w-4" />
                        ) : (
                          <CheckCircle2 className="h-4 w-4" />
                        )}
                      </div>
                      <div>
                        <p className="leading-none text-sm font-medium text-foreground">
                          {task.title}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          By {task.name} • {task.time}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={cn(
                        'px-2 py-0.5 text-xs font-medium',
                        task.priority === 'high'
                          ? 'bg-rose-50 text-rose-600 border-rose-200 dark:bg-rose-900/20 dark:text-rose-400 dark:border-rose-800'
                          : task.priority === 'medium'
                            ? 'bg-sky-50 text-sky-600 border-sky-200 dark:bg-sky-900/20 dark:text-sky-400 dark:border-sky-800'
                            : 'bg-muted text-muted-foreground border-border',
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
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Portal Actions</h3>
            <div className="grid grid-cols-1 gap-2">
              <CommandLink
                icon={Users}
                label="Resident Management"
                href="/_protected/official/residents"
                color="bg-sky-50 text-sky-600 dark:bg-sky-900/20 dark:text-sky-400"
              />
              <CommandLink
                icon={FileText}
                label="Document Pipeline"
                href="/_protected/official/documents"
                color="bg-violet-50 text-violet-600 dark:bg-violet-900/20 dark:text-violet-400"
              />
              <CommandLink
                icon={AlertCircle}
                label="Complaint Resolution"
                href="/_protected/official/complaints"
                color="bg-rose-50 text-rose-600 dark:bg-rose-900/20 dark:text-rose-400"
              />
              <CommandLink
                icon={BarChart3}
                label="Performance Analytics"
                href="/_protected/official/reports"
                color="bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400"
              />
            </div>

            <Card className="group relative overflow-hidden rounded-xl border-border/60 bg-foreground p-5 text-background">
              <div className="relative z-10 space-y-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-background/20 bg-background/10">
                  <Plus className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="mb-1 text-sm font-semibold">New Announcement</h4>
                  <p className="text-xs leading-relaxed text-background/60">
                    Broadcast news or alerts to citizens.
                  </p>
                </div>
                <Button className="h-9 w-full rounded-lg bg-background font-medium text-foreground transition-all hover:bg-background/90 active:scale-[0.98]">
                  Start Publishing
                </Button>
              </div>
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
      <div className="group flex items-center justify-between rounded-lg border border-border/60 bg-card p-3 transition-all duration-200 hover:border-border hover:bg-muted/50">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              'flex h-9 w-9 items-center justify-center rounded-lg transition-all',
              color,
            )}
          >
            <Icon className="h-4 w-4" />
          </div>
          <span className="text-sm font-medium text-foreground transition-colors">
            {label}
          </span>
        </div>
        <ArrowRight className="h-4 w-4 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-foreground" />
      </div>
    </Link>
  )
}

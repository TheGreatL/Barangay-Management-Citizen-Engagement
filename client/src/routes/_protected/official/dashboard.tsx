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
      color:
        'text-amber-600 bg-amber-50 dark:bg-amber-900/20 dark:text-amber-400',
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
      color:
        'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 dark:text-emerald-400',
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
            <h1 className="text-foreground text-2xl font-semibold tracking-tight">
              Official Dashboard
            </h1>
            <p className="text-muted-foreground mt-1 text-sm">
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
                className="bg-card border-border/60 hover:border-border rounded-xl border p-5 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-muted-foreground text-xs font-medium">
                      {stat.label}
                    </p>
                    <p className="text-foreground mt-2 text-2xl font-semibold">
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
            <h2 className="text-foreground text-sm font-semibold">
              Performance Queue
            </h2>
            <Card className="border-border/60 overflow-hidden rounded-xl">
              <div className="divide-border/50 divide-y">
                {recentTasks.map((task) => (
                  <div
                    key={task.id}
                    className="group hover:bg-muted/50 flex items-center justify-between p-4 transition-colors"
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
                        <p className="text-foreground text-sm leading-none font-medium">
                          {task.title}
                        </p>
                        <p className="text-muted-foreground mt-1 text-xs">
                          By {task.name} • {task.time}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={cn(
                        'px-2 py-0.5 text-xs font-medium',
                        task.priority === 'high'
                          ? 'border-rose-200 bg-rose-50 text-rose-600 dark:border-rose-800 dark:bg-rose-900/20 dark:text-rose-400'
                          : task.priority === 'medium'
                            ? 'border-sky-200 bg-sky-50 text-sky-600 dark:border-sky-800 dark:bg-sky-900/20 dark:text-sky-400'
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
            <h3 className="text-foreground text-sm font-semibold">
              Portal Actions
            </h3>
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

            <Card className="group border-border/60 bg-foreground text-background relative overflow-hidden rounded-xl p-5">
              <div className="relative z-10 space-y-4">
                <div className="border-background/20 bg-background/10 flex h-9 w-9 items-center justify-center rounded-lg border">
                  <Plus className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="mb-1 text-sm font-semibold">
                    New Announcement
                  </h4>
                  <p className="text-background/60 text-xs leading-relaxed">
                    Broadcast news or alerts to citizens.
                  </p>
                </div>
                <Button className="bg-background text-foreground hover:bg-background/90 h-9 w-full rounded-lg font-medium transition-all active:scale-[0.98]">
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
      <div className="group border-border/60 bg-card hover:border-border hover:bg-muted/50 flex items-center justify-between rounded-lg border p-3 transition-all duration-200">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              'flex h-9 w-9 items-center justify-center rounded-lg transition-all',
              color,
            )}
          >
            <Icon className="h-4 w-4" />
          </div>
          <span className="text-foreground text-sm font-medium transition-colors">
            {label}
          </span>
        </div>
        <ArrowRight className="text-muted-foreground group-hover:text-foreground h-4 w-4 transition-all group-hover:translate-x-0.5" />
      </div>
    </Link>
  )
}

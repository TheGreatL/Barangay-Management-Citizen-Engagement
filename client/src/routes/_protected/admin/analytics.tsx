import { createFileRoute } from '@tanstack/react-router'
import { BarChart, TrendingUp, Users, AlertCircle } from 'lucide-react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card'
import { Button } from '@/shared/components/ui/button'

export const Route = createFileRoute('/_protected/admin/analytics')({
  component: AdminAnalyticsComponent,
})

function AdminAnalyticsComponent() {
  const analyticsMetrics = [
    {
      title: 'Total Users',
      value: '3,248',
      change: '+245 this month',
      icon: Users,
      color: 'text-blue-600',
    },
    {
      title: 'Total Complaints',
      value: '1,248',
      change: '+128 resolved',
      icon: AlertCircle,
      color: 'text-orange-600',
    },
    {
      title: 'Avg Response Time',
      value: '2.4h',
      change: '-15% improvement',
      icon: TrendingUp,
      color: 'text-green-600',
    },
  ]

  const timeframes = ['7d', '30d', '90d', '1y']

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">System Analytics</h1>
        <p className="text-muted-foreground mt-1">
          Comprehensive system-wide analytics and performance metrics.
        </p>
      </div>

      <div className="flex gap-2">
        {timeframes.map((tf) => (
          <Button key={tf} variant="outline" size="sm" className="h-9 px-4">
            {tf}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {analyticsMetrics.map((metric, idx) => {
          const Icon = metric.icon
          return (
            <Card key={idx}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm font-medium">
                      {metric.title}
                    </p>
                    <p className="mt-2 text-3xl font-bold">{metric.value}</p>
                    <p className="mt-2 text-xs font-medium text-green-600">
                      {metric.change}
                    </p>
                  </div>
                  <div className="rounded-lg bg-slate-50 p-2">
                    <Icon className={`h-6 w-6 ${metric.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center gap-2 space-y-0">
            <BarChart className="text-muted-foreground h-5 w-5" />
            <CardTitle>User Growth Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-muted-foreground flex h-64 items-center justify-center rounded-lg border border-dashed bg-slate-50/50 text-sm font-medium">
              Chart visualization would be rendered here
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-2 space-y-0">
            <TrendingUp className="text-muted-foreground h-5 w-5" />
            <CardTitle>Service Usage Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-muted-foreground flex h-64 items-center justify-center rounded-lg border border-dashed bg-slate-50/50 text-sm font-medium">
              Chart visualization would be rendered here
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center gap-2 space-y-0">
          <BarChart className="text-muted-foreground h-5 w-5" />
          <CardTitle>Complaints Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-muted-foreground flex h-80 items-center justify-center rounded-lg border border-dashed bg-slate-50/50 text-sm font-medium">
            Chart visualization would be rendered here
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

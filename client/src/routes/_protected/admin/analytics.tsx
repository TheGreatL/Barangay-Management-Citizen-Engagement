import { createFileRoute } from '@tanstack/react-router'
import { BarChart, TrendingUp, Users, AlertCircle } from 'lucide-react'

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
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          System Analytics
        </h1>
        <p className="mt-2 text-slate-600">
          Comprehensive system-wide analytics and performance metrics
        </p>
      </div>

      <div className="flex gap-2">
        {timeframes.map((tf) => (
          <button
            key={tf}
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            {tf}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {analyticsMetrics.map((metric, idx) => {
          const Icon = metric.icon
          return (
            <div
              key={idx}
              className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    {metric.title}
                  </p>
                  <p className="mt-2 text-3xl font-bold text-slate-900">
                    {metric.value}
                  </p>
                  <p className="mt-2 text-xs text-green-600">{metric.change}</p>
                </div>
                <Icon className={`h-8 w-8 ${metric.color}`} />
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <BarChart className="h-5 w-5 text-slate-600" />
            <h2 className="text-lg font-semibold text-slate-900">
              User Growth Trend
            </h2>
          </div>
          <div className="h-64 bg-slate-50 rounded-lg flex items-center justify-center text-slate-500">
            Chart visualization would be rendered here
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-slate-600" />
            <h2 className="text-lg font-semibold text-slate-900">
              Service Usage Distribution
            </h2>
          </div>
          <div className="h-64 bg-slate-50 rounded-lg flex items-center justify-center text-slate-500">
            Chart visualization would be rendered here
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <BarChart className="h-5 w-5 text-slate-600" />
          <h2 className="text-lg font-semibold text-slate-900">
            Complaints Timeline
          </h2>
        </div>
        <div className="h-80 bg-slate-50 rounded-lg flex items-center justify-center text-slate-500">
          Chart visualization would be rendered here
        </div>
      </div>
    </div>
  )
}

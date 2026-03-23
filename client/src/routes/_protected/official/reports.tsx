import { createFileRoute } from '@tanstack/react-router'
import { BarChart, Users, FileText, AlertCircle, TrendingUp } from 'lucide-react'

export const Route = createFileRoute('/_protected/official/reports')({
  component: ReportsComponent,
})

function ReportsComponent() {
  const stats = [
    {
      title: 'Total Complaints',
      value: '248',
      change: '+12%',
      icon: AlertCircle,
    },
    {
      title: 'Resolved Issues',
      value: '198',
      change: '+8%',
      icon: FileText,
    },
    {
      title: 'Active Residents',
      value: '1,248',
      change: '+24%',
      icon: Users,
    },
    {
      title: 'Growth Rate',
      value: '+5.2%',
      change: 'This month',
      icon: TrendingUp,
    },
  ]

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Reports & Analytics
        </h1>
        <p className="mt-2 text-slate-600">
          View comprehensive analytics and reports for your barangay
        </p>
      </div>

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
                  <p className="text-sm font-medium text-slate-500">{stat.title}</p>
                  <p className="mt-2 text-2xl font-bold text-slate-900">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-xs text-green-600">{stat.change}</p>
                </div>
                <Icon className="h-6 w-6 text-slate-400" />
              </div>
            </div>
          )
        })}
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <BarChart className="h-5 w-5 text-slate-600" />
          <h2 className="text-lg font-semibold text-slate-900">
            Monthly Complaint Trends
          </h2>
        </div>
        <div className="h-64 bg-slate-50 rounded-lg flex items-center justify-center text-slate-500">
          Chart visualization would be rendered here
        </div>
      </div>
    </div>
  )
}

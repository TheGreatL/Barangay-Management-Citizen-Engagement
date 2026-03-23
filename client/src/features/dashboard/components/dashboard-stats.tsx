import { TrendingUp, TrendingDown } from 'lucide-react'

interface StatItem {
  label: string
  value: string | number
  change?: number
  trend?: 'up' | 'down'
  color: string
}

interface DashboardStatsProps {
  stats: StatItem[]
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                {stat.label}
              </p>
              <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-50">
                {stat.value}
              </p>
            </div>
            {stat.trend && (
              <div
                className={`rounded-lg p-2 ${
                  stat.trend === 'up'
                    ? 'bg-green-50 text-green-600 dark:bg-green-900/20'
                    : 'bg-red-50 text-red-600 dark:bg-red-900/20'
                }`}
              >
                {stat.trend === 'up' ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
              </div>
            )}
          </div>
          {stat.change !== undefined && (
            <p
              className={`mt-3 text-sm font-medium ${
                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {stat.trend === 'up' ? '+' : '-'}
              {Math.abs(stat.change)}% from last month
            </p>
          )}
        </div>
      ))}
    </div>
  )
}

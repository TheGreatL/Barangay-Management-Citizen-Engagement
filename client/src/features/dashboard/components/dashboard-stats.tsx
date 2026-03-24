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
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="group relative rounded-xl border border-border/60 bg-card p-5 transition-all duration-200 hover:border-border hover:shadow-sm"
        >
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <p className="text-[11px] uppercase tracking-wider font-medium text-muted-foreground/70">
                {stat.label}
              </p>
              <p className="text-2xl font-semibold tracking-tight text-foreground">
                {stat.value}
              </p>
            </div>
            {stat.trend && (
              <div
                className={`rounded-lg p-1.5 ${
                  stat.trend === 'up'
                    ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400'
                    : 'bg-rose-50 text-rose-600 dark:bg-rose-900/20 dark:text-rose-400'
                }`}
              >
                {stat.trend === 'up' ? (
                  <TrendingUp className="h-3.5 w-3.5" />
                ) : (
                  <TrendingDown className="h-3.5 w-3.5" />
                )}
              </div>
            )}
          </div>
          {stat.change !== undefined && (
            <p
              className={`mt-3 text-xs font-medium ${
                stat.trend === 'up' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
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

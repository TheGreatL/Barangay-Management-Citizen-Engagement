import { format } from 'date-fns'
import {
  AlertCircle,
  Clock,
  FileText,
  MessageSquare,
} from 'lucide-react'

export interface ActivityItem {
  id: string
  type: 'complaint' | 'document' | 'announcement' | 'message'
  title: string
  description: string
  status: 'pending' | 'completed' | 'in-progress'
  timestamp: Date
}

interface RecentActivityProps {
  activities: ActivityItem[]
}

const statusColors = {
  pending:
    'bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400',
  completed:
    'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400',
  'in-progress':
    'bg-sky-50 text-sky-700 dark:bg-sky-900/20 dark:text-sky-400',
}

const typeIcons = {
  complaint: AlertCircle,
  document: FileText,
  announcement: MessageSquare,
  message: Clock,
}

export function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <div className="rounded-xl border border-border/60 bg-card p-5">
      <h3 className="text-sm font-semibold text-foreground mb-4">
        Recent Activity
      </h3>

      <div className="space-y-2">
        {activities.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground py-8">
            No recent activity
          </p>
        ) : (
          activities.map((activity) => {
            const Icon = typeIcons[activity.type]
            return (
              <div
                key={activity.id}
                className="group flex gap-3 rounded-lg border border-border/40 bg-muted/30 p-3 transition-all duration-150 hover:border-border/60 hover:bg-muted/50"
              >
                <div
                  className={`mt-0.5 rounded-md p-1.5 ${
                    activity.type === 'complaint'
                      ? 'bg-rose-50 text-rose-600 dark:bg-rose-900/20 dark:text-rose-400'
                      : activity.type === 'document'
                        ? 'bg-sky-50 text-sky-600 dark:bg-sky-900/20 dark:text-sky-400'
                        : 'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {activity.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                        {activity.description}
                      </p>
                    </div>
                    <span
                      className={`shrink-0 rounded-md px-2 py-0.5 text-[10px] font-medium ${
                        statusColors[activity.status]
                      }`}
                    >
                      {activity.status.charAt(0).toUpperCase() +
                        activity.status.slice(1).replace('-', ' ')}
                    </span>
                  </div>
                  <p className="mt-1.5 text-[10px] text-muted-foreground/70">
                    {format(activity.timestamp, 'MMM dd, yyyy hh:mm a')}
                  </p>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

import { format } from 'date-fns'
import {
  AlertCircle,
  CheckCircle,
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
    'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400',
  completed:
    'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400',
  'in-progress':
    'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400',
}

const typeIcons = {
  complaint: AlertCircle,
  document: FileText,
  announcement: MessageSquare,
  message: Clock,
}

export function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <h3 className="mb-6 text-lg font-semibold text-slate-900 dark:text-slate-50">
        Recent Activity
      </h3>

      <div className="space-y-4">
        {activities.length === 0 ? (
          <p className="text-center text-slate-500 dark:text-slate-400">
            No recent activity
          </p>
        ) : (
          activities.map((activity) => {
            const Icon = typeIcons[activity.type]
            return (
              <div
                key={activity.id}
                className="flex gap-4 rounded-lg border border-slate-100 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-700/50"
              >
                <div
                  className={`mt-1 rounded-lg p-2 ${
                    activity.type === 'complaint'
                      ? 'bg-red-100 text-red-600 dark:bg-red-900/20'
                      : activity.type === 'document'
                        ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/20'
                        : 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-slate-900 dark:text-slate-50">
                        {activity.title}
                      </p>
                      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                        {activity.description}
                      </p>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium whitespace-nowrap ${
                        statusColors[activity.status]
                      }`}
                    >
                      {activity.status.charAt(0).toUpperCase() +
                        activity.status.slice(1)}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-slate-500 dark:text-slate-500">
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

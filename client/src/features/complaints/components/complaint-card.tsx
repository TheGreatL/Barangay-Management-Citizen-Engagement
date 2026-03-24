import { MapPin, Calendar, Tag } from 'lucide-react'
import { Badge } from '@/shared/components/ui/badge'
import { cn } from '@/shared/lib/utils'
import type { TComplaint } from '../complaint-schema'
import { ComplaintStatusBadge } from './complaint-status-badge'
import { ComplaintPriorityBadge } from './complaint-priority-badge'

interface TComplaintCardProps {
  complaint: TComplaint
  className?: string
  footer?: React.ReactNode
}

export function ComplaintCard({
  complaint,
  className,
  footer,
}: TComplaintCardProps) {
  return (
    <div
      className={cn(
        'rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition-all hover:border-slate-200 hover:shadow-md',
        className,
      )}
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="mb-2 flex items-center gap-2">
            <h3 className="truncate text-lg leading-tight font-bold text-slate-900">
              {complaint.title}
            </h3>
            <span className="rounded-lg border border-slate-100 bg-slate-50 px-2 py-0.5 text-[10px] font-bold text-slate-400">
              ID: {complaint.id.slice(0, 8)}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge
              variant="secondary"
              className="h-5 border-slate-100 bg-slate-50 text-[10px] font-bold text-slate-500"
            >
              <Tag className="mr-1 h-3 w-3" />
              {complaint.category}
            </Badge>
            <ComplaintStatusBadge status={complaint.status} />
            <ComplaintPriorityBadge priority={complaint.priority} />
          </div>
        </div>
      </div>

      <p className="mb-6 line-clamp-2 text-sm leading-relaxed font-medium text-slate-600">
        {complaint.description}
      </p>

      <div className="flex flex-wrap items-center gap-6 text-[10px] font-bold text-slate-400">
        <div className="flex items-center gap-2">
          <MapPin className="text-primary/60 h-4 w-4" />
          {complaint.location}
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="text-primary/60 h-4 w-4" />
          {new Date(complaint.createdAt).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </div>
        {complaint.complainantName && (
          <div className="text-primary ml-auto font-bold">
            Reported by: {complaint.complainantName}
          </div>
        )}
      </div>

      {footer && (
        <div className="mt-6 border-t border-slate-50 pt-6">{footer}</div>
      )}
    </div>
  )
}

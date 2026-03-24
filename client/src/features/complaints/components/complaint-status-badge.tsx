import { Badge } from '@/shared/components/ui/badge'
import { cn } from '@/shared/lib/utils'
import type { TComplaintStatus } from '../complaint-schema'

interface TComplaintStatusBadgeProps {
  status: TComplaintStatus
  className?: string
}

export function ComplaintStatusBadge({
  status,
  className,
}: TComplaintStatusBadgeProps) {
  const variantMap: Record<
    TComplaintStatus,
    { label: string; className: string }
  > = {
    pending: {
      label: 'Pending',
      className: 'bg-amber-50 text-amber-600 border-amber-100',
    },
    investigating: {
      label: 'Active',
      className: 'bg-blue-50 text-blue-600 border-blue-100',
    },
    resolved: {
      label: 'Resolved',
      className: 'bg-green-50 text-green-600 border-green-100',
    },
    closed: {
      label: 'Closed',
      className: 'bg-slate-50 text-slate-600 border-slate-100',
    },
    rejected: {
      label: 'Rejected',
      className: 'bg-red-50 text-red-600 border-red-100',
    },
  }

  return (
    <Badge
      variant="outline"
      className={cn(
        'h-5 border px-2 text-[10px] font-bold shadow-sm',
        variantMap[status].className,
        className,
      )}
    >
      {variantMap[status].label}
    </Badge>
  )
}

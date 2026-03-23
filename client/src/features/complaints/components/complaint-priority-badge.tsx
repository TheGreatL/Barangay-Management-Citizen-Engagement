import { AlertTriangle } from 'lucide-react'
import { Badge } from '@/shared/components/ui/badge'
import { cn } from '@/shared/lib/utils'
import type { TComplaintPriority } from '../complaint-schema'

interface TComplaintPriorityBadgeProps {
  priority: TComplaintPriority
  className?: string
}

export function ComplaintPriorityBadge({ priority, className }: TComplaintPriorityBadgeProps) {
  const config = {
    low: 'bg-slate-50 text-slate-600 border-slate-200',
    medium: 'bg-blue-50 text-blue-600 border-blue-200',
    high: 'bg-orange-50 text-orange-600 border-orange-200',
    urgent: 'bg-red-50 text-red-600 border-red-200 animate-pulse',
  }

  return (
    <Badge 
      variant="outline" 
      className={cn('flex items-center gap-1.5 px-2 py-0.5 font-black text-[10px] h-5', config[priority], className)}
    >
      <AlertTriangle className="h-3 w-3" />
      {priority}
    </Badge>
  )
}

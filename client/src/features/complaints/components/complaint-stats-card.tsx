import { cn } from '@/shared/lib/utils'

interface TComplaintStatsCardProps {
  label: string
  value: string | number
  icon: React.ElementType
  color: string
  className?: string
}

export function ComplaintStatsCard({
  label,
  value,
  icon: Icon,
  color,
  className,
}: TComplaintStatsCardProps) {
  return (
    <div
      className={cn(
        'flex h-full flex-col justify-between rounded-4xl border border-slate-100 bg-white p-6 shadow-sm transition-all hover:shadow-md',
        className,
      )}
    >
      <div
        className={cn(
          'flex items-center justify-center rounded-2xl p-4',
          color,
        )}
      >
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <p className="mb-1.5 text-[10px] leading-none font-bold text-slate-400">
          {label}
        </p>
        <p className="text-2xl leading-none font-bold text-slate-900">
          {value}
        </p>
      </div>
    </div>
  )
}

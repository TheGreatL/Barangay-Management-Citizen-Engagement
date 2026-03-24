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
        'flex h-full flex-col justify-between rounded-xl border border-border/60 bg-card p-5 transition-all hover:border-border',
        className,
      )}
    >
      <div
        className={cn(
          'flex h-10 w-10 items-center justify-center rounded-lg',
          color,
        )}
      >
        <Icon className="h-5 w-5" />
      </div>
      <div className="mt-4">
        <p className="mb-1 text-xs font-medium text-muted-foreground">
          {label}
        </p>
        <p className="text-2xl font-semibold text-foreground">
          {value}
        </p>
      </div>
    </div>
  )
}

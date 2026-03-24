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
        'border-border/60 bg-card hover:border-border flex h-full flex-col justify-between rounded-xl border p-5 transition-all',
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
        <p className="text-muted-foreground mb-1 text-xs font-medium">
          {label}
        </p>
        <p className="text-foreground text-2xl font-semibold">{value}</p>
      </div>
    </div>
  )
}

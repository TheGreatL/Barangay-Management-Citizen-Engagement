import { cn } from '@/shared/lib/utils'

interface TComplaintStatsCardProps {
  label: string
  value: string | number
  icon: React.ElementType
  color: string
  className?: string
}

export function ComplaintStatsCard({ label, value, icon: Icon, color, className }: TComplaintStatsCardProps) {
  return (
    <div className={cn("flex flex-col justify-between p-6 rounded-4xl border border-slate-100 bg-white shadow-sm transition-all hover:shadow-md h-full", className)}>
      <div className={cn("p-4 rounded-2xl flex items-center justify-center", color)}>
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <p className="text-[10px] font-black text-slate-400 leading-none mb-1.5">{label}</p>
        <p className="text-2xl font-black text-slate-900 leading-none">{value}</p>
      </div>
    </div>
  )
}

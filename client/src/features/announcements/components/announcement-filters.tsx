import { Button } from '@/shared/components/ui/button'

interface TAnnouncementFiltersProps {
  currentStatus: string
  onStatusChange: (status: string) => void
}

export function AnnouncementFilters({
  currentStatus,
  onStatusChange,
}: TAnnouncementFiltersProps) {
  const statuses = ['all', 'draft', 'published', 'archived']

  return (
    <div className="flex flex-wrap gap-2">
      {statuses.map((status) => (
        <Button
          key={status}
          onClick={() => onStatusChange(status)}
          variant={currentStatus === status ? 'default' : 'outline'}
          size="sm"
          className="rounded-xl px-4 font-bold"
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Button>
      ))}
    </div>
  )
}

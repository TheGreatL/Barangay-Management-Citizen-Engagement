import { Calendar, Tag } from 'lucide-react'
import { Badge } from '@/shared/components/ui/badge'
import { cn } from '@/shared/lib/utils'
import type { TAnnouncement } from '../announcement-schema'

interface TAnnouncementCardProps {
  announcement: TAnnouncement
  className?: string
  footer?: React.ReactNode
}

export function AnnouncementCard({
  announcement,
  className,
  footer,
}: TAnnouncementCardProps) {
  const statusColors: Record<string, string> = {
    draft: 'bg-gray-100 text-gray-800 border-gray-200',
    published: 'bg-green-100 text-green-800 border-green-200',
    archived: 'bg-gray-100 text-gray-800 border-gray-200',
  }

  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md',
        className,
      )}
    >
      {announcement.imageUrl && (
        <img
          src={announcement.imageUrl}
          alt={announcement.title}
          className="h-48 w-full border-b border-slate-100 object-cover"
        />
      )}
      <div className="p-5">
        <div className="mb-3 flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg leading-tight font-bold text-slate-900">
              {announcement.title}
            </h3>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              {announcement.category && (
                <Badge
                  variant="secondary"
                  className="h-5 border-blue-100 bg-blue-50 text-[10px] font-bold text-blue-700"
                >
                  <Tag className="mr-1 h-3 w-3" />
                  {announcement.category}
                </Badge>
              )}
              <Badge
                variant="outline"
                className={cn(
                  'h-5 text-[10px] font-bold',
                  statusColors[announcement.status],
                )}
              >
                {announcement.status}
              </Badge>
            </div>
          </div>
        </div>

        <p className="line-clamp-3 text-sm leading-relaxed text-slate-600">
          {announcement.content}
        </p>

        <div className="mt-5 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
            <Calendar className="h-3.5 w-3.5" />
            {new Date(
              announcement.publishedAt || announcement.createdAt,
            ).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </div>
        </div>

        {footer && (
          <div className="mt-4 border-t border-slate-100 pt-4">{footer}</div>
        )}
      </div>
    </div>
  )
}

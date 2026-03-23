import { useQuery } from '@tanstack/react-query'
import { Edit2, Trash2, AlertCircle } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { announcementService } from '../announcement-service'
import { AnnouncementCard } from './announcement-card'
import type { TAnnouncement } from '../announcement-schema'

interface TAdminAnnouncementListProps {
  status: string
}

export function AdminAnnouncementList({ status }: TAdminAnnouncementListProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['admin-announcements', status],
    queryFn: () => announcementService.listAdmin(status),
  })

  const announcements = data?.data || []

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 rounded-3xl border border-slate-200 bg-slate-50/50 p-12">
        <div className="border-primary h-10 w-10 animate-spin rounded-full border-b-2" />
        <p className="text-sm font-bold text-slate-500">
          Loading management console...
        </p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-[40px] border border-red-100/50 bg-red-50/50 p-10">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-red-100 text-red-600">
            <AlertCircle className="h-8 w-8" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-red-900">
              Failed to load announcements
            </h3>
            <p className="mt-2 font-medium text-red-700">
              Please try refreshing the page or contact support.
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (announcements.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-[40px] border border-dashed border-slate-300 p-20 text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
          <AlertCircle className="h-10 w-10 text-slate-400" />
        </div>
        <p className="text-xl font-bold text-slate-900">
          No announcements found
        </p>
        <p className="mt-2 font-medium text-slate-500">
          Try adjusting your filters or create a new announcement.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {announcements.map((announcement: TAnnouncement) => (
        <AnnouncementCard
          key={announcement.id}
          announcement={announcement}
          footer={
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                className="flex-1 rounded-lg font-bold"
              >
                <Edit2 className="mr-2 h-4 w-4" />
                Edit
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="flex-1 rounded-lg font-bold text-red-600 hover:bg-red-50 hover:text-red-700"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </div>
          }
        />
      ))}
    </div>
  )
}

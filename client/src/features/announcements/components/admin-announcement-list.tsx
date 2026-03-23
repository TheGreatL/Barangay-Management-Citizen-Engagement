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
      <div className="p-12 border border-slate-200 rounded-3xl bg-slate-50/50 flex flex-col items-center justify-center space-y-4">
        <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-primary" />
        <p className="text-sm font-bold text-slate-500">Loading management console...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-[40px] bg-red-50/50 p-10 border border-red-100/50">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="h-16 w-16 rounded-3xl bg-red-100 flex items-center justify-center text-red-600">
            <AlertCircle className="h-8 w-8" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-red-900">Failed to load announcements</h3>
            <p className="mt-2 text-red-700 font-medium">Please try refreshing the page or contact support.</p>
          </div>
        </div>
      </div>
    )
  }

  if (announcements.length === 0) {
    return (
      <div className="rounded-[40px] border border-dashed border-slate-300 p-20 text-center flex flex-col items-center justify-center">
        <div className="h-20 w-20 rounded-full bg-slate-100 flex items-center justify-center mb-6">
          <AlertCircle className="h-10 w-10 text-slate-400" />
        </div>
        <p className="text-xl font-bold text-slate-900">No announcements found</p>
        <p className="mt-2 text-slate-500 font-medium">Try adjusting your filters or create a new announcement.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {announcements.map((announcement: TAnnouncement) => (
        <AnnouncementCard
          key={announcement.id}
          announcement={announcement}
          footer={
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="flex-1 rounded-lg font-bold">
                <Edit2 className="mr-2 h-4 w-4" />
                Edit
              </Button>
              <Button size="sm" variant="outline" className="flex-1 rounded-lg font-bold text-red-600 hover:text-red-700 hover:bg-red-50">
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

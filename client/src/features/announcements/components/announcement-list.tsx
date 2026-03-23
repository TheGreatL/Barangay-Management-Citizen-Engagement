import { useQuery } from '@tanstack/react-query'
import { announcementService } from '../announcement-service'
import { useState } from 'react'
import { AlertCircle } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import type { TAnnouncement } from '../announcement-schema'
import { AnnouncementCard } from './announcement-card'

export function AnnouncementList() {
  const [page, setPage] = useState(1)
  const { data, isLoading, error } = useQuery({
    queryKey: ['announcements', page],
    queryFn: () => announcementService.list(page, 10),
  })

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 rounded-3xl border border-slate-200 bg-slate-50/50 p-12">
        <div className="border-primary h-10 w-10 animate-spin rounded-full border-b-2" />
        <p className="text-sm font-bold text-slate-500">
          Loading announcements...
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
            <h3 className="text-xl leading-tight font-bold text-red-900">
              Failed to load announcements
            </h3>
            <p className="mt-2 font-medium text-red-700">
              Our systems are currently experiencing issues. Please try again
              later.
            </p>
          </div>
        </div>
      </div>
    )
  }

  const announcements = data?.data || []
  const totalPages = data?.totalPages || 1

  return (
    <div className="space-y-8">
      {announcements.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-[40px] border border-dashed border-slate-300 p-20 text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
            <AlertCircle className="h-10 w-10 text-slate-400" />
          </div>
          <p className="text-xl font-bold text-slate-900">
            No announcements yet
          </p>
          <p className="mt-2 font-medium text-slate-500">
            Check back soon for latest news and updates from your barangay.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {announcements.map((announcement: TAnnouncement) => (
            <AnnouncementCard
              key={announcement.id}
              announcement={announcement}
            />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-between">
          <Button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            variant="outline"
          >
            Previous
          </Button>
          <span className="text-sm text-gray-600">
            Page {page} of {totalPages}
          </span>
          <Button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            variant="outline"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  )
}

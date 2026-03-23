import { useQuery } from '@tanstack/react-query'
import { announcementService } from '../announcement.service'
import { useState } from 'react'
import { AlertCircle, Calendar, Tag } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import type { TAnnouncement } from '../announcement.schema'

export function AnnouncementList() {
  const [page, setPage] = useState(1)
  const { data, isLoading, error } = useQuery({
    queryKey: ['announcements', page],
    queryFn: () => announcementService.list(page, 10),
  })

  if (isLoading) {
    return <div className="p-6 text-center text-gray-500">Loading announcements...</div>
  }

  if (error) {
    return (
      <div className="rounded-lg bg-red-50 p-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="mt-0.5 h-5 w-5 text-red-600" />
          <div>
            <h3 className="font-medium text-red-900">Failed to load announcements</h3>
            <p className="text-sm text-red-700">Please try again later</p>
          </div>
        </div>
      </div>
    )
  }

  const announcements = data?.data || []
  const totalPages = data?.totalPages || 1

  return (
    <div className="space-y-4">
      {announcements.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-300 p-12 text-center">
          <AlertCircle className="mx-auto mb-4 h-12 w-12 text-gray-400" />
          <p className="text-gray-600">No announcements yet</p>
          <p className="text-sm text-gray-500">Check back later for updates</p>
        </div>
      ) : (
        <div className="space-y-4">
          {announcements.map((announcement: TAnnouncement) => (
            <div
              key={announcement.id}
              className="rounded-lg border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
            >
              {announcement.imageUrl && (
                <img
                  src={announcement.imageUrl}
                  alt={announcement.title}
                  className="h-48 w-full rounded-t-lg object-cover"
                />
              )}
              <div className="p-4">
                <div className="mb-2 flex items-start justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {announcement.title}
                  </h3>
                  {announcement.category && (
                    <div className="flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                      <Tag className="h-3 w-3" />
                      {announcement.category}
                    </div>
                  )}
                </div>

                <p className="text-sm text-gray-600 line-clamp-2">
                  {announcement.content}
                </p>

                <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(announcement.publishedAt || announcement.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-between">
          <Button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            variant="outline"
          >
            Previous
          </Button>
          <span className="text-sm text-gray-600">
            Page {page} of {totalPages}
          </span>
          <Button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
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

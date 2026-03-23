import { useQuery } from '@tanstack/react-query'
import { complaintService } from '../complaint.service'
import { useState } from 'react'
import { AlertCircle, MapPin, Calendar, Badge } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import type { TComplaint } from '../complaint.schema'

const statusColors = {
  draft: 'bg-gray-100 text-gray-800',
  submitted: 'bg-blue-100 text-blue-800',
  acknowledged: 'bg-yellow-100 text-yellow-800',
  in_progress: 'bg-purple-100 text-purple-800',
  resolved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
}

const priorityColors = {
  low: 'text-gray-600',
  medium: 'text-yellow-600',
  high: 'text-orange-600',
  urgent: 'text-red-600',
}

export function ComplaintList() {
  const [page, setPage] = useState(1)
  const { data, isLoading, error } = useQuery({
    queryKey: ['complaints', page],
    queryFn: () => complaintService.list(page, 10),
  })

  if (isLoading) {
    return <div className="p-6 text-center text-gray-500">Loading complaints...</div>
  }

  if (error) {
    return (
      <div className="rounded-lg bg-red-50 p-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="mt-0.5 h-5 w-5 text-red-600" />
          <div>
            <h3 className="font-medium text-red-900">Failed to load complaints</h3>
            <p className="text-sm text-red-700">Please try again later</p>
          </div>
        </div>
      </div>
    )
  }

  const complaints = data?.data || []
  const totalPages = data?.totalPages || 1

  return (
    <div className="space-y-4">
      {complaints.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-300 p-12 text-center">
          <AlertCircle className="mx-auto mb-4 h-12 w-12 text-gray-400" />
          <p className="text-gray-600">No complaints yet</p>
          <p className="text-sm text-gray-500">Submit your first complaint to get started</p>
        </div>
      ) : (
        <div className="space-y-3">
          {complaints.map((complaint: TComplaint) => (
            <div
              key={complaint.id}
              className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md"
            >
              <div className="mb-3 flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-gray-900">{complaint.title}</h3>
                  <p className="mt-1 text-sm text-gray-600">{complaint.description}</p>
                </div>
                <Badge className={statusColors[complaint.status]}>
                  {complaint.status.replace('_', ' ')}
                </Badge>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {complaint.location}
                </div>
                <div className="flex items-center gap-1">
                  <AlertCircle className={`h-4 w-4 ${priorityColors[complaint.priority]}`} />
                  <span className="capitalize">{complaint.priority} Priority</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(complaint.createdAt).toLocaleDateString()}
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

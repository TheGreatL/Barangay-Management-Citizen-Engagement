import { useQuery } from '@tanstack/react-query'
import { complaintService } from '../complaint-service'
import { useState } from 'react'
import { AlertCircle, Plus } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import type { TComplaint } from '../complaint-schema'
import { ComplaintCard } from './complaint-card'
import { Link } from '@tanstack/react-router'

export function ComplaintList() {
  const [page, setPage] = useState(1)
  const { data, isLoading, error } = useQuery({
    queryKey: ['citizen-complaints', page],
    queryFn: () => complaintService.listCitizen({ page, limit: 10 }),
  })

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 rounded-3xl border border-slate-200 bg-slate-50/50 p-12">
        <div className="border-primary h-10 w-10 animate-spin rounded-full border-b-2" />
        <p className="text-sm font-bold text-slate-500">
          Loading your complaints...
        </p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-4xl border border-red-100/50 bg-red-50/50 p-10">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-red-100 text-red-600">
            <AlertCircle className="h-8 w-8" />
          </div>
          <div>
            <h3 className="text-xl leading-tight font-bold text-red-900">
              Failed to load complaints
            </h3>
            <p className="mt-2 font-medium text-red-700">
              Please try again later or contact support.
            </p>
          </div>
        </div>
      </div>
    )
  }

  const complaints = data?.data || []
  const totalPages = data?.meta?.totalPages || 1

  return (
    <div className="space-y-8">
      {complaints.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-4xl border border-dashed border-slate-300 bg-slate-50/30 p-20 text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
            <AlertCircle className="h-10 w-10 text-slate-400" />
          </div>
          <p className="text-xl font-bold text-slate-900">No complaints yet</p>
          <p className="mt-2 mb-8 font-medium text-slate-500">
            Submit your first complaint to get started with the resolution
            process.
          </p>
          <Link to="/citizen/complaints-new">
            <Button className="shadow-primary/20 h-12 rounded-2xl px-8 leading-none font-bold shadow-xl">
              <Plus className="mr-2 h-5 w-5" />
              File a New Complaint
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {complaints.map((complaint: TComplaint) => (
            <ComplaintCard
              key={complaint.id}
              complaint={complaint}
              footer={
                <Button
                  variant="ghost"
                  className="text-primary hover:bg-primary/5 h-10 w-full rounded-xl text-[10px] font-bold"
                >
                  View Resolution Progress
                </Button>
              }
            />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 pt-4">
          <Button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            variant="outline"
            className="rounded-xl font-bold"
          >
            Previous
          </Button>
          <span className="rounded-xl bg-slate-100 px-4 py-2 text-xs font-bold text-slate-400">
            Page {page} of {totalPages}
          </span>
          <Button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            variant="outline"
            className="rounded-xl font-bold"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  )
}

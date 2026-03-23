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
      <div className="p-12 border border-slate-200 rounded-3xl bg-slate-50/50 flex flex-col items-center justify-center space-y-4">
        <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-primary" />
        <p className="text-sm font-bold text-slate-500">Loading your complaints...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-4xl bg-red-50/50 p-10 border border-red-100/50">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="h-16 w-16 rounded-3xl bg-red-100 flex items-center justify-center text-red-600">
            <AlertCircle className="h-8 w-8" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-red-900 leading-tight">Failed to load complaints</h3>
            <p className="mt-2 text-red-700 font-medium">Please try again later or contact support.</p>
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
        <div className="rounded-4xl border border-dashed border-slate-300 p-20 text-center flex flex-col items-center justify-center bg-slate-50/30">
          <div className="h-20 w-20 rounded-full bg-slate-100 flex items-center justify-center mb-6">
            <AlertCircle className="h-10 w-10 text-slate-400" />
          </div>
          <p className="text-xl font-bold text-slate-900">No complaints yet</p>
          <p className="mt-2 text-slate-500 font-medium mb-8">Submit your first complaint to get started with the resolution process.</p>
          <Link to="/citizen/complaints-new">
            <Button className="rounded-2xl h-12 px-8 font-black shadow-xl shadow-primary/20 leading-none">
              <Plus className="mr-2 h-5 w-5" />
              File a New Complaint
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {complaints.map((complaint: TComplaint) => (
            <ComplaintCard
              key={complaint.id}
              complaint={complaint}
              footer={
                <Button variant="ghost" className="w-full font-black text-primary hover:bg-primary/5 rounded-xl h-10 text-[10px]">
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
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            variant="outline"
            className="rounded-xl font-bold"
          >
            Previous
          </Button>
          <span className="text-xs font-black text-slate-400 bg-slate-100 px-4 py-2 rounded-xl">
            Page {page} of {totalPages}
          </span>
          <Button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
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

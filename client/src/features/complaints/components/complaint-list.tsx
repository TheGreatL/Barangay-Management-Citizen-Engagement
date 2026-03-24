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
      <div className="flex flex-col items-center justify-center space-y-4 rounded-xl border border-border/60 bg-muted/30 p-12">
        <div className="border-foreground h-8 w-8 animate-spin rounded-full border-b-2" />
        <p className="text-sm text-muted-foreground">
          Loading your complaints...
        </p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-xl border border-rose-200/50 bg-rose-50/50 dark:bg-rose-900/10 dark:border-rose-800/50 p-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400">
            <AlertCircle className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-rose-900 dark:text-rose-200">
              Failed to load complaints
            </h3>
            <p className="mt-1 text-sm text-rose-700 dark:text-rose-300">
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
    <div className="space-y-6">
      {complaints.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/30 p-16 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-muted">
            <AlertCircle className="h-7 w-7 text-muted-foreground" />
          </div>
          <p className="text-lg font-semibold text-foreground">No complaints yet</p>
          <p className="mt-1 mb-6 text-sm text-muted-foreground">
            Submit your first complaint to get started with the resolution
            process.
          </p>
          <Link to="/citizen/complaints-new">
            <Button className="h-10 rounded-lg px-5 font-medium">
              <Plus className="mr-2 h-4 w-4" />
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
        <div className="flex items-center justify-center gap-3 pt-4">
          <Button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            variant="outline"
            size="sm"
            className="rounded-lg"
          >
            Previous
          </Button>
          <span className="rounded-lg bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground">
            Page {page} of {totalPages}
          </span>
          <Button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            variant="outline"
            size="sm"
            className="rounded-lg"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  )
}

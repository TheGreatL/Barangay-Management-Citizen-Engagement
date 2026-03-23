import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { complaintService } from '../complaint-service'
import { useState } from 'react'
import { AlertCircle, Filter, MoreHorizontal, ShieldAlert, CheckCircle2 } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import type { TComplaint, TComplaintStatus } from '../complaint-schema'
import { ComplaintCard } from './complaint-card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'

interface TOfficialComplaintListProps {
  search?: string
}

export function OfficialComplaintList({ search }: TOfficialComplaintListProps) {
  const queryClient = useQueryClient()
  const [page, setPage] = useState(1)
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const { data, isLoading, error } = useQuery({
    queryKey: ['official-complaints', page, statusFilter, search],
    queryFn: () => complaintService.listOfficial({ 
      page, 
      limit: 10, 
      status: statusFilter === 'all' ? undefined : statusFilter as TComplaintStatus,
      search
    }),
  })

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: { status: TComplaintStatus } }) =>
      complaintService.updateStatus(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['official-complaints'] })
    },
  })

  const handleStatusUpdate = (id: string, status: TComplaintStatus) => {
    updateStatusMutation.mutate({ id, payload: { status } })
  }

  const complaints = data?.data || []
  const totalPages = data?.meta?.totalPages || 1

  if (isLoading) {
    return (
      <div className="p-12 border border-slate-200 rounded-3xl bg-slate-50/50 flex flex-col items-center justify-center space-y-4">
        <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-primary" />
        <p className="text-sm font-bold text-slate-500">Loading incident reports...</p>
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
            <h3 className="text-xl font-bold text-red-900 leading-tight">Failed to load reports</h3>
            <p className="mt-2 text-red-700 font-medium">Please refresh or contact system administrator.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="bg-slate-50/50 p-6 rounded-4xl border border-slate-100 flex flex-col gap-6">
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={() => setStatusFilter('all')}
            variant={statusFilter === 'all' ? 'default' : 'outline'}
            size="sm"
            className="rounded-xl font-bold px-4"
          >
            <Filter className="mr-2 h-4 w-4" />
            All Reports
          </Button>
          {['pending', 'investigating', 'resolved', 'closed'].map((status) => (
            <Button
              key={status}
              onClick={() => setStatusFilter(status)}
              variant={statusFilter === status ? 'default' : 'outline'}
              size="sm"
              className="rounded-xl font-bold px-4 capitalize"
            >
              {status}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {complaints.length === 0 ? (
          <div className="col-span-full rounded-4xl border border-dashed border-slate-300 p-20 text-center flex flex-col items-center justify-center">
            <div className="h-20 w-20 rounded-full bg-slate-100 flex items-center justify-center mb-6">
              <AlertCircle className="h-10 w-10 text-slate-400" />
            </div>
            <p className="text-xl font-bold text-slate-900">No reports found</p>
            <p className="mt-2 text-slate-500 font-medium">Adjust your search or filter to see more results.</p>
          </div>
        ) : (
          complaints.map((complaint: TComplaint) => (
            <ComplaintCard
              key={complaint.id}
              complaint={complaint}
              footer={
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="flex-1 rounded-xl font-bold h-10">
                    Manage Case
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-10 w-10 p-0 rounded-xl hover:bg-slate-100">
                        <MoreHorizontal className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 rounded-2xl p-2 shadow-xl border-slate-100">
                      <DropdownMenuItem
                        className="rounded-xl p-3 cursor-pointer"
                        onClick={() => handleStatusUpdate(complaint.id, 'investigating')}
                      >
                        <ShieldAlert className="mr-2 h-4 w-4 text-blue-500" />
                        <span className="font-bold text-sm">Investigate</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="rounded-xl p-3 cursor-pointer"
                        onClick={() => handleStatusUpdate(complaint.id, 'resolved')}
                      >
                        <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                        <span className="font-bold text-sm">Resolve</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              }
            />
          ))
        )}
      </div>

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

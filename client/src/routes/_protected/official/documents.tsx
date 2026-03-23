import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { AlertCircle, CheckCircle, X } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { Badge } from '@/shared/components/ui/badge'
import api from '@/shared/api/api-config'

export const Route = createFileRoute('/_protected/official/documents')({
  component: OfficialDocumentsComponent,
})

function OfficialDocumentsComponent() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['pending-documents'],
    queryFn: async () => {
      const response = await api.get('/document-requests', {
        params: { status: 'pending,processing' },
      })
      return response.data
    },
  })

  const documents = data?.data || []

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    processing: 'bg-blue-100 text-blue-800',
    ready_for_pickup: 'bg-purple-100 text-purple-800',
    completed: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Document Requests
        </h1>
        <p className="mt-2 text-slate-600">
          Process and manage document requests from residents
        </p>
      </div>

      {isLoading && <div className="text-center text-slate-500">Loading documents...</div>}

      {error && (
        <div className="rounded-lg bg-red-50 p-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="mt-0.5 h-5 w-5 text-red-600" />
            <div>
              <h3 className="font-medium text-red-900">Failed to load documents</h3>
            </div>
          </div>
        </div>
      )}

      {documents.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-300 p-12 text-center">
          <AlertCircle className="mx-auto mb-4 h-12 w-12 text-gray-400" />
          <p className="text-gray-600">No pending documents</p>
        </div>
      ) : (
        <div className="space-y-3">
          {documents.map((doc: any) => (
            <div
              key={doc.id}
              className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900">
                    {doc.documentType.replace('_', ' ').toUpperCase()}
                  </h3>
                  <p className="mt-1 text-sm text-slate-600">
                    Requested by: {doc.citizen?.firstName} {doc.citizen?.lastName}
                  </p>
                  {doc.purpose && (
                    <p className="mt-1 text-sm text-slate-600">
                      Purpose: {doc.purpose}
                    </p>
                  )}
                </div>
                <Badge className={statusColors[doc.status]}>
                  {doc.status}
                </Badge>
              </div>
              <div className="mt-4 flex gap-2">
                <Button size="sm">
                  <CheckCircle className="mr-1 h-4 w-4" />
                  Approve
                </Button>
                <Button size="sm" variant="outline">
                  <X className="mr-1 h-4 w-4" />
                  Reject
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

import { useQuery } from '@tanstack/react-query'
import { documentService } from '../document.service'
import { useState } from 'react'
import { AlertCircle, Calendar, Download } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { Badge } from '@/shared/components/ui/badge'
import type { TDocumentRequest } from '../document.schema'
import { documentTypeLabels, statusLabels } from '../document.schema'

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  processing: 'bg-blue-100 text-blue-800',
  ready_for_pickup: 'bg-purple-100 text-purple-800',
  completed: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
}

export function DocumentList() {
  const [page, setPage] = useState(1)
  const { data, isLoading, error } = useQuery({
    queryKey: ['documents', page],
    queryFn: () => documentService.list(page, 10),
  })

  const handleDownload = async (id: string) => {
    try {
      const blob = await documentService.downloadPDF(id)
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `document-${id}.pdf`
      a.click()
    } catch (error) {
      console.error('Failed to download document:', error)
    }
  }

  if (isLoading) {
    return (
      <div className="p-6 text-center text-gray-500">Loading documents...</div>
    )
  }

  if (error) {
    return (
      <div className="rounded-lg bg-red-50 p-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="mt-0.5 h-5 w-5 text-red-600" />
          <div>
            <h3 className="font-medium text-red-900">
              Failed to load documents
            </h3>
            <p className="text-sm text-red-700">Please try again later</p>
          </div>
        </div>
      </div>
    )
  }

  const documents = data?.data || []
  const totalPages = data?.totalPages || 1

  return (
    <div className="space-y-4">
      {documents.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-300 p-12 text-center">
          <AlertCircle className="mx-auto mb-4 h-12 w-12 text-gray-400" />
          <p className="text-gray-600">No document requests yet</p>
          <p className="text-sm text-gray-500">
            Request a document to get started
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {documents.map((doc: TDocumentRequest) => (
            <div
              key={doc.id}
              className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
            >
              <div className="mb-3 flex items-start justify-between">
                <div>
                  <h3 className="text-base font-semibold text-gray-900">
                    {documentTypeLabels[doc.documentType]}
                  </h3>
                  {doc.purpose && (
                    <p className="mt-1 text-sm text-gray-600">{doc.purpose}</p>
                  )}
                </div>
                <Badge className={statusColors[doc.status]}>
                  {statusLabels[doc.status]}
                </Badge>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Requested: {new Date(doc.createdAt).toLocaleDateString()}
                </div>
                {doc.pickupDate && (
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Pickup: {new Date(doc.pickupDate).toLocaleDateString()}
                  </div>
                )}
                {doc.status === 'completed' && (
                  <Button
                    onClick={() => handleDownload(doc.id)}
                    variant="outline"
                    size="sm"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
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

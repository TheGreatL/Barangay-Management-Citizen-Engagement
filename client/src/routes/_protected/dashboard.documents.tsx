import { createFileRoute, Link } from '@tanstack/react-router'
import { Plus } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { DocumentList } from '@/features/documents/components/document-list'

export const Route = createFileRoute('/_protected/dashboard/documents')({
  component: DocumentsComponent,
})

function DocumentsComponent() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Document Requests
          </h1>
          <p className="mt-2 text-slate-600">
            Request and manage your barangay documents
          </p>
        </div>
        <Link to="/dashboard/documents/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Request Document
          </Button>
        </Link>
      </div>

      <DocumentList />
    </div>
  )
}

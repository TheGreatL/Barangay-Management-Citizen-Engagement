import { createFileRoute, Link } from '@tanstack/react-router'
import { Plus, FileText } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { PageHeader } from '@/shared/components/layout/page-header'
import { DocumentList } from '@/features/documents/components/document-list'

export const Route = createFileRoute('/_protected/dashboard/documents')({
  component: DocumentsComponent,
})

function DocumentsComponent() {
  return (
    <div className="flex flex-col">
      <PageHeader
        title="Document Requests"
        description="Request and manage your barangay documents"
        icon={<FileText className="h-6 w-6" />}
        action={
          <Link to="/dashboard/documents/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Request Document
            </Button>
          </Link>
        }
      />

      <div className="flex-1 px-6 py-8 sm:px-8">
        <div className="mx-auto w-full max-w-6xl">
          <DocumentList />
        </div>
      </div>
    </div>
  )
}

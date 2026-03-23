import { createFileRoute, Link } from '@tanstack/react-router'
import { Plus, AlertCircle } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { PageHeader } from '@/shared/components/layout/page-header'
import { ComplaintList } from '@/features/complaints/components/complaint-list'

export const Route = createFileRoute('/_protected/dashboard/complaints')({
  component: ComplaintsComponent,
})

function ComplaintsComponent() {
  return (
    <div className="flex flex-col">
      <PageHeader
        title="My Complaints"
        description="View and manage your submitted complaints"
        icon={<AlertCircle className="h-6 w-6" />}
        action={
          <Link to="/dashboard/complaints/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Complaint
            </Button>
          </Link>
        }
      />

      <div className="flex-1 px-6 py-8 sm:px-8">
        <div className="mx-auto w-full max-w-6xl">
          <ComplaintList />
        </div>
      </div>
    </div>
  )
}

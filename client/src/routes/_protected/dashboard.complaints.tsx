import { createFileRoute, Link } from '@tanstack/react-router'
import { Plus } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { ComplaintList } from '@/features/complaints/components/complaint-list'

export const Route = createFileRoute('/_protected/dashboard/complaints')({
  component: ComplaintsComponent,
})

function ComplaintsComponent() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            My Complaints
          </h1>
          <p className="mt-2 text-slate-600">
            View and manage your submitted complaints
          </p>
        </div>
        <Link to="/dashboard/complaints/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Complaint
          </Button>
        </Link>
      </div>

      <ComplaintList />
    </div>
  )
}

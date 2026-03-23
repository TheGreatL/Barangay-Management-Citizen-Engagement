import { createFileRoute } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { Button } from '@/shared/components/ui/button'
import { ComplaintForm } from '@/features/complaints/components/complaint-form'

export const Route = createFileRoute('/_protected/dashboard/complaints/new')({
  component: NewComplaintComponent,
})

function NewComplaintComponent() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-2">
        <Link to="/dashboard/complaints">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Submit a Complaint
          </h1>
          <p className="mt-2 text-slate-600">
            Please provide detailed information about your complaint
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-2xl rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <ComplaintForm />
      </div>
    </div>
  )
}

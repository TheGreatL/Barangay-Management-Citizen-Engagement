import { createFileRoute } from '@tanstack/react-router'
import { OfficialComplaintList } from '@/features/complaints/components/official-complaint-list'

export const Route = createFileRoute('/_protected/official/complaints')({
  component: OfficialComplaintsComponent,
})

function OfficialComplaintsComponent() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Manage Complaints
        </h1>
        <p className="mt-2 text-slate-600">
          Review and manage all citizen complaints and reports
        </p>
      </div>

      <OfficialComplaintList />
    </div>
  )
}

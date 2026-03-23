import { createFileRoute } from '@tanstack/react-router'
import { ShieldAlert, Search } from 'lucide-react'
import { useState } from 'react'
import { OfficialComplaintList } from '@/features/complaints/components/official-complaint-list'
import { PageHeader } from '@/shared/components/layout/page-header'
import { ComplaintStatsCard } from '@/features/complaints/components/complaint-stats-card'
import { useQuery } from '@tanstack/react-query'
import { complaintService } from '@/features/complaints/complaint-service'

export const Route = createFileRoute('/_protected/official/complaints')({
  component: OfficialComplaintsComponent,
})

function OfficialComplaintsComponent() {
  const [searchTerm, setSearchTerm] = useState('')

  const { data } = useQuery({
    queryKey: ['complaint-stats'],
    queryFn: () => complaintService.listOfficial({ limit: 0 }), // Just to get stats if returned
  })

  const stats = data?.stats || { total: 0, pending: 0, resolved: 0 }

  return (
    <div className="flex flex-col">
      <PageHeader
        title="Incident & Case Management"
        description="Monitor community reports and manage resolution workflows"
        icon={<ShieldAlert className="h-6 w-6" />}
      />

      <div className="flex flex-col gap-8 py-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <ComplaintStatsCard
            label="Needs Attention"
            value="14"
            icon={ShieldAlert}
            color="text-red-600 bg-red-50"
          />
          <ComplaintStatsCard
            label="In Investigation"
            value="8"
            icon={ShieldAlert}
            color="text-blue-600 bg-blue-50"
          />
          <ComplaintStatsCard
            label="Avg Response"
            value="1.5 Hours"
            icon={ShieldAlert}
            color="text-green-600 bg-green-50"
          />
        </div>

        <div className="flex flex-col gap-8 rounded-4xl border border-slate-100 bg-slate-50/50 p-6">
          <div className="relative w-full max-w-xl">
            <Search className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Find cases by title, ID, or resident name..."
              className="focus:ring-primary/5 w-full rounded-2xl border border-slate-200 bg-white py-3 pr-4 pl-11 text-sm font-medium transition-all focus:ring-4 focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <OfficialComplaintList search={searchTerm} />
        </div>
      </div>
    </div>
  )
}

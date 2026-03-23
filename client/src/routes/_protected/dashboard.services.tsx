import { createFileRoute } from '@tanstack/react-router'
import { ServiceList } from '@/features/services/components/service-list'

export const Route = createFileRoute('/_protected/dashboard/services')({
  component: ServicesComponent,
})

function ServicesComponent() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Community Services
        </h1>
        <p className="mt-2 text-slate-600">
          Browse and access available barangay services
        </p>
      </div>

      <ServiceList />
    </div>
  )
}

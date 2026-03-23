import { createFileRoute } from '@tanstack/react-router'
import { Wrench } from 'lucide-react'
import { PageHeader } from '@/shared/components/layout/page-header'
import { ServiceList } from '@/features/services/components/service-list'

export const Route = createFileRoute('/_protected/dashboard/services')({
  component: ServicesComponent,
})

function ServicesComponent() {
  return (
    <div className="flex flex-col">
      <PageHeader
        title="Community Services"
        description="Browse and access available barangay services"
        icon={<Wrench className="h-6 w-6" />}
      />

      <div className="flex-1 px-6 py-8 sm:px-8">
        <div className="mx-auto w-full max-w-6xl">
          <ServiceList />
        </div>
      </div>
    </div>
  )
}

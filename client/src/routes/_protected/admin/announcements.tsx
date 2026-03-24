import { createFileRoute } from '@tanstack/react-router'
import { Plus, Bell } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { useState } from 'react'
import { AnnouncementFilters } from '@/features/announcements/components/announcement-filters'
import { AdminAnnouncementList } from '@/features/announcements/components/admin-announcement-list'
import { PageHeader } from '@/shared/components/layout/page-header'

export const Route = createFileRoute('/_protected/admin/announcements')({
  component: AdminAnnouncementsComponent,
})

function AdminAnnouncementsComponent() {
  const [filterStatus, setFilterStatus] = useState('all')

  return (
    <div className="flex flex-col">
      <PageHeader
        title="Manage Announcements"
        description="Create, edit, and publish important news for the community"
        icon={<Bell className="h-6 w-6" />}
        action={
          <Button className="">
            <Plus className="mr-2 h-5 w-5" />
            New Announcement
          </Button>
        }
      />

      <div className="space-y-8 py-8">
        <div className="flex flex-col gap-8">
          <div className="rounded-4xl border border-slate-100 bg-slate-50/50 p-6">
            <label className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
              Filter by Status
            </label>
            <AnnouncementFilters
              currentStatus={filterStatus}
              onStatusChange={setFilterStatus}
            />
          </div>

          <AdminAnnouncementList status={filterStatus} />
        </div>
      </div>
    </div>
  )
}

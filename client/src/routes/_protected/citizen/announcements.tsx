import { createFileRoute } from '@tanstack/react-router'
import { Bell } from 'lucide-react'
import { PageHeader } from '@/shared/components/layout/page-header'
import { AnnouncementList } from '@/features/announcements/components/announcement-list'

export const Route = createFileRoute('/_protected/citizen/announcements')({
  component: AnnouncementsComponent,
})

function AnnouncementsComponent() {
  return (
    <div className="flex flex-col">
      <PageHeader
        title="Announcements"
        description="Stay updated with the latest barangay announcements and events"
        icon={<Bell className="h-6 w-6" />}
      />

      <div className="space-y-8">
        <div className="mx-auto w-full max-w-6xl">
          <AnnouncementList />
        </div>
      </div>
    </div>
  )
}

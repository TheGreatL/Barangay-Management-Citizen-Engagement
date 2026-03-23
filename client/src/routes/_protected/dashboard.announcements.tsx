import { createFileRoute } from '@tanstack/react-router'
import { AnnouncementList } from '@/features/announcements/components/announcement-list'

export const Route = createFileRoute('/_protected/dashboard/announcements')({
  component: AnnouncementsComponent,
})

function AnnouncementsComponent() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Announcements
        </h1>
        <p className="mt-2 text-slate-600">
          Stay updated with the latest barangay announcements and events
        </p>
      </div>

      <AnnouncementList />
    </div>
  )
}

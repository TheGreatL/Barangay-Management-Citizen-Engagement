import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { MapPin } from 'lucide-react'
import { AnnouncementList } from '@/features/announcements/components/announcement-list'
import { DisasterAlerts } from '@/features/disasters/components/disaster-alerts'

export const Route = createFileRoute(
  '/_protected/dashboard/announcements-detailed'
)({
  component: AnnouncementsDetailedComponent,
})

function AnnouncementsDetailedComponent() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Announcements & Alerts
        </h1>
        <p className="mt-2 text-slate-600">
          Stay updated with important announcements and emergency alerts
        </p>
      </div>

      {/* Emergency Alerts Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-red-500" />
          <h2 className="text-lg font-semibold text-slate-900">
            Active Alerts & Disasters
          </h2>
        </div>
        <DisasterAlerts />
      </div>

      {/* Map placeholder for locations */}
      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="h-5 w-5 text-slate-600" />
          <h2 className="text-lg font-semibold text-slate-900">
            Event Locations Map
          </h2>
        </div>
        <div className="h-96 rounded-lg bg-slate-50 flex items-center justify-center text-slate-500">
          Interactive map showing event locations and disaster zones would be rendered here
        </div>
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-900">
          Latest Announcements
        </h2>
        <AnnouncementList />
      </div>
    </div>
  )
}

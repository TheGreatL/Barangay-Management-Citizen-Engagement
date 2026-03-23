import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { AlertCircle, Plus, Edit2, Trash2 } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { Badge } from '@/shared/components/ui/badge'
import { useState } from 'react'
import api from '@/shared/api/api-config'

export const Route = createFileRoute('/_protected/admin/announcements')({
  component: AdminAnnouncementsComponent,
})

function AdminAnnouncementsComponent() {
  const [filterStatus, setFilterStatus] = useState('all')

  const { data, isLoading, error } = useQuery({
    queryKey: ['admin-announcements', filterStatus],
    queryFn: async () => {
      const response = await api.get('/admin/announcements', {
        params: { status: filterStatus === 'all' ? undefined : filterStatus },
      })
      return response.data
    },
  })

  const announcements = data?.data || []

  const statusColors: Record<string, string> = {
    draft: 'bg-gray-100 text-gray-800',
    published: 'bg-green-100 text-green-800',
    archived: 'bg-gray-100 text-gray-800',
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Manage Announcements
          </h1>
          <p className="mt-2 text-slate-600">
            Create and manage system announcements
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Announcement
        </Button>
      </div>

      <div className="flex gap-2">
        {['all', 'draft', 'published', 'archived'].map((status) => (
          <Button
            key={status}
            onClick={() => setFilterStatus(status)}
            variant={filterStatus === status ? 'default' : 'outline'}
            size="sm"
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Button>
        ))}
      </div>

      {isLoading && <div className="text-center text-slate-500">Loading...</div>}

      {error && (
        <div className="rounded-lg bg-red-50 p-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="mt-0.5 h-5 w-5 text-red-600" />
            <h3 className="font-medium text-red-900">Failed to load announcements</h3>
          </div>
        </div>
      )}

      {announcements.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-300 p-12 text-center">
          <AlertCircle className="mx-auto mb-4 h-12 w-12 text-gray-400" />
          <p className="text-gray-600">No announcements</p>
        </div>
      ) : (
        <div className="space-y-3">
          {announcements.map((announcement: any) => (
            <div
              key={announcement.id}
              className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-slate-900">
                      {announcement.title}
                    </h3>
                    <Badge className={statusColors[announcement.status]}>
                      {announcement.status}
                    </Badge>
                  </div>
                  <p className="mt-1 text-sm text-slate-600">
                    {announcement.content.substring(0, 100)}...
                  </p>
                  <p className="mt-2 text-xs text-slate-500">
                    Published:{' '}
                    {new Date(announcement.publishedAt || announcement.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                <Button size="sm" variant="outline">
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline" className="text-red-600">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

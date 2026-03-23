import { format } from 'date-fns'
import { Calendar, MapPin, Users } from 'lucide-react'

export interface Event {
  id: string
  title: string
  date: Date
  time: string
  location: string
  attendees?: number
  category: 'meeting' | 'event' | 'workshop' | 'announcement'
}

interface UpcomingEventsProps {
  events: Event[]
}

const categoryColors = {
  meeting: 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400',
  event: 'bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400',
  workshop:
    'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400',
  announcement:
    'bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400',
}

export function UpcomingEvents({ events }: UpcomingEventsProps) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <h3 className="mb-6 text-lg font-semibold text-slate-900 dark:text-slate-50">
        Upcoming Events
      </h3>

      <div className="space-y-3">
        {events.length === 0 ? (
          <p className="text-center text-slate-500 dark:text-slate-400">
            No upcoming events
          </p>
        ) : (
          events.map((event) => (
            <div
              key={event.id}
              className="flex items-start gap-4 rounded-lg border border-slate-100 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-700/50"
            >
              <div className="mt-1 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/20">
                <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>

              <div className="flex-1">
                <p className="font-medium text-slate-900 dark:text-slate-50">
                  {event.title}
                </p>
                <div className="mt-2 space-y-1 text-sm text-slate-600 dark:text-slate-400">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{format(event.date, 'MMM dd, yyyy')} at {event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{event.location}</span>
                  </div>
                  {event.attendees && (
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>{event.attendees} attendees</span>
                    </div>
                  )}
                </div>
              </div>

              <span className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium ${categoryColors[event.category]}`}>
                {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

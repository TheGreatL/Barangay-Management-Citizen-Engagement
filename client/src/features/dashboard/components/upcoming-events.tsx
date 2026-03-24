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
  meeting: 'bg-sky-50 text-sky-700 dark:bg-sky-900/20 dark:text-sky-400',
  event: 'bg-violet-50 text-violet-700 dark:bg-violet-900/20 dark:text-violet-400',
  workshop: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400',
  announcement: 'bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400',
}

export function UpcomingEvents({ events }: UpcomingEventsProps) {
  return (
    <div className="rounded-xl border border-border/60 bg-card p-5">
      <h3 className="text-sm font-semibold text-foreground mb-4">
        Upcoming Events
      </h3>

      <div className="space-y-2">
        {events.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground py-8">
            No upcoming events
          </p>
        ) : (
          events.map((event) => (
            <div
              key={event.id}
              className="group flex items-start gap-3 rounded-lg border border-border/40 bg-muted/30 p-3 transition-all duration-150 hover:border-border/60 hover:bg-muted/50"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-foreground/5">
                <Calendar className="h-4 w-4 text-foreground/70" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-medium text-foreground truncate">
                    {event.title}
                  </p>
                  <span
                    className={`shrink-0 rounded-md px-2 py-0.5 text-[10px] font-medium ${categoryColors[event.category]}`}
                  >
                    {event.category.charAt(0).toUpperCase() +
                      event.category.slice(1)}
                  </span>
                </div>
                <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{format(event.date, 'MMM dd')} at {event.time}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    <span>{event.location}</span>
                  </div>
                  {event.attendees && (
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      <span>{event.attendees}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

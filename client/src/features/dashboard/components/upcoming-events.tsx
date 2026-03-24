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
  event:
    'bg-violet-50 text-violet-700 dark:bg-violet-900/20 dark:text-violet-400',
  workshop:
    'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400',
  announcement:
    'bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400',
}

export function UpcomingEvents({ events }: UpcomingEventsProps) {
  return (
    <div className="border-border/60 bg-card rounded-xl border p-5">
      <h3 className="text-foreground mb-4 text-sm font-semibold">
        Upcoming Events
      </h3>

      <div className="space-y-2">
        {events.length === 0 ? (
          <p className="text-muted-foreground py-8 text-center text-sm">
            No upcoming events
          </p>
        ) : (
          events.map((event) => (
            <div
              key={event.id}
              className="group border-border/40 bg-muted/30 hover:border-border/60 hover:bg-muted/50 flex items-start gap-3 rounded-lg border p-3 transition-all duration-150"
            >
              <div className="bg-foreground/5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                <Calendar className="text-foreground/70 h-4 w-4" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-foreground truncate text-sm font-medium">
                    {event.title}
                  </p>
                  <span
                    className={`shrink-0 rounded-md px-2 py-0.5 text-[10px] font-medium ${categoryColors[event.category]}`}
                  >
                    {event.category.charAt(0).toUpperCase() +
                      event.category.slice(1)}
                  </span>
                </div>
                <div className="text-muted-foreground mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>
                      {format(event.date, 'MMM dd')} at {event.time}
                    </span>
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

import { createFileRoute } from '@tanstack/react-router'
import {
  Map as MapIcon,
  MapPin,
  Navigation,
  Search,
  Home,
  Building2,
  Trees,
  Shield,
  Plus,
  Minus,
} from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { Badge } from '@/shared/components/ui/badge'
import * as React from 'react'
import { cn } from '@/shared/lib/utils'

export const Route = createFileRoute('/_protected/citizen/map' as any)({
  component: CitizenMapComponent,
})

function CitizenMapComponent() {
  const [activeCategory, setActiveCategory] = React.useState('all')

  const categories = [
    { id: 'all', label: 'All', icon: MapIcon },
    { id: 'health', label: 'Health', icon: Building2 },
    { id: 'safety', label: 'Safety', icon: Shield },
    { id: 'parks', label: 'Parks', icon: Trees },
    { id: 'gov', label: 'Government', icon: Home },
  ]

  return (
    <div className="flex h-[calc(100vh-64px)] flex-col overflow-hidden">
      <div className="bg-card flex items-center justify-between gap-4 border-b p-4">
        <div className="relative max-w-md flex-1">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search landmarks, facilities, or households..."
            className="focus:ring-primary/20 w-full rounded-xl border bg-slate-50 py-2 pr-4 pl-10 transition-all outline-none focus:ring-2"
          />
        </div>
        <div className="hidden items-center gap-2 md:flex">
          {categories.map((cat) => (
            <Button
              key={cat.id}
              variant={activeCategory === cat.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveCategory(cat.id)}
              className="rounded-lg font-bold"
            >
              <cat.icon className="mr-2 h-4 w-4" />
              {cat.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="relative flex flex-1 items-center justify-center overflow-hidden border-b bg-slate-100 shadow-inner">
        {/* Mock Map Background */}
        <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=14.5995,120.9842&zoom=15&size=1200x800&key=MOCK_KEY')] bg-cover opacity-40 grayscale" />

        {/* Interactive Layer (Simplified) */}
        <div className="relative z-10 flex h-full w-full items-center justify-center">
          <div className="max-w-lg space-y-4 rounded-3xl border bg-white/80 p-12 text-center shadow-2xl backdrop-blur-md">
            <div className="bg-primary/10 text-primary mx-auto flex h-16 w-16 animate-pulse items-center justify-center rounded-full">
              <Navigation className="h-8 w-8" />
            </div>
            <h2 className="text-2xl font-bold">Interactive Map Preview</h2>
            <p className="text-muted-foreground leading-relaxed font-medium">
              Explore your barangay's critical infrastructure, evacuation
              routes, and community facilities in real-time.
            </p>
            <div className="flex items-center justify-center gap-3 pt-4">
              <Badge className="border-none bg-blue-100 px-4 py-1 text-blue-700 hover:bg-blue-100">
                24 Facilities
              </Badge>
              <Badge className="border-none bg-green-100 px-4 py-1 text-green-700 hover:bg-green-100">
                3 Safe Zones
              </Badge>
            </div>
          </div>

          {/* Mock Markers */}
          <MapMarkerComponent
            x={30}
            y={40}
            type="health"
            label="Barangay Health Center"
          />
          <MapMarkerComponent x={60} y={25} type="gov" label="Barangay Hall" />
          <MapMarkerComponent
            x={45}
            y={70}
            type="parks"
            label="Community Park"
          />
          <MapMarkerComponent
            x={15}
            y={65}
            type="safety"
            label="Police Station"
          />
        </div>

        {/* Floating Controls */}
        <div className="absolute right-6 bottom-6 z-20 flex flex-col gap-2">
          <MapControlButton icon={Navigation} />
          <div className="flex flex-col overflow-hidden rounded-xl border bg-white shadow-lg">
            <MapControlButton icon={Plus} border={false} />
            <div className="mx-2 h-px bg-slate-100" />
            <MapControlButton icon={Minus} border={false} />
          </div>
        </div>
      </div>

      <div className="bg-card scrollbar-hide flex h-48 gap-4 overflow-x-auto border-t p-4 whitespace-nowrap">
        <LocationCard
          title="Health Center"
          type="health"
          distance="250m"
          status="Open"
        />
        <LocationCard
          title="Barangay Hall"
          type="gov"
          distance="450m"
          status="Open"
        />
        <LocationCard
          title="Community Park"
          type="parks"
          distance="800m"
          status="Always Open"
        />
        <LocationCard
          title="Evacuation Site"
          type="safety"
          distance="1.2km"
          status="Ready"
        />
      </div>
    </div>
  )
}

function MapMarkerComponent({
  x,
  y,
  type,
  label,
}: {
  x: number
  y: number
  type: string
  label: string
}) {
  const colors: Record<string, string> = {
    health: 'text-red-600',
    gov: 'text-blue-600',
    parks: 'text-green-600',
    safety: 'text-orange-600',
  }

  return (
    <div className="group absolute" style={{ left: `${x}%`, top: `${y}%` }}>
      <div
        className={cn(
          'cursor-pointer drop-shadow-lg transition-transform hover:scale-125',
          colors[type],
        )}
      >
        <MapPin className="h-8 w-8 fill-current" />
      </div>
      <div className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded bg-slate-900 px-2 py-1 text-xs font-bold whitespace-nowrap text-white opacity-0 shadow-xl transition-opacity group-hover:opacity-100">
        {label}
      </div>
    </div>
  )
}

function MapControlButton({
  icon: Icon,
  border = true,
}: {
  icon: any
  border?: boolean
}) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        'h-10 w-10 bg-white text-slate-600 hover:bg-slate-50',
        border && 'rounded-xl border shadow-lg',
      )}
    >
      <Icon className="h-4 w-4" />
    </Button>
  )
}

function LocationCard({
  title,
  type,
  distance,
  status,
}: {
  title: string
  type: string
  distance: string
  status: string
}) {
  const icons: Record<string, any> = {
    health: Building2,
    gov: Home,
    parks: Trees,
    safety: Shield,
  }
  const Icon = icons[type]

  return (
    <div className="group w-64 shrink-0 cursor-pointer rounded-2xl border bg-slate-50/50 p-4 shadow-sm transition-all hover:bg-slate-50">
      <div className="flex items-center gap-3">
        <div className="text-primary group-hover:bg-primary flex h-10 w-10 items-center justify-center rounded-xl border bg-white shadow-inner transition-colors group-hover:text-white">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h4 className="text-sm font-bold">{title}</h4>
          <p className="text-muted-foreground text-xs">
            {distance} •{' '}
            <span className="font-semibold text-green-600">{status}</span>
          </p>
        </div>
      </div>
      <div className="mt-4 flex gap-1">
        <Badge variant="outline" className="text-xs">
          Direction
        </Badge>
        <Badge variant="outline" className="text-xs">
          Call
        </Badge>
      </div>
    </div>
  )
}

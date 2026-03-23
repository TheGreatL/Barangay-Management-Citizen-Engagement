import { createFileRoute } from '@tanstack/react-router'
import { Map as MapIcon, MapPin, Navigation, Search, Home, Building2, Trees, Shield, Plus, Minus } from 'lucide-react'
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
    <div className="flex flex-col h-[calc(100vh-64px)] overflow-hidden">
      <div className="p-4 border-b bg-card flex items-center justify-between gap-4">
        <div className="flex-1 max-w-md relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search landmarks, facilities, or households..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border bg-slate-50 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
          />
        </div>
        <div className="hidden md:flex items-center gap-2">
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

      <div className="flex-1 relative bg-slate-100 flex items-center justify-center border-b shadow-inner overflow-hidden">
        {/* Mock Map Background */}
        <div className="absolute inset-0 grayscale opacity-40 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=14.5995,120.9842&zoom=15&size=1200x800&key=MOCK_KEY')] bg-cover" />
        
        {/* Interactive Layer (Simplified) */}
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          <div className="text-center p-12 max-w-lg bg-white/80 backdrop-blur-md rounded-3xl border shadow-2xl space-y-4">
            <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary animate-pulse">
              <Navigation className="h-8 w-8" />
            </div>
            <h2 className="text-2xl font-black">Interactive Map Preview</h2>
            <p className="text-muted-foreground font-medium leading-relaxed">
              Explore your barangay's critical infrastructure, evacuation routes, and community facilities in real-time.
            </p>
            <div className="flex items-center justify-center gap-3 pt-4">
              <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-none px-4 py-1">24 Facilities</Badge>
              <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none px-4 py-1">3 Safe Zones</Badge>
            </div>
          </div>

          {/* Mock Markers */}
          <MapMarkerComponent x={30} y={40} type="health" label="Barangay Health Center" />
          <MapMarkerComponent x={60} y={25} type="gov" label="Barangay Hall" />
          <MapMarkerComponent x={45} y={70} type="parks" label="Community Park" />
          <MapMarkerComponent x={15} y={65} type="safety" label="Police Station" />
        </div>

        {/* Floating Controls */}
        <div className="absolute bottom-6 right-6 flex flex-col gap-2 z-20">
          <MapControlButton icon={Navigation} />
          <div className="flex flex-col border rounded-xl bg-white shadow-lg overflow-hidden">
            <MapControlButton icon={Plus} border={false} />
            <div className="h-px bg-slate-100 mx-2" />
            <MapControlButton icon={Minus} border={false} />
          </div>
        </div>
      </div>

      <div className="h-48 bg-card border-t p-4 overflow-x-auto whitespace-nowrap scrollbar-hide flex gap-4">
        <LocationCard title="Health Center" type="health" distance="250m" status="Open" />
        <LocationCard title="Barangay Hall" type="gov" distance="450m" status="Open" />
        <LocationCard title="Community Park" type="parks" distance="800m" status="Always Open" />
        <LocationCard title="Evacuation Site" type="safety" distance="1.2km" status="Ready" />
      </div>
    </div>
  )
}

function MapMarkerComponent({ x, y, type, label }: { x: number; y: number; type: string; label: string }) {
  const colors: Record<string, string> = {
    health: 'text-red-600',
    gov: 'text-blue-600',
    parks: 'text-green-600',
    safety: 'text-orange-600',
  }

  return (
    <div 
      className="absolute group"
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      <div className={cn("cursor-pointer drop-shadow-lg transition-transform hover:scale-125", colors[type])}>
        <MapPin className="h-8 w-8 fill-current" />
      </div>
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-slate-900 text-white text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap shadow-xl">
        {label}
      </div>
    </div>
  )
}

function MapControlButton({ icon: Icon, border = true }: { icon: any; border?: boolean }) {
  return (
    <Button 
      variant="ghost" 
      size="icon" 
      className={cn("h-10 w-10 bg-white hover:bg-slate-50 text-slate-600", border && "border shadow-lg rounded-xl")}
    >
      <Icon className="h-4 w-4" />
    </Button>
  )
}

function LocationCard({ title, type, distance, status }: { title: string; type: string; distance: string; status: string }) {
  const icons: Record<string, any> = {
    health: Building2,
    gov: Home,
    parks: Trees,
    safety: Shield,
  }
  const Icon = icons[type]

  return (
    <div className="w-64 border rounded-2xl p-4 bg-slate-50/50 hover:bg-slate-50 transition-all cursor-pointer group shadow-sm shrink-0">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-white border flex items-center justify-center text-primary shadow-inner group-hover:bg-primary group-hover:text-white transition-colors">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h4 className="font-bold text-sm">{title}</h4>
          <p className="text-xs text-muted-foreground">{distance} • <span className="text-green-600 font-semibold">{status}</span></p>
        </div>
      </div>
      <div className="mt-4 flex gap-1">
        <Badge variant="outline" className="text-xs">Direction</Badge>
        <Badge variant="outline" className="text-xs">Call</Badge>
      </div>
    </div>
  )
}

import { useQuery } from '@tanstack/react-query'
import { disasterService } from '../disaster.service'
import { AlertTriangle, Clock, Users, MapPin } from 'lucide-react'
import { Badge } from '@/shared/components/ui/badge'
import type { TDisaster } from '../disaster.schema'
import { severityColors } from '../disaster.schema'

export function DisasterAlerts() {
  const { data, isLoading } = useQuery({
    queryKey: ['active-disasters'],
    queryFn: () => disasterService.getActive(),
    refetchInterval: 30000,
  })

  const disasters = data?.data || []

  if (isLoading || disasters.length === 0) {
    return null
  }

  return (
    <div className="space-y-3">
      {disasters.map((disaster: TDisaster) => (
        <div
          key={disaster.id}
          className={`rounded-lg border-2 border-red-400 bg-red-50 p-4 ${
            disaster.severity === 'critical' ? 'animate-pulse' : ''
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex gap-3">
              <AlertTriangle className="mt-1 h-5 w-5 text-red-600" />
              <div>
                <h3 className="font-bold text-red-900">{disaster.title}</h3>
                <p className="mt-1 text-sm text-red-800">
                  {disaster.description}
                </p>
              </div>
            </div>
            <Badge className={severityColors[disaster.severity]}>
              {disaster.severity.toUpperCase()}
            </Badge>
          </div>

          <div className="mt-3 flex flex-wrap gap-4 text-sm text-red-700">
            {disaster.location && (
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {disaster.location}
              </div>
            )}
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {new Date(disaster.startDate).toLocaleDateString()}
            </div>
            {disaster.affectedCitizens && (
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {disaster.affectedCitizens} affected
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

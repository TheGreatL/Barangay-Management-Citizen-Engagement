import { useQuery } from '@tanstack/react-query'
import { serviceService } from '../service.service'
import { useState } from 'react'
import { AlertCircle, Phone, Mail, MapPin, Clock } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import type { TService, TServiceCategory } from '../service.schema'
import { serviceCategoryLabels } from '../service.schema'

export function ServiceList() {
  const [selectedCategory, setSelectedCategory] = useState<
    TServiceCategory | 'all'
  >('all')
  const { data, isLoading, error } = useQuery({
    queryKey: ['services', selectedCategory],
    queryFn: () =>
      selectedCategory === 'all'
        ? serviceService.list()
        : serviceService.getByCategory(selectedCategory),
  })

  if (isLoading) {
    return (
      <div className="p-6 text-center text-gray-500">Loading services...</div>
    )
  }

  if (error) {
    return (
      <div className="rounded-lg bg-red-50 p-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="mt-0.5 h-5 w-5 text-red-600" />
          <div>
            <h3 className="font-medium text-red-900">
              Failed to load services
            </h3>
            <p className="text-sm text-red-700">Please try again later</p>
          </div>
        </div>
      </div>
    )
  }

  const services = data?.data || []
  const categories: (TServiceCategory | 'all')[] = [
    'all',
    'health',
    'education',
    'livelihood',
    'water',
    'electricity',
    'other',
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <Button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            variant={selectedCategory === cat ? 'default' : 'outline'}
          >
            {cat === 'all' ? 'All Services' : serviceCategoryLabels[cat]}
          </Button>
        ))}
      </div>

      <div className="space-y-4">
        {services.length === 0 ? (
          <div className="rounded-lg border border-dashed border-gray-300 p-12 text-center">
            <AlertCircle className="mx-auto mb-4 h-12 w-12 text-gray-400" />
            <p className="text-gray-600">No services available</p>
            <p className="text-sm text-gray-500">
              Check back later for available services
            </p>
          </div>
        ) : (
          services.map((service: TService) => (
            <div
              key={service.id}
              className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {service.name}
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  {service.description}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {service.location && (
                  <div className="flex items-start gap-2 text-sm text-gray-600">
                    <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" />
                    <span>{service.location}</span>
                  </div>
                )}
                {service.phone && (
                  <div className="flex items-start gap-2 text-sm text-gray-600">
                    <Phone className="mt-0.5 h-4 w-4 flex-shrink-0" />
                    <a
                      href={`tel:${service.phone}`}
                      className="hover:text-blue-600"
                    >
                      {service.phone}
                    </a>
                  </div>
                )}
                {service.email && (
                  <div className="flex items-start gap-2 text-sm text-gray-600">
                    <Mail className="mt-0.5 h-4 w-4 flex-shrink-0" />
                    <a
                      href={`mailto:${service.email}`}
                      className="hover:text-blue-600"
                    >
                      {service.email}
                    </a>
                  </div>
                )}
                {service.operatingHours && (
                  <div className="flex items-start gap-2 text-sm text-gray-600">
                    <Clock className="mt-0.5 h-4 w-4 flex-shrink-0" />
                    <span>{service.operatingHours}</span>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { AlertCircle, Plus, Search } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { useState } from 'react'
import api from '@/shared/api/api-config'

export const Route = createFileRoute('/_protected/_official/residents')({
  component: ResidentsComponent,
})

function ResidentsComponent() {
  const [searchTerm, setSearchTerm] = useState('')

  const { data, isLoading, error } = useQuery({
    queryKey: ['residents', searchTerm],
    queryFn: async () => {
      const response = await api.get('/residents', {
        params: { search: searchTerm },
      })
      return response.data
    },
  })

  const residents = data?.data || []

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Residents Management
          </h1>
          <p className="mt-2 text-slate-600">
            Manage household and resident records
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Resident
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
        <Input
          placeholder="Search residents by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {isLoading && <div className="text-center text-slate-500">Loading residents...</div>}

      {error && (
        <div className="rounded-lg bg-red-50 p-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="mt-0.5 h-5 w-5 text-red-600" />
            <div>
              <h3 className="font-medium text-red-900">Failed to load residents</h3>
              <p className="text-sm text-red-700">Please try again later</p>
            </div>
          </div>
        </div>
      )}

      {residents.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-300 p-12 text-center">
          <AlertCircle className="mx-auto mb-4 h-12 w-12 text-gray-400" />
          <p className="text-gray-600">No residents found</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                  Address
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {residents.map((resident: any) => (
                <tr key={resident.id} className="hover:bg-slate-50">
                  <td className="whitespace-nowrap px-6 py-4">
                    <p className="font-medium text-slate-900">
                      {resident.firstName} {resident.lastName}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{resident.email}</td>
                  <td className="px-6 py-4 text-slate-600">{resident.phone || 'N/A'}</td>
                  <td className="px-6 py-4 text-slate-600">{resident.address || 'N/A'}</td>
                  <td className="px-6 py-4">
                    <Button size="sm" variant="outline">
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

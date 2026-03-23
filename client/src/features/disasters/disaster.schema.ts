import { z } from 'zod'

export const disasterTypeSchema = z.enum([
  'flood',
  'earthquake',
  'typhoon',
  'fire',
  'other',
])

export const disasterStatusSchema = z.enum([
  'alert',
  'active',
  'recovery',
  'resolved',
])

export const severitySchema = z.enum(['low', 'medium', 'high', 'critical'])

export type TDisasterType = z.infer<typeof disasterTypeSchema>
export type TDisasterStatus = z.infer<typeof disasterStatusSchema>
export type TSeverity = z.infer<typeof severitySchema>

export interface TDisaster {
  id: string
  type: TDisasterType
  title: string
  description: string
  status: TDisasterStatus
  severity: TSeverity
  location: string
  latitude?: number
  longitude?: number
  affectedCitizens?: number
  startDate: string
  endDate?: string
  createdAt: string
  updatedAt: string
}

export const severityColors: Record<TSeverity, string> = {
  low: 'bg-yellow-100 text-yellow-800',
  medium: 'bg-orange-100 text-orange-800',
  high: 'bg-red-100 text-red-800',
  critical: 'bg-red-200 text-red-900',
}

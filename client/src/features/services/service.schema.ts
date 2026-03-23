import { z } from 'zod'

export const serviceCategorySchema = z.enum([
  'health',
  'education',
  'livelihood',
  'water',
  'electricity',
  'other',
])

export type TServiceCategory = z.infer<typeof serviceCategorySchema>

export interface TService {
  id: string
  name: string
  description: string
  category: TServiceCategory
  contactPerson?: string
  phone?: string
  email?: string
  operatingHours?: string
  location?: string
  createdAt: string
  updatedAt: string
}

export const serviceCategoryLabels: Record<TServiceCategory, string> = {
  health: 'Health & Medical',
  education: 'Education',
  livelihood: 'Livelihood & Employment',
  water: 'Water & Sanitation',
  electricity: 'Electricity & Utilities',
  other: 'Other Services',
}

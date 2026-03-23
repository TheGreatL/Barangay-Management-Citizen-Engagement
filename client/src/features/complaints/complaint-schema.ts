import { z } from 'zod'

export const complaintCategorySchema = z.enum([
  'infrastructure',
  'health',
  'education',
  'safety',
  'cleanliness',
  'other',
])

export const complaintPrioritySchema = z.enum([
  'low',
  'medium',
  'high',
  'urgent',
])

export const complaintStatusSchema = z.enum([
  'pending',
  'investigating',
  'resolved',
  'closed',
  'rejected',
])

export const createComplaintSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  category: complaintCategorySchema,
  priority: complaintPrioritySchema,
  location: z.string().min(3, 'Location is required'),
  attachments: z.array(z.instanceof(File)).optional(),
})

export type TCreateComplaint = z.infer<typeof createComplaintSchema>

export interface TUpdateComplaintStatus {
  status: TComplaintStatus
  remarks?: string
}

export interface TComplaintStats {
  total: number
  pending: number
  investigating: number
  resolved: number
  closed: number
}

export type TComplaintCategory = z.infer<typeof complaintCategorySchema>
export type TComplaintPriority = z.infer<typeof complaintPrioritySchema>
export type TComplaintStatus = z.infer<typeof complaintStatusSchema>

export interface TComplaint {
  id: string
  citizenId: string
  complainantName?: string
  title: string
  description: string
  category: TComplaintCategory
  priority: TComplaintPriority
  location: string
  status: TComplaintStatus
  attachmentUrls?: string[]
  createdAt: string
  updatedAt: string
  resolvedAt?: string
}

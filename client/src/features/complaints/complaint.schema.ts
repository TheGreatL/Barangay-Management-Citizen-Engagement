import { z } from 'zod'

export const complaintCategorySchema = z.enum([
  'infrastructure',
  'health',
  'education',
  'safety',
  'cleanliness',
  'other',
])

export const complaintPrioritySchema = z.enum(['low', 'medium', 'high', 'urgent'])

export const createComplaintSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  category: complaintCategorySchema,
  priority: complaintPrioritySchema,
  location: z.string().min(3, 'Location is required'),
  attachments: z.array(z.instanceof(File)).optional(),
})

export type TCreateComplaint = z.infer<typeof createComplaintSchema>

export type TComplaintCategory = z.infer<typeof complaintCategorySchema>
export type TComplaintPriority = z.infer<typeof complaintPrioritySchema>

export interface TComplaint {
  id: string
  citizenId: string
  title: string
  description: string
  category: TComplaintCategory
  priority: TComplaintPriority
  location: string
  status: 'draft' | 'submitted' | 'acknowledged' | 'in_progress' | 'resolved' | 'rejected'
  attachmentUrls?: string[]
  createdAt: string
  updatedAt: string
  lastStatusUpdatedAt: string
  resolvedAt?: string
}

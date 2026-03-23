import { z } from 'zod'

export const documentTypeSchema = z.enum([
  'barangay_clearance',
  'certificate_of_residency',
  'certificate_of_good_moral',
  'other',
])

export const createDocumentRequestSchema = z.object({
  documentType: documentTypeSchema,
  purpose: z.string().optional(),
})

export type TCreateDocumentRequest = z.infer<typeof createDocumentRequestSchema>
export type TDocumentType = z.infer<typeof documentTypeSchema>

export interface TDocumentRequest {
  id: string
  citizenId: string
  documentType: TDocumentType
  purpose?: string
  status: 'pending' | 'processing' | 'ready_for_pickup' | 'completed' | 'rejected'
  pickupDate?: string
  rejectionReason?: string
  createdAt: string
  updatedAt: string
  completedAt?: string
}

export const documentTypeLabels: Record<TDocumentType, string> = {
  barangay_clearance: 'Barangay Clearance',
  certificate_of_residency: 'Certificate of Residency',
  certificate_of_good_moral: 'Certificate of Good Moral',
  other: 'Other Document',
}

export const statusLabels: Record<TDocumentRequest['status'], string> = {
  pending: 'Pending',
  processing: 'Processing',
  ready_for_pickup: 'Ready for Pickup',
  completed: 'Completed',
  rejected: 'Rejected',
}

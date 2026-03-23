import { z } from 'zod'

export const announcementSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  content: z.string().min(20, 'Content must be at least 20 characters'),
  category: z.string().optional(),
})

export type TAnnouncementSchema = z.infer<typeof announcementSchema>

export type TAnnouncementStatus = 'draft' | 'published' | 'archived'

export interface TAnnouncement {
  id: string
  title: string
  content: string
  authorId: string
  category?: string
  status: TAnnouncementStatus
  imageUrl?: string
  publishedAt?: string
  createdAt: string
  updatedAt: string
}

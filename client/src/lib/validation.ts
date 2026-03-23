import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export const signupSchema = z
  .object({
    email: z.string().email('Invalid email address'),
    firstName: z.string().min(2, 'First name must be at least 2 characters'),
    lastName: z.string().min(2, 'Last name must be at least 2 characters'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
    phone: z.string().optional(),
    address: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export const complaintSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  category: z.enum(['infrastructure', 'health', 'education', 'safety', 'cleanliness', 'other']),
  priority: z.enum(['low', 'medium', 'high', 'urgent']),
  location: z.string().min(5, 'Location is required'),
})

export const documentRequestSchema = z.object({
  documentType: z.enum([
    'barangay_clearance',
    'certificate_of_residency',
    'certificate_of_good_moral',
    'other',
  ]),
  purpose: z.string().optional(),
})

export const announcementSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  content: z.string().min(20, 'Content must be at least 20 characters'),
  category: z.string().optional(),
})

export type TLoginSchema = z.infer<typeof loginSchema>
export type TSignupSchema = z.infer<typeof signupSchema>
export type TComplaintSchema = z.infer<typeof complaintSchema>
export type TDocumentRequestSchema = z.infer<typeof documentRequestSchema>
export type TAnnouncementSchema = z.infer<typeof announcementSchema>

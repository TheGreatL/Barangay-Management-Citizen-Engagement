// User types
export type TUserRole = 'citizen' | 'barangay_official' | 'admin'
export type TUserStatus = 'active' | 'inactive' | 'suspended'

export interface TUser {
  id: string
  email: string
  firstName: string
  lastName: string
  role: TUserRole
  status: TUserStatus
  profileImageUrl?: string
  barangayId?: string
  phone?: string
  address?: string
  createdAt: string
  updatedAt: string
}

// Auth types
export interface TLoginRequest {
  email: string
  password: string
}

export interface TSignupRequest {
  email: string
  password: string
  confirmPassword: string
  firstName: string
  lastName: string
  phone?: string
  address?: string
}

export interface TAuthResponse {
  accessToken: string
  refreshToken: string
  user: TUser
}

// Complaint types
export type TComplaintStatus = 'draft' | 'submitted' | 'acknowledged' | 'in_progress' | 'resolved' | 'rejected'
export type TComplaintCategory = 'infrastructure' | 'health' | 'education' | 'safety' | 'cleanliness' | 'other'
export type TComplaintPriority = 'low' | 'medium' | 'high' | 'urgent'

export interface TComplaint {
  id: string
  citizenId: string
  title: string
  description: string
  category: TComplaintCategory
  priority: TComplaintPriority
  status: TComplaintStatus
  location: string
  attachmentUrls?: string[]
  createdAt: string
  updatedAt: string
  lastStatusUpdatedAt: string
  resolvedAt?: string
}

// Document request types
export type TDocumentType = 'barangay_clearance' | 'certificate_of_residency' | 'certificate_of_good_moral' | 'other'
export type TDocumentRequestStatus = 'pending' | 'processing' | 'ready_for_pickup' | 'completed' | 'rejected'

export interface TDocumentRequest {
  id: string
  citizenId: string
  documentType: TDocumentType
  purpose?: string
  status: TDocumentRequestStatus
  pickupDate?: string
  rejectionReason?: string
  createdAt: string
  updatedAt: string
  completedAt?: string
}

// Announcement types
export interface TAnnouncement {
  id: string
  title: string
  content: string
  authorId: string
  category?: string
  status: 'draft' | 'published' | 'archived'
  imageUrl?: string
  publishedAt?: string
  createdAt: string
  updatedAt: string
}

// Service types
export type TServiceCategory = 'health' | 'education' | 'livelihood' | 'water' | 'electricity' | 'other'

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

// Disaster types
export type TDisasterStatus = 'alert' | 'active' | 'recovery' | 'resolved'
export type TDisasterType = 'flood' | 'earthquake' | 'typhoon' | 'fire' | 'other'

export interface TDisaster {
  id: string
  type: TDisasterType
  title: string
  description: string
  status: TDisasterStatus
  severity: 'low' | 'medium' | 'high' | 'critical'
  location: string
  affectedCitizens?: number
  startDate: string
  endDate?: string
  createdAt: string
  updatedAt: string
}

// Analytics types
export interface TAnalyticsData {
  totalComplaints: number
  resolvedComplaints: number
  pendingDocumentRequests: number
  totalResidents: number
  activeServices: number
  averageResponseTime: number
}

// Pagination types
export interface TPaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export interface TPaginationParams {
  page: number
  pageSize: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

// API Response types
export interface TApiResponse<T> {
  success: boolean
  data?: T
  error?: {
    code: string
    message: string
  }
}

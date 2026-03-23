import {
  generateResidents,
  generateComplaints,
  generateCertificates,
} from './mock-data'
import { simulateApiCall } from './mock-api'

export const getOfficialResidents = async (params: {
  page?: number
  limit?: number
  search?: string
  sort?: string
  order?: 'asc' | 'desc'
}) => {
  const residents = generateResidents(50)
  return simulateApiCall(residents, params)
}

export const getOfficialDocuments = async (params: {
  page?: number
  limit?: number
  search?: string
  status?: string
}) => {
  const documents = generateCertificates(40)
  return simulateApiCall(documents, params)
}

export const getOfficialComplaints = async (params: {
  page?: number
  limit?: number
  search?: string
  status?: string
}) => {
  const complaints = generateComplaints(30)
  return simulateApiCall(complaints, params)
}

export const updateOfficialComplaintStatus = async (
  id: string,
  status: string,
) => {
  console.log(`Updating complaint ${id} to status ${status}`)
  return { success: true }
}

export const updateOfficialDocumentStatus = async (
  id: string,
  status: string,
) => {
  console.log(`Updating document ${id} to status ${status}`)
  return { success: true }
}

import { useAuth } from '@/context/AuthContext' // Adjust path as needed

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL // Replace with your actual API base URL

export const useApiConfig = () => {
  const { user } = useAuth()

  const apiCall = async (endpoint: string, method: 'GET' | 'POST' = 'GET', body?: any) => {
    if (!user?.token) {
      throw new Error('No authentication token available')
    }

    const config: RequestInit = {
      method,
      headers: {
        'Authorization': `Bearer ${user.token}`,
        'Content-Type': 'application/json',
      },
    }

    if (body && method === 'POST') {
      config.body = JSON.stringify(body)
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, config)

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }

  return {
    // 1. Today Assigns Pending Breakdown
    getPendingBreakdowns: async () => {
      return apiCall(`api/breakdown/pending?techCode=${user?.tecH_CODE}`)
    },

    // 2. Today Assigns Completed Breakdown
    getCompletedBreakdowns: async () => {
      return apiCall(`api/breakdown/complete?techCode=${user?.tecH_CODE}`)
    },

    // 3. Update Breakdown
    updateBreakdownStatus: async (jobData: any) => {
      return apiCall('api/Breakdown/updatejobstatus', 'POST', jobData)
    },

    // 4. Recent Normal Services list
    getMonthlyServiceVisits: async () => {
      return apiCall(`api/Service/getmonthlyservicevisits?techCode=${user?.tecH_CODE}`)
    },

    // 5. Get Performance
    getPerformance: async () => {
      return apiCall(`api/Breakdown/getperformance?techCode=${user?.tecH_CODE}`)
    },
  }
}
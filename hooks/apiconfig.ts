import { useAuth } from '@/context/AuthContext'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

// Type definitions for Breakdowns
export interface Job {
  id: string
  jobId: string
  date: string
  location: string
  description?: string
  customerName?: string
  status: string
  note?: string
  customer_agreement?: string
  phone_number?: string
  machineRefNo?: string
  serialNo?: string
}

interface ApiBreakdown {
  joB_STATUS: any
  dJ_ID: string
  seriaL_NO: string
  machinE_REF_NO: string
  cuS_NAME: string
  cuS_ADD1: string
  cuS_ADD2: string
  cuS_ADD3: string
  cuS_CONTACT: string
  cuS_TEL_NO: string
  teaM_ID: string
  teaM_NAME: string
  dJ_DATE: string
  tecH_CODE: string
  tecH_MOBILE: string
  machinE_MODEL_ID: string
  machinE_MODEL_NAME: string
  cuS_STATUS: string
  note: string
  jobStatus: string
}

// Type definitions for Service Visits
export interface ServiceVisit {
  id: string
  jobId: string
  customerName: string
  date: string
  location: string
  daysLeft: number
  status: string
  phone_number: string
  expected_visit_no: number
  machineRefNo?: string
  
}

interface ApiServiceVisit {
  machineRefNo: string
  expectedVisitNo: string
  expectedVisitDate: string
  expectedVisitCount: number
  visitStatus: string
  rowId: number
  customerID: string
  customerName: string
  contactPerson: string | null
  customerTelephone: string
  machineLocation01: string
  machineLocation02: string
  machineLocation03: string
}

// Breakdown update payload
interface BreakdownUpdatePayload {
  techCode: string
  jobId: number
  machineRefNo: string
  serialNo: string
  jobStatus: 'started' | 'complete'
  note: string
}

// Service update payload
interface ServiceUpdatePayload {
  techCode: string
  visitNo: number
  machineRefNo: string
  jobStatus: 'started' | 'complete'
  meterReadingValue?: number
}

// Breakdown Mapping functions
const mapCustomerAgreement = (cusStatus: string): string => {
  const agreementMap: { [key: string]: string } = {
    'FS': 'Free Service',
    'NS': 'No Service',
    'MA': 'Maintenance Agreement',
    'EX': 'Extended Service'
  }
  return agreementMap[cusStatus] || cusStatus
}

const mapJobStatus = (jobStatus: string): string => {
    console.log("Mapping job status:", jobStatus);
  const statusMap: { [key: string]: string } = {
    'TECH ALLOCATED': 'pending',
    'STARTED': 'started',
    'COMPLET': 'completed'
    
  }
  if(jobStatus === null || jobStatus === undefined){
    return 'unknown';
  }else{
  return statusMap[jobStatus] || jobStatus.toLowerCase() 
  }
}

const mapBreakdownToJob = (breakdown: ApiBreakdown): Job => {
    console.log("Mapping breakdown:", breakdown);
  return {
    id: breakdown.dJ_ID,
    jobId: breakdown.dJ_ID,
    date: breakdown.dJ_DATE,
    location: breakdown.cuS_ADD1,
    description: breakdown.note,
    customerName: breakdown.cuS_NAME,
    status: mapJobStatus(breakdown.joB_STATUS),
    // status: breakdown.joB_STATUS.toLowerCase(),
    note: breakdown.note,
    customer_agreement: mapCustomerAgreement(breakdown.cuS_STATUS),
    phone_number: breakdown.cuS_TEL_NO,
    machineRefNo: breakdown.machinE_REF_NO,
    serialNo: breakdown.seriaL_NO
  }
}

const mapBreakdownsToJobs = (breakdowns: ApiBreakdown[]): Job[] => {
  return breakdowns.map(mapBreakdownToJob)
}

// Service Visit Mapping functions
const mapExpectedVisitNo = (expectedVisitNo: string): number => {
  const visitMap: { [key: string]: number } = {
    'EXPT_SV1': 1,
    'EXPT_SV2': 2,
    'EXPT_SV3': 3,
    'EXPT_SV4': 4,
    'EXPT_SV5': 5,
    'EXPT_SV6': 6
  }
  return visitMap[expectedVisitNo] || 0
}

const calculateDaysLeft = (expectedVisitDate: string): number => {
  const visitDate = new Date(expectedVisitDate)
  const today = new Date()
  visitDate.setHours(0, 0, 0, 0)
  today.setHours(0, 0, 0, 0)
  const diffTime = today.getTime() - visitDate.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

const mapServiceVisit = (visit: ApiServiceVisit): ServiceVisit => {
  return {
    id: visit.rowId.toString(),
    jobId: visit.rowId.toString(),
    customerName: visit.customerName,
    date: visit.expectedVisitDate,
    location: visit.machineLocation01,
    daysLeft: calculateDaysLeft(visit.expectedVisitDate),
    status: visit.visitStatus.toLowerCase(),
    phone_number: visit.customerTelephone,
    expected_visit_no: mapExpectedVisitNo(visit.expectedVisitNo),
    machineRefNo: visit.machineRefNo
  }
}

const mapServiceVisits = (visits: ApiServiceVisit[]): ServiceVisit[] => {
  return visits.map(mapServiceVisit)
}

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
        console.log("API Call Body___________________________:", body);
      config.body = JSON.stringify(body)
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, config)
    console.log(response.status, "", response.statusText );
    if (!response.ok ) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`)
    }

    return method === 'GET' ? await response.json() : response;

    // console.log("API call successful:", endpoint);
    // const res = await response.json();
    // console.log("API call response data:", res);
    // return res;
  }

  return {
    // 1. Today Assigns Pending Breakdown (with mapping)
    getAllBreakdowns: async (): Promise<Job[]> => {
      const data = await apiCall(`api/Breakdown/todaybreakdown?techCode=${user?.tecH_CODE}`)
      return mapBreakdownsToJobs(data)
    },

    // 2. Update Breakdown Status
    updateBreakdownStatus: async (payload: BreakdownUpdatePayload) => {
       
        const test = await apiCall('api/Breakdown/updatejobstatus', 'POST', payload);
        
      return test;
    },

    // 3. Recent Normal Services list (with mapping)
    getMonthlyServiceVisits: async (): Promise<ServiceVisit[]> => {
      const data = await apiCall(`api/Service/getmonthlyservicevisits?techCode=${user?.tecH_CODE}`)
      return mapServiceVisits(data)
    },

    // 4. Update Service Visit Status
    updateServiceVisitStatus: async (payload: ServiceUpdatePayload) => {
        console.log("updateServiceVisitStatus payload", payload);
      return apiCall(`api/Service/updateservicevisit?techCode=${user?.tecH_CODE}&visitNo=${payload.visitNo}&machineRefNo=${payload.machineRefNo}&jobStatus=${payload.jobStatus}&meterReadingValue=${payload.meterReadingValue}`, 'POST')
    },

    getAllBreakdownsList: async (): Promise<Job[]> => {
      const data = await apiCall(`api/Breakdown/totalbreakdownjobs?techCode=${user?.tecH_CODE}`)
      return mapBreakdownsToJobs(data)
    },

    getAllServiceList : async (): Promise<ServiceVisit[]> => {
      const data = await apiCall(`api/Service/totalservicevisits?techCode=${user?.tecH_CODE}`)
      return mapServiceVisits(data)
    },

    // 5. Get Performance
    getPerformance: async () => {
      return apiCall(`api/Breakdown/getperformance?techCode=${user?.tecH_CODE}`)
    },

    // 6. Previous Service Lists
    getPreviousServiceLists: async (machineRef: string): Promise<ServiceVisit[]> => {
      const data = await apiCall(`api/Service/previousservicelists?techCode=${user?.tecH_CODE}&machineRefNo=${machineRef}`)
      console.log("Previous Service Lists Datacaddsadasdsadadada===============++++++++++++:",machineRef, data);
      return data;
    }



  }
}
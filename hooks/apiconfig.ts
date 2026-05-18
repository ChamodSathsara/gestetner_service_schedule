import { useAuth } from '@/context/AuthContext'
import { useState } from 'react'

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
  technicianName?: string
  type?: string
  model?: string
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
  type?: string
}

interface ReCallObj {
  techCode: string | undefined
  recallReason: string
  recallDate: string
  rowID: number
  visitNo: number
  isRecall: boolean
  onSite: boolean
}

interface RecallJob {
  techCode: string
  jobId: number
  note: string
  reason: string
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
  serialNo?: string
  model?: string
}

interface getServicePayload {
  serialNo: string
  visitNo: number
  rowId: number
  companyID: string
}

interface ApiServiceVisit {
  machineRefNo: string
  expectedVisitNo: string
  serialNo: string
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
  machineModel: string
}

// Breakdown update payload
interface BreakdownUpdatePayload {
  techCode: string
  jobId: number
  machineRefNo: string
  serialNo: string
  jobStatus: 'started' | 'COMPLETED'
  note: string
  solutionCategory?: any
  recallReason?: string
}

interface CustomerFeedBack {
  jobId: any
  visitNo?: number
  customerName: string
  mobileNo: string
  rating: number
  review: string
  type: "job" | "service"
  companyId: string
}

// Service update payload
interface ServiceUpdatePayload {
  techCode: string
  visitNo: number
  jobId: number
  machineRefNo: string
  jobStatus: 'started' | 'COMPLETED'
  meterReadingValue: number
  solution?: string
  solutionCategory?: any
}

// Management side Apis______________________________________________________
export interface GetJobAndServiceCountAndRate {
  jobCount: number
  successCount: number
  jobRate: number
}

export interface JobPercentageItem {
  fill: string | undefined
  name: string
  value: number
}

export type GetCompleteAndPendingJobAndServicePercentage = JobPercentageItem[]

export interface LastWeekJobPerformanceItem {
  date: string
  pending: number
  completed: number
  started: number
  cancel: number
  total: number
}

export type GetLastWeekJobPerformence = LastWeekJobPerformanceItem[]

interface TechnicianPerformance {
  tech_id: string
  name: string
  completedJobs: number
  rating: number
  services: number
  breakdowns: number
}

export type GetTechniciansPerformance = TechnicianPerformance[]

export interface OldestDueJob {
  djId: string
  serialNo: string
  machineRefNo: string
  customerName: string
  customerAddress: string
  customerContact: string
  customerTelNo: string
  teamId: string
  teamName: string
  djDate: string
  techCode: string
  techMobile: string
  machineModelId: string
  machineModelName: string
  customerStatus: string
  jobStatus: string
  note: string
  daysOverdue: string
}

export type GetOldestDueJobs = OldestDueJob[]

interface AreaJobSummary {
  area: string
  ns: number
  fs: number
  ma: number
  ex: number
  total: number
}

export type GetAreaWiseJobSummary = AreaJobSummary[]

export interface PendingJob {
  id: string
  technician: string
  jobType: string
  location: string
  daysLeft: number
}

export type Zone = "OUTSTATION" | "COLOMBO" | "SUBURBS" | "UNKNOWN" | "P2P"

export type Technician = {
  id: string
  name: string
  email: string
  phone: string
  zone: Zone
  allJobs: number
  pendingJobs: number
  jobPerformancePercentage: number
  allServices: number
  pendingServices: number
  servicePerformancePercentage: number
}

export interface TechnicianDetailsByTechCode {
  techCode: string
  name: string
  email: string
  phone: string
  zone: string
  allJobs: number
  pendingJobs: number
  completeJobs: number
  startedJobs: number
  jobPerformancePercentage: number
  allServices: number
  completeServices: number
  pendingServices: number
  startedServices: number
  servicePerformancePercentage: number
}

// Generated from JobDto
export interface JobDto {
  com_ID?: string
  dJ_ID?: string
  dJ_DATE?: string
  seriaL_NO?: string
  machinE_REF_NO?: string
  teaM_ID?: string
  teaM_NAME?: string
  note?: string
  inforM_BY?: string
  contacT_TYPE?: string
  cuS_ADD1?: string
  cuS_ADD2?: string
  cuS_ADD3?: string
  cuS_CONTACT?: string
  cuS_TEL_NO?: string
  cuS_SMS_NO?: string
  machinE_MODEL_ID?: string
  machinE_MODEL_NAME?: string
  cuS_STATUS?: string
  cuS_TYPE?: string
  joB_STATUS?: string
  cuS_ID?: string
  cuS_NAME?: string
  tecH_CODE?: string
  tecH_MOBILE?: string
  cR_BY?: string
  cR_DATE?: string
  completE_BY?: string
  completeD_DATE?: string
  cancelleD_BY?: string
  cancelleD_DATE?: string
  smS_DEL_REPORT_ID?: string
  smS_DELIVERED?: boolean
  smS_DELIVERED_DATETIME?: string
  iS_TECH_NOTIFIED?: boolean
  starteD_BY?: string
  starteD_DATE?: string
  cancelleD_REASON?: string
  solutioN_CATEGORY?: string
  completE_SOLUTION?: string
  recalL_ID?: string
  starT_WORK_NOTE?: string
}

// Generated from ServiceScheduleDto
export interface ServiceScheduleDto {
  t_ID: number
  com_ID: string
  seriaL_NO: string
  servicE_DATE?: string
  tecH_CODE: string
  tecH_NAME: string
  machinE_REF: string
  cuS_ID: string
  cuS_NAME: string
  sV1_STATUS: string
  sV2_STATUS: string
  sV3_STATUS: string
  sV4_STATUS: string
  sV5_STATUS: string
  sV6_STATUS: string
  expT_SV1?: string
  expT_SV2?: string
  expT_SV3?: string
  expT_SV4?: string
  expT_SV5?: string
  expT_SV6?: string
}

// ── Status Mapping ────────────────────────────────────────────────────────────

/**
 * Job status mapping
 * CANCELLED          → cancelled
 * COMPLETE/COMPLETED → completed
 * PENDING ESTIMATE   → pending
 * started            → started
 * TECH ALLOCATED     → pending
 * null/undefined     → pending
 */
const mapJobStatus = (jobStatus: string): string => {
  if (jobStatus === null || jobStatus === undefined) return 'pending'

  const statusMap: { [key: string]: string } = {
    'CANCELLED':        'cancelled',
    'COMPLETE':         'completed',
    'COMPLETED':        'completed',
    'PENDING ESTIMATE': 'pending',
    'STARTED':          'started',
    'started':          'started',
    'TECH ALLOCATED':   'pending',
    'COMPLET':          'completed',  // legacy key kept for safety
  }

  return statusMap[jobStatus] ?? jobStatus.toLowerCase()
}

/**
 * Service status mapping
 * null/undefined      → pending
 * COMPLETED/COMPLETE  → completed
 * STARTED/started     → started
 * anything else       → pending
 */
const mapServiceStatus = (serviceStatus: string): string => {
  if (serviceStatus === null || serviceStatus === undefined) return 'pending'

  const statusMap: { [key: string]: string } = {
    'COMPLETED': 'completed',
    'COMPLETE':  'completed',
    'STARTED':   'started',
    'started':   'started',
  }

  return statusMap[serviceStatus] ?? 'pending'
}

// ── Mapping helpers ───────────────────────────────────────────────────────────

const mapJobDtoToPendingJob = (job: JobDto): PendingJob => ({
  id: job.machinE_REF_NO ?? "",
  technician: job.tecH_CODE ?? "",
  jobType: job.teaM_NAME ?? "",
  location: `${job.cuS_ADD1 ?? ""} ${job.cuS_ADD2 ?? ""} ${job.cuS_ADD3 ?? ""}`.trim(),
  daysLeft: job.dJ_DATE
    ? Math.ceil((new Date(job.dJ_DATE).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : 0,
})

const mapServiceScheduleToServiceVisit = (schedule: ServiceScheduleDto): ServiceVisit => {
  const visitSlots = [
    { status: schedule.sV1_STATUS, date: schedule.expT_SV1, visitNo: 1 },
    { status: schedule.sV2_STATUS, date: schedule.expT_SV2, visitNo: 2 },
    { status: schedule.sV3_STATUS, date: schedule.expT_SV3, visitNo: 3 },
    { status: schedule.sV4_STATUS, date: schedule.expT_SV4, visitNo: 4 },
    { status: schedule.sV5_STATUS, date: schedule.expT_SV5, visitNo: 5 },
    { status: schedule.sV6_STATUS, date: schedule.expT_SV6, visitNo: 6 },
  ]

  const activeSlot =
    visitSlots.find((slot) => slot.status && mapServiceStatus(slot.status) !== "completed") ??
    visitSlots[0]

  return {
    id: schedule.t_ID.toString(),
    jobId: schedule.t_ID.toString(),
    serialNo: schedule.seriaL_NO,
    customerName: schedule.cuS_NAME,
    date: activeSlot.date ?? schedule.servicE_DATE ?? "",
    location: "",
    daysLeft: activeSlot.date ? calculateDaysLeft(activeSlot.date) : 0,
    status: activeSlot.status ? mapServiceStatus(activeSlot.status) : "pending",
    phone_number: "",
    expected_visit_no: activeSlot.visitNo,
    machineRefNo: schedule.machinE_REF,
    model: undefined,
  }
}

const mapServiceSchedulesToServiceVisits = (schedules: ServiceScheduleDto[]): ServiceVisit[] =>
  schedules.map(mapServiceScheduleToServiceVisit)

const normalizeZone = (zone: string): Zone => {
  const normalizedZone = zone?.toUpperCase().trim() || ""

  const outstationZones = ["EASTERN","GALLE","JAFFNA","KURUNEGALA","OTH","OUT","OUTSTATION","PUTTLAM","SABRAGAMUWA","TRINCO","TECHNICAL - OUTSTATION"]
  const colomboZones    = ["COL", "COLOMBO"]
  const suburbsZones    = ["AVISSAWELLA", "SUB"]
  const p2pZones        = ["P2P OUT", "P2P COL", "P2P", "P2P SUB"]
  const unknownZones    = ["CONSUMABLE","DEL","PCS","PP","WORKSHOP","WS","-","0",""]

  if (outstationZones.includes(normalizedZone)) return "OUTSTATION"
  if (colomboZones.includes(normalizedZone))    return "COLOMBO"
  if (suburbsZones.includes(normalizedZone))    return "SUBURBS"
  if (p2pZones.includes(normalizedZone))        return "P2P"
  if (unknownZones.includes(normalizedZone))    return "UNKNOWN"

  return "UNKNOWN"
}

const mapTechnicianDetails = (data: any[]): Technician[] => {
  return data.map((tech) => ({
    id: tech.id,
    name: tech.name,
    email: tech.email,
    phone: tech.phone,
    zone: normalizeZone(tech.zone),
    allJobs: tech.allJobs,
    pendingJobs: tech.pendingJobs,
    jobPerformancePercentage: tech.jobPerformancePercentage,
    allServices: tech.allServices,
    pendingServices: tech.pendingServices,
    servicePerformancePercentage: tech.servicePerformancePercentage,
  }))
}

const mapOldestDueJobsToPendingJobs = (jobs: OldestDueJob[]): PendingJob[] => {
  return jobs.slice(0, 5).map((job) => ({
    id: job.machineRefNo,
    technician: job.techCode,
    jobType: job.teamName,
    location: job.customerAddress,
    daysLeft: parseInt(job.daysOverdue, 10) || 0,
  }))
}

const mapJobPercentageWithColors = (data: GetCompleteAndPendingJobAndServicePercentage): JobPercentageItem[] => {
  const colorMap: { [key: string]: string } = {
    'Completed': '#22c55e',
    'Started':   '#3b82f6',
    'Pending':   '#ef4444',
    'Cansel':    '#f59e0b',
  }
  return data.map((item) => ({
    ...item,
    fill: colorMap[item.name] || '#6b7280',
  }))
}

const mapCustomerAgreement = (cusStatus: string): string => {
  const agreementMap: { [key: string]: string } = {
    'FS': 'Free Service',
    'NS': 'No Service',
    'MA': 'Maintenance Agreement',
    'EX': 'Extended Service',
  }
  return agreementMap[cusStatus] || cusStatus
}

export const mapJobsBySerialNo = (data: any[]): Job[] => {
  if (!Array.isArray(data)) return []

  return data.map((item, index) => ({
    id: (index + 1).toString(),
    jobId: item.dJ_ID,
    date: item.dJ_DATE,
    location: `${item.cuS_ADD1 || ""} ${item.cuS_ADD2 || ""} ${item.cuS_ADD3 || ""}`.trim(),
    description: item.note,
    customerName: item.cuS_NAME,
    status: mapJobStatus(item.joB_STATUS),
    note: item.note,
    customer_agreement: mapCustomerAgreement(item.cuS_STATUS),
    machineRefNo: item.machinE_REF_NO,
    technicianName: item.teaM_NAME,
  }))
}

export const mapJobsBySerialNoJobObj = (item: any): Job => {
  return {
    id: "1",
    jobId: item.dJ_ID,
    date: item.dJ_DATE,
    location: `${item.cuS_ADD1 || ""} ${item.cuS_ADD2 || ""} ${item.cuS_ADD3 || ""}`.trim(),
    description: item.note,
    customerName: item.cuS_NAME,
    status: mapJobStatus(item.joB_STATUS),
    note: item.note,
    customer_agreement: mapCustomerAgreement(item.cuS_STATUS),
    machineRefNo: item.machinE_REF_NO,
    technicianName: item.tecH_NAME,
  }
}

const mapBreakdownToJob = (breakdown: ApiBreakdown): Job => {
  console.log("Mapping breakdown:", breakdown)
  return {
    id: breakdown.dJ_ID,
    jobId: breakdown.dJ_ID,
    date: breakdown.dJ_DATE,
    location: `${breakdown.cuS_ADD1 || ""} ${breakdown.cuS_ADD2 || ""} ${breakdown.cuS_ADD3 || ""}`.trim(),
    description: breakdown.note,
    customerName: breakdown.cuS_NAME,
    status: mapJobStatus(breakdown.joB_STATUS),
    note: breakdown.note,
    customer_agreement: mapCustomerAgreement(breakdown.cuS_STATUS),
    phone_number: breakdown.cuS_TEL_NO,
    machineRefNo: breakdown.machinE_REF_NO,
    serialNo: breakdown.seriaL_NO,
    type: breakdown.type,
    model: breakdown.machinE_MODEL_NAME,
  }
}

const mapBreakdownsToJobs = (breakdowns: ApiBreakdown[]): Job[] =>
  breakdowns.map(mapBreakdownToJob)

const mapExpectedVisitNo = (expectedVisitNo: string): number => {
  const visitMap: { [key: string]: number } = {
    'EXPT_SV1': 1, 'EXPT_SV2': 2, 'EXPT_SV3': 3,
    'EXPT_SV4': 4, 'EXPT_SV5': 5, 'EXPT_SV6': 6,
    '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6,
  }
  return visitMap[expectedVisitNo] || 0
}

const calculateDaysLeft = (expectedVisitDate: string): number => {
  const visitDate = new Date(expectedVisitDate)
  const today = new Date()
  visitDate.setHours(0, 0, 0, 0)
  today.setHours(0, 0, 0, 0)
  const diffTime = visitDate.getTime() - today.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

const MapRecallService = (data: any[]): any[] => {
  return data.map((visit) => ({
    id: visit.rowId.toString(),
    jobId: visit.rowId.toString(),
    serialNo: visit.serialNo,
    customerName: visit.customerName,
    date: visit.expectedVisitDate,
    location: `${visit.machineLocation01 || ""} ${visit.machineLocation02 || ""} ${visit.machineLocation03 || ""}`.trim(),
    daysLeft: calculateDaysLeft(visit.expectedVisitDate),
    status: mapServiceStatus(visit.serviceStatus),
    phone_number: visit.customerTelephone,
    expected_visit_no: mapExpectedVisitNo(visit.expectedVisitNo),
    machineRefNo: visit.machineRefNo,
  }))
}

const mapServiceVisit = (visit: ApiServiceVisit): ServiceVisit => {
  return {
    id: visit.rowId.toString(),
    jobId: visit.rowId.toString(),
    serialNo: visit.serialNo,
    customerName: visit.customerName,
    date: visit.expectedVisitDate,
    location: `${visit.machineLocation01 || ""} ${visit.machineLocation02 || ""} ${visit.machineLocation03 || ""}`.trim(),
    daysLeft: calculateDaysLeft(visit.expectedVisitDate),
    status: mapServiceStatus(visit.visitStatus),
    phone_number: visit.customerTelephone,
    expected_visit_no: mapExpectedVisitNo(visit.expectedVisitNo),
    machineRefNo: visit.machineRefNo,
    model: visit.machineModel,
  }
}

const mapNew = (visit: any[]) => ({ ...visit[0] })

const mapServiceVisits = (visits: ApiServiceVisit[]): ServiceVisit[] => {
  console.log("Mapping service visits:", visits)
  return visits.map(mapServiceVisit)
}

// ── Hook ──────────────────────────────────────────────────────────────────────

export const useApiConfig = () => {
  const { user, companyID } = useAuth()
  const [showUnauthorizedDialog, setShowUnauthorizedDialog] = useState(false)

  const apiCall = async (endpoint: string, method: 'GET' | 'POST' = 'GET', body?: any) => {
    if (!user?.token) throw new Error('No authentication token available')

    const config: RequestInit = {
      method,
      headers: {
        'Authorization': `Bearer ${user.token}`,
        'Content-Type': 'application/json',
      },
    }

    if (body && method === 'POST') {
      console.log("API Call Body:", body)
      config.body = JSON.stringify(body)
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, config)

    if (response.status === 401 || response.status === 403) {
      setShowUnauthorizedDialog(true)
      throw new Error('Unauthorized access')
    }

    console.log(response.status, "", response.statusText)
    if (!response.ok) throw new Error(`API Error: ${response.status} ${response.statusText}`)

    const res = method === 'GET' ? await response.json() : response
    console.log(res)
    return res
  }

  const apiCallWithoutToken = async (endpoint: string, method: 'GET' | 'POST' = 'GET', body?: any) => {
    const config: RequestInit = {
      method,
      headers: { 'Content-Type': 'application/json' },
    }

    if (body && method === 'POST') {
      console.log("API Call Body:", body)
      config.body = JSON.stringify(body)
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, config)
    console.log(response.status, "", response.statusText)

    if (!response.ok) throw new Error(`API Error: ${response.status} ${response.statusText}`)

    const res = method === 'GET' ? await response.json() : response
    console.log(res)
    return res
  }

  const apiCallRaw = async (endpoint: string): Promise<Response> => {
  if (!user?.token) throw new Error('No authentication token available')
 
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${user.token}`,
      'Content-Type': 'application/json',
    },
  })
 
  if (response.status === 401 || response.status === 403) {
    setShowUnauthorizedDialog(true)
    throw new Error('Unauthorized access')
  }
 
  if (!response.ok) throw new Error(`API Error: ${response.status} ${response.statusText}`)
 
  return response   // ← raw Response, caller calls .blob() / .arrayBuffer()
}

  return {
    showUnauthorizedDialog,
    setShowUnauthorizedDialog,

    // 1. Today Assigns Pending Breakdown
    getAllBreakdowns: async (): Promise<Job[]> => {
      const data = await apiCall(`api/Breakdown/todaybreakdown?techCode=${user?.tecH_CODE}`)
      return mapBreakdownsToJobs(data)
    },

    // 2. Update Breakdown Status
    updateBreakdownStatus: async (payload: BreakdownUpdatePayload) => {
      return await apiCall('api/Breakdown/updatejobstatus', 'POST', payload)
    },

    // 3. Monthly Service Visits
    getMonthlyServiceVisits: async (): Promise<ServiceVisit[]> => {
      const data = await apiCall(`api/Service/getmonthlyservicevisits?techCode=${user?.tecH_CODE}`)
      return mapServiceVisits(data)
    },

    updateServiceVisitStatus: async (payload: ServiceUpdatePayload) => {
      return await apiCall('api/Service/updateservicevisit', 'POST', payload)
    },

    getAllBreakdownsList: async (): Promise<Job[]> => {
      const data = await apiCall(`api/Breakdown/totalbreakdownjobs?techCode=${user?.tecH_CODE}`)
      return mapBreakdownsToJobs(data)
    },

    getAllServiceList: async (): Promise<ServiceVisit[]> => {
      const data = await apiCall(`api/Service/totalservicevisits?techCode=${user?.tecH_CODE}`)
      return mapServiceVisits(data)
    },

    // 5. Get Performance
    getPerformance: async () => {
      const data = await apiCall(`api/Breakdown/getperformance?techCode=${user?.tecH_CODE}`)
      return data
    },

    // 6. Previous Service Lists
    getPreviousServiceLists: async (machineRef: string): Promise<ServiceVisit[]> => {
      const data = await apiCall(`api/Service/previousservicelists?techCode=${user?.tecH_CODE}&machineRefNo=${machineRef}`)
      return data[0]
    },

    getDueJobs: async () => {
      return await apiCall(`api/Service/alltimedueservices?techCode=${user?.tecH_CODE}`)
    },

    getServicesBySerialNo: async (serialNo: string) => {
      return await apiCall(`api/customerfeedback/getServicesWithSerial?serialNo=${serialNo}`)
    },

    getJobsBySerialNo: async (serialNo: string) => {
      const data = await apiCall(`api/customerfeedback/getBreakdownListsForLastYear?serialno=${serialNo}`)
      return mapJobsBySerialNo(data)
    },

    getServiceBySerialNoAndMachineNo: async (payload: getServicePayload) => {
      const data = await apiCallWithoutToken(
        `api/customerfeedback/getServiceByRowID?serialNo=${payload.serialNo}&rowId=${payload.rowId}&visitNo=${payload.visitNo + 1}&companyID=${payload.companyID}`
      )
      return mapNew(data)
    },

    getJobBySerialNoAndMachineNo: async (serialNo: string, jobID: string, companyID: string) => {
      const data = await apiCallWithoutToken(
        `api/customerfeedback/getJobsWithSerial?serialNo=${serialNo}&jobID=${jobID}&companyID=${companyID}`
      )
      return mapJobsBySerialNoJobObj(data)
    },

    addFeedback: async (payload: CustomerFeedBack) => {
      return await apiCallWithoutToken('api/customerfeedback/addCustomerReview', 'POST', payload)
    },

    addRecall: async (payload: ReCallObj) => {
      payload.techCode = user?.tecH_CODE
      return await apiCall('api/ScheduleRecall/recallPreviousSchedule', 'POST', payload)
    },

    allTimeDueJobs: async (): Promise<Job[]> => {
      const data = await apiCall(`api/jobRecall/getAllLastYearsJobs?techCode=${user?.tecH_CODE}`)
      return mapBreakdownsToJobs(data)
    },

    resetPassword: async (newPassword: string) => {
      return await apiCall(`api/auth/resetPassword?techCode=${user?.tecH_CODE}`, 'POST', newPassword)
    },

    getSolutionCategories: async (): Promise<any[]> => {
      return await apiCall(`api/breakdown/solutionCategories`)
    },

    addRecallJob: async (payload: RecallJob) => {
      return await apiCall('api/jobRecall/recallJob', 'POST', payload)
    },

    getRecallServices: async (): Promise<any[]> => {
      const data = await apiCall(`api/scheduleRecall/getAllRecallServices?techCode=${user?.tecH_CODE}`)
      return MapRecallService(data)
    },

    getRecallJobs: async (): Promise<any[]> => {
      const data = await apiCall(`api/jobRecall/getallRecallJobs?techCode=${user?.tecH_CODE}`)
      return mapBreakdownsToJobs(data)
    },

    addHelpDeskMessage: async (payload: any) => {
      return await apiCall('api/helpdesk/helpRequest', 'POST', payload)
    },

    // Management Side APIs ────────────────────────────────────────────────────

    getJobCountAndRate: async (): Promise<GetJobAndServiceCountAndRate> => {
      console.log("1. Fetching Job Count and Rate...")
      return await apiCall(`api/Management/getJobCountAndRate`)
    },

    getServiceCountAndRate: async (): Promise<GetJobAndServiceCountAndRate> => {
      console.log("2. Fetching Service Count and Rate...")
      return await apiCall(`api/Management/getServiceCountAndRate`)
    },

    getPendingJobs: async (): Promise<Job[]> => {
      console.log("3. Fetching Pending Jobs...")
      const data = await apiCall(`api/Management/getPendingJobs`)
      return mapBreakdownsToJobs(data)
    },

    getCompleteAndPendingJobPercentage: async (): Promise<GetCompleteAndPendingJobAndServicePercentage> => {
      console.log("5. Fetching Complete and Pending Job Percentage...")
      const data = await apiCall(`api/Management/getCompleteAndPendingJobPercentage`)
      return mapJobPercentageWithColors(data)
    },

    getCompleteAndPendingServicesPercentage: async (): Promise<GetCompleteAndPendingJobAndServicePercentage> => {
      console.log("6. Fetching Complete and Pending Services Percentage...")
      const data = await apiCall(`api/Management/getCompleteAndPendingServicesPercentage`)
      return mapJobPercentageWithColors(data)
    },

    getLastWeekJobPerformence: async (): Promise<GetLastWeekJobPerformence> => {
      console.log("7. Fetching Last Week Job Performance...")
      return await apiCall(`api/Management/getLastWeekJobPerformence`)
    },

    getTechniciansPerformance: async (): Promise<GetTechniciansPerformance> => {
      console.log("8. Fetching Technicians Performance...")
      return await apiCall(`api/Management/getTechniciansPerformance`)
    },

    getOldestDueJobs: async (): Promise<PendingJob[]> => {
      console.log("9. Fetching Oldest Due Jobs...")
      const data = await apiCall(`api/Management/getOldestDueJobs`)
      return mapOldestDueJobsToPendingJobs(data)
    },

    getCustomerWarranty: async (): Promise<GetAreaWiseJobSummary> => {
      console.log("10. Fetching Customer Warranty...")
      return await apiCall(`api/Management/getCustomerWarranty`)
    },

    getTechnitianDetails: async (): Promise<Technician[]> => {
      console.log("11. Fetching Technician Details...")
      const data = await apiCall(`api/Management/getTechnitianDetails`)
      return mapTechnicianDetails(data)
    },

    GetTechnitianDetailsByTechCode: async (techCode: string): Promise<TechnicianDetailsByTechCode> => {
      console.log("12. Fetching Technician Details By Tech Code...")
      return await apiCall(`api/Management/GetTechnitianDetailsByTechCode?techCode=${techCode}`)
    },

    GetTechnitianPendingJobs: async (techCode: string): Promise<PendingJob[]> => {
      console.log("13. Fetching Technician Pending Jobs...")
      const data: JobDto[] = await apiCall(`api/Management/GetTechnitianPendingJobs?techCode=${techCode}`)
      return data.map(mapJobDtoToPendingJob)
    },

    GetTechnitianPendingServices: async (
      techCode: string,
      firstday: string,
      lastday: string
    ): Promise<ServiceVisit[]> => {
      console.log("14. Fetching Technician Pending Services...")
      const data: ServiceScheduleDto[] = await apiCall(
        `api/Management/GetTechnitianPendingServices?techCode=${techCode}&firstday=${firstday}&lastday=${lastday}`
      )
      return mapServiceSchedulesToServiceVisits(data)
    },

    // 15. All Jobs for a technician
    getTechnitianAllJobs: async (techCode: string): Promise<Job[]> => {
      console.log("15. Fetching Technician All Jobs...")
      const data = await apiCall(`api/Management/getTechnitianAllJobs?techCode=${techCode}`)
      return mapBreakdownsToJobs(data)
    },

    // 16. All Services for a technician (date-ranged)
    getTechnitianAllServices: async (
      techCode: string,
      firstday: string,
      lastday: string
    ): Promise<ServiceVisit[]> => {
      console.log("16. Fetching Technician All Services...")
      const data: ServiceScheduleDto[] = await apiCall(
        `api/Management/GetTechnitianAllServices?techCode=${techCode}&firstday=${firstday}&lastday=${lastday}`
      )
      return mapServiceSchedulesToServiceVisits(data)
    },

    GetNSReportData: async (startDate: string, lastDate: string): Promise<any[]> => {
      console.log("17. Fetching NS Report Data...")
      // Uses the normal apiCall which auto-parses JSON
      return await apiCall(`api/Report/getNSReportData?startDate=${startDate}&lastDate=${lastDate}`)
    },
    
    downloadNSReportExcel: async (startDate: string, lastDate: string): Promise<Blob> => {
      console.log("18. Downloading NS Report Excel...")
      // Uses apiCallRaw so we get the raw Response and can call .blob()
      const response = await apiCallRaw(
        `api/Report/downloadNSReportExcel?startDate=${startDate}&lastDate=${lastDate}`
      )
      return await response.blob()
    },
    
    downloadNSReportPdf: async (startDate: string, lastDate: string): Promise<Blob> => {
      console.log("19. Downloading NS Report PDF...")
      const response = await apiCallRaw(
        `api/Report/downloadNSReportPdf?startDate=${startDate}&lastDate=${lastDate}`
      )
      return await response.blob()
    },
    getFSReportData: async (startDate: string, lastDate: string): Promise<any[]> => {
      console.log("20. Fetching FS Report Data...")
      return await apiCall(`api/Report/getFSReportData?startDate=${startDate}&lastDate=${lastDate}`)
    },
    downloadFSReportExcel: async (startDate: string, lastDate: string): Promise<Blob> => {
      console.log("21. Downloading FS Report Excel...")
      const response = await apiCallRaw(
        `api/Report/downloadFSReportExcel?startDate=${startDate}&lastDate=${lastDate}`
      )
      return await response.blob()
    },
    downloadFSReportPdf: async (startDate: string, lastDate: string): Promise<Blob> => {
      console.log("22. Downloading FS Report PDF...")
      const response = await apiCallRaw(
        `api/Report/downloadFSReportPdf?startDate=${startDate}&lastDate=${lastDate}`
      )
      return await response.blob()  
    }
    ,
    GetMaReportData: async (startDate: string, lastDate: string): Promise<any[]> => {
      console.log("23. Fetching MA Report Data...")
      return await apiCall(`api/Report/getMaReportData?startDate=${startDate}&lastDate=${lastDate}`)
    },
    downloadMAReportExcel: async (startDate: string, lastDate: string): Promise<Blob> => {
      console.log("24. Downloading MA Report Excel...")
      const response = await apiCallRaw(
        `api/Report/downloadMAReportExcel?startDate=${startDate}&lastDate=${lastDate}`
      )
      return await response.blob()
    } ,
    downloadMAReportPdf: async (startDate: string, lastDate: string): Promise<Blob> => {
      console.log("25. Downloading MA Report PDF...")
      const response = await apiCallRaw(
        `api/Report/downloadMAReportPdf?startDate=${startDate}&lastDate=${lastDate}`
      )
      return await response.blob()    
    },
    GetExReportData: async (startDate: string, lastDate: string): Promise<any[]> => {
      console.log("26. Fetching EX Report Data...")
      return await apiCall(`api/Report/getExReportData?startDate=${startDate}&lastDate=${lastDate}`)
    },
    downloadEXReportExcel: async (startDate: string, lastDate: string): Promise<Blob> => {
      console.log("27. Downloading EX Report Excel...")
      const response = await apiCallRaw(
        `api/Report/downloadEXReportExcel?startDate=${startDate}&lastDate=${lastDate}`
      )
      return await response.blob()
    },
    downloadEXReportPdf: async (startDate: string, lastDate: string): Promise<Blob> => {
      console.log("28. Downloading EX Report PDF...")
      const response = await apiCallRaw(
        `api/Report/downloadEXReportPdf?startDate=${startDate}&lastDate=${lastDate}`
      )
      return await response.blob()  
    },
    GetDailyJobReportData: async (startDate: string, lastDate: string): Promise<any[]> => {
      console.log("29. Fetching Daily Job Report Data...")
      return await apiCall(`api/Report/getDailyJobReportData?startDate=${startDate}&lastDate=${lastDate}`)
    },
    downloadDailyJobReportExcel: async (startDate: string, lastDate: string): Promise<Blob> => {
      console.log("30. Downloading Daily Job Report Excel...")
      const response = await apiCallRaw(
        `api/Report/downloadDailyJobReportExcel?startDate=${startDate}&lastDate=${lastDate}`
      )
      return await response.blob()
    },
    downloadDailyReportReportPdf: async (startDate: string, lastDate: string): Promise<Blob> => {
      console.log("31. Downloading Daily Job Report PDF...")  
      const response = await apiCallRaw(
        `api/Report/downloadDailyReportReportPdf?startDate=${startDate}&lastDate=${lastDate}`
      )
      return await response.blob()  
    },
    getCustomerReportData: async (): Promise<any[]> => {
      console.log("32. Fetching Customer Report Data...")
      return await apiCall(`api/Report/getCustomerReportData`)
    },
    downloadCustomerReportExcel: async (): Promise<Blob> => {
      console.log("33. Downloading Customer Report Excel...")
      const response = await apiCallRaw(`api/Report/downloadCustomerReportExcel`)
      return await response.blob()
    },
    downloadCustomerReportPdf: async (): Promise<Blob> => {
      console.log("34. Downloading Customer Report PDF...")
      const response = await apiCallRaw(`api/Report/downloadCustomerReportPdf`)
      return await response.blob()  
    },
    getCustomerMachineData: async (customerCode: string): Promise<any[]> => {
      console.log("35. Fetching Customer Machine Data...")
      return await apiCall(`api/Report/getCustomerMachineData?customerCode=${customerCode}`)
    },
  }
}
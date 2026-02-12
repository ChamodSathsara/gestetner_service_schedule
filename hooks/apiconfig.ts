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
  type?:string
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
  type?:string
}

interface ReCallObj {
  techCode: string | undefined
  recallReason: string,
  recallDate: string,
  rowID: number,
  visitNo: number,
  isRecall: boolean,
  onSite: boolean
}

interface RecallJob {
  techCode: string,
  jobId: number,
  note: string,
  reason: string, // Include recall reason if applicable

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
  
}

interface getServicePayload {
  serialNo: string
  visitNo: number
  rowId: number
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
}

// Breakdown update payload
interface BreakdownUpdatePayload {
  techCode: string
  jobId: number
  machineRefNo: string
  serialNo: string
  jobStatus: 'started' | 'COMPLETED'
  note: string
  solutionCategory?:any
  recallReason?:string
}

interface CustomerFeedBack {
  feedback : string
  feedbackCount : number
  mobileNo : string
  customerName : string
  jobId : string
  rowId : number
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
  solutionCategory?:any
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

// Main Mapping Function
export const mapJobsBySerialNo = (data: any[]): Job[] => {
  if (!Array.isArray(data)) return [];

  return data.map((item, index) => ({
    // Auto Increment ID (1,2,3...)
    id: (index + 1).toString(),
    // Job ID
    jobId: item.dJ_ID,
    // Date
    date: item.dJ_DATE,
    // Location Combined
    location: `${item.cuS_ADD1 || ""} ${item.cuS_ADD2 || ""} ${
      item.cuS_ADD3 || ""
    }`.trim(),

    // Description
    description: item.note,
    // Customer Name
    customerName: item.cuS_NAME,
    // Status
    status: item.joB_STATUS,
    // Note
    note: item.note,
    // Customer Agreement Mapping
    customer_agreement: mapCustomerAgreement(item.cuS_STATUS),
    // Machine Ref No
    machineRefNo: item.machinE_REF_NO,
    // Technician Name
    technicianName: item.teaM_NAME,
  }));
};

export const mapJobsBySerialNoJobObj = (item: any): Job => {
  return {
    // Auto ID (you can change this)
    id: "1",
    // Job ID
    jobId: item.dJ_ID,
    // Date
    date: item.dJ_DATE,
    // Location Combined
    location: `${item.cuS_ADD1 || ""} ${item.cuS_ADD2 || ""} ${
      item.cuS_ADD3 || ""
    }`.trim(),
    // Description
    description: item.note,
    // Customer Name
    customerName: item.cuS_NAME,
    // Status
    status: item.joB_STATUS,
    // Note
    note: item.note,
    // Agreement Mapping
    customer_agreement: mapCustomerAgreement(item.cuS_STATUS),
    // Machine Ref No
    machineRefNo: item.machinE_REF_NO,
    // Technician Name
    technicianName: item.teaM_NAME,
  };
};

const mapJobStatus = (jobStatus: string): string => {
    console.log("Mapping job status:", jobStatus);
  const statusMap: { [key: string]: string } = {
    'TECH ALLOCATED': 'pending',
    'STARTED': 'started',
    'COMPLET': 'completed'
    
    
  }
  if(jobStatus === null || jobStatus === undefined){
    return 'pending';
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
    // location: breakdown.cuS_ADD1,
     location: `${breakdown.cuS_ADD1 || ""} ${breakdown.cuS_ADD2 || ""} ${
      breakdown.cuS_ADD3 || ""
    }`.trim(),
    description: breakdown.note,
    customerName: breakdown.cuS_NAME,
    status: mapJobStatus(breakdown.joB_STATUS),
    // status: breakdown.joB_STATUS.toLowerCase(),
    note: breakdown.note,
    customer_agreement: mapCustomerAgreement(breakdown.cuS_STATUS),
    phone_number: breakdown.cuS_TEL_NO,
    machineRefNo: breakdown.machinE_REF_NO,
    serialNo: breakdown.seriaL_NO,
    type:breakdown.type
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
  const diffTime =  visitDate.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

const MapRecallService = (data: any[]): any[] => {
  return data.map((visit) => ({
    id: visit.rowId.toString(),
    jobId: visit.rowId.toString(),
    serialNo: visit.serialNo,
    customerName: visit.customerName,
    date: visit.expectedVisitDate,
    location: `${visit.machineLocation01 || ""} ${visit.machineLocation02 || ""} ${
      visit.machineLocation03 || ""
    }`.trim(),
    daysLeft: calculateDaysLeft(visit.expectedVisitDate),
    status: mapJobStatus(visit.serviceStatus),
    phone_number: visit.customerTelephone,
    expected_visit_no: mapExpectedVisitNo(visit.expectedVisitNo),
    machineRefNo: visit.machineRefNo
  }));
};

const mapServiceVisit = (visit: ApiServiceVisit): ServiceVisit => {
  return {
    id: visit.rowId.toString(),
    jobId: visit.rowId.toString(),
    serialNo:visit.serialNo,
    customerName: visit.customerName,
    date: visit.expectedVisitDate,
    // location: visit.machineLocation01,
     location: `${visit.machineLocation01 || ""} ${visit.machineLocation02 || ""} ${
      visit.machineLocation03 || ""
    }`.trim(),
    daysLeft: calculateDaysLeft(visit.expectedVisitDate),
    // status: visit.visitStatus.toLowerCase(),
    status: mapJobStatus(visit.visitStatus),
    phone_number: visit.customerTelephone,
    expected_visit_no: mapExpectedVisitNo(visit.expectedVisitNo),
    machineRefNo: visit.machineRefNo
  }
}

const mapNew = (visit: any[]) => {
  return {
    ...visit[0]
  }
}

const mapServiceVisits = (visits: ApiServiceVisit[]): ServiceVisit[] => {
  console.log("Mapping service visits:", visits);;
  return visits.map(mapServiceVisit)
}

export const useApiConfig = () => {
  const { user } = useAuth()
  const [showUnauthorizedDialog, setShowUnauthorizedDialog] = useState(false)

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

 // Check for unauthorized errors
    if (response.status === 401 || response.status === 403) {
      setShowUnauthorizedDialog(true)
      throw new Error('Unauthorized access')
    }

    console.log(response.status, "", response.statusText );
    if (!response.ok ) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`)
    }
    const res = method === 'GET' ? await response.json() : response;
    console.log(res);
    return res;
  }

  const apiCallWithoutToken = async (endpoint: string, method: 'GET' | 'POST' = 'GET', body?: any) => {

    const config: RequestInit = {
      method,
      headers: {
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
    const res = method === 'GET' ? await response.json() : response;
    console.log(res);
    return res;
  }


  return {
    showUnauthorizedDialog,
    setShowUnauthorizedDialog,
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
      console.log("raw",data);
      return mapServiceVisits(data)
    },

    updateServiceVisitStatus: async (payload: ServiceUpdatePayload) => {
      console.log("updateServiceVisitStatus payload", payload);
      const test = await apiCall('api/Service/updateservicevisit', 'POST', payload);
        
      return test;    
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
      const data =  await apiCall(`api/Breakdown/getperformance?techCode=${user?.tecH_CODE}`)
      console.log("Performance Data:", data);
      return data;
    },

    // 6. Previous Service Lists
    getPreviousServiceLists: async (machineRef: string): Promise<ServiceVisit[]> => {
      const data = await apiCall(`api/Service/previousservicelists?techCode=${user?.tecH_CODE}&machineRefNo=${machineRef}`)
      // console.log("Previous Service Lists Datacaddsadasdsadadada===============++++++++++++:",machineRef, data);
      return data[0];
    },

    getDueJobs : async () => {
      const data = await apiCall(`api/Service/alltimedueservices?techCode=${user?.tecH_CODE}`)
      console.log("Due Jobs Data:", data);
      return data;
    },

    getServicesBySerialNo : async (serialNo: string) => {
      // const data =  apiCall(`api/Service/alltimedueservices?techCode=${user?.tecH_CODE}`)
      const data2 = await apiCall(`api/customerfeedback/getServicesWithSerial?serialNo=${serialNo}`)
      console.log("Services By Serial No Data:", data2);
      return data2;
    },

    getJobsBySerialNo : async (serialNo: string) => {
      // const data =  apiCall(`api/Service/alltimedueservices?techCode=${user?.tecH_CODE}`)
      const data = await apiCall(`api/customerfeedback/getBreakdownListsForLastYear?serialno=${serialNo}`)
      console.log("Jobs By Serial No Data:", data);
      const newData = mapJobsBySerialNo(data);
      return newData;
    },

    getServiceBySerialNoAndMachineNo : async (payload: getServicePayload) => {
      const data =  await apiCallWithoutToken(`api/customerfeedback/getServiceByRowID?serialNo=${payload.serialNo}&rowId=${payload.rowId}&visitNo=${payload.visitNo+1}`)
      // const data2 = await apiCallNew(`api/customerfeedback/getServiceByRowID` , 'GET' ,payload )
      console.log("Services By Serial No Data:", data);
      const newData = mapNew(data);
      return newData;
    },

    getJobBySerialNoAndMachineNo : async (serialNo : string, jobID: string) => {
      const data =  await apiCallWithoutToken(`api/customerfeedback/getJobsWithSerial?serialNo=${serialNo}&jobID=${jobID}`)
      console.log("Jobs By Serial No Data:", data);
      const newData = mapJobsBySerialNoJobObj(data);
      console.log("Mapped Job Data:", newData);
      return newData;
    },

    addFeedback: async (payload: CustomerFeedBack) => {
      console.log("Added Customer Feedback payload", payload);
      const test = await apiCallWithoutToken('api/customerfeedback/addCustomerReview', 'POST', payload); 
      return test;    
    },

    addRecall: async (payload: ReCallObj) => {
      console.log("Added Customer Feedback payload", payload);
      payload.techCode = user?.tecH_CODE
      console.log(payload);
      const test = await apiCall('api/ScheduleRecall/recallPreviousSchedule', 'POST', payload); 
      return test;    
    },

    allTimeDueJobs: async (): Promise<Job[]> => {
      const data = await apiCall(`api/jobRecall/getAllLastYearsJobs?techCode=${user?.tecH_CODE}`)
      console.log(data," _________________+++++++++++++++++++++++=========")
      return mapBreakdownsToJobs(data)
    },

    resetPassword: async (newPassword:string) => {
      const test = await apiCall(`api/auth/resetPassword?techCode=${user?.tecH_CODE}`, 'POST', newPassword);  
      return test;
    },

    getSolutionCategories: async (): Promise<any[]> => {
      const data = await apiCall(`api/breakdown/solutionCategories`)
      return data;
     
    },
    addRecallJob: async (payload:RecallJob) => {

      const test = await apiCall('api/jobRecall/recallJob', 'POST', payload); 
      return test;    
    },
    getRecallServices: async (): Promise<any[]> => {
      const data = await apiCall(`api/scheduleRecall/getAllRecallServices?techCode=${user?.tecH_CODE}`);
      const newData = MapRecallService(data);
      return newData;
    },
    getRecallJobs: async (): Promise<any[]> => {
      const data = await apiCall(`api/jobRecall/getallRecallJobs?techCode=${user?.tecH_CODE}`)
      console.log("______________________________",data);
      return mapBreakdownsToJobs(data)
     
    },
  }
}


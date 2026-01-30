// types.ts - Type definitions for the Customer Review System
export interface ServiceOrJob {
  id: string;
  jobId: string;
  date: string;
  location: string;
  description?: string;
  customerName?: string;
  status: string;
  note?: string;
  customer_agreement?: string;
  machineRefNo?: string;
  technician_name: string;
}

export interface Machine {
  id: string;
  machineNumber: string;
  machineName: string;
  model?: string;
  services: ServiceOrJob[];
  jobs: ServiceOrJob[];
}

export interface Review {
  id: string;
  itemId: string;
  itemType: 'service' | 'job';
  rating: number;
  message: string;
  createdAt: string;
  customerName?: string;
}

export type TabType = 'services' | 'jobs';

export interface ReviewFormData {
  rating: number;
  message: string;
}
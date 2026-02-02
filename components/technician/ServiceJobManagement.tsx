import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Clock, Calendar, ChevronRight, Phone, Hash, FileText, Bell } from "lucide-react";
import { useApiConfig } from '@/hooks/apiconfig';
import { Loading, LoadingDots, LoadingPulse } from './Loading'

// Type Definitions
interface Service {
  id: string;
  jobId: string;
  customerName: string;
  phone_number: string;
  location: string;
  machineRefNo: string;
  date: string;
  daysLeft: number;
  expected_visit_no: number;
  status: 'completed' | 'pending' | 'overdue';
}

interface Job {
  id: string;
  jobId: string;
  customerName: string;
  phone_number: string;
  location: string;
  machineRefNo: string;
  serialNo: string;
  customer_agreement: string;
  date: string;
  description: string;
  note: string;
  status: 'pending' | 'completed' | 'in-progress';
}

interface Due {
  machineRefNo: string;
  expectedVisitNo: string;
  expectedVisitDate: string; // ISO date string
  expectedVisitCount: number;
  visitStatus: string | null;

  rowId: number;
  customerID: string;
  customerName: string;

  contactPerson: string;
  customerTelephone: string;

  machineLocation01: string;
  machineLocation02: string;
  machineLocation03: string;
}


type ItemType = 'service' | 'job';

interface SelectedItem extends Partial<Service & Job> {
  type: ItemType;
}

interface ServiceCardProps {
  service: Service;
  onClick: () => void;
}

interface JobCardProps {
  job: Job;
  onClick: () => void;
}

interface DueCardProps {
  due: Due;
  onRecall: (due: Due) => void;
}

interface DetailsDialogProps {
  item: SelectedItem | null;
  type: ItemType | undefined;
  isOpen: boolean;
  onClose: () => void;
  onRecall: (item: Service | Job) => void;
}

interface RecallDialogProps {
  item: Service | Job | Due | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (item: Service | Job | Due, reason: string , isOnSite: boolean) => void;
  isOnSite: boolean;
}

type TabType = 'services' | 'jobs' | 'dues';

// Mock data
// const mockServices: Service[] = [
//   {
//     id: "268010",
//     jobId: "268010",
//     customerName: "Pamuditha Tillekeratne",
//     phone_number: "0713304911",
//     location: "Wadduwa",
//     machineRefNo: "Q454545",
//     date: "2026-01-16T00:00:00",
//     daysLeft: 7,
//     expected_visit_no: 1,
//     status: "completed"
//   },
//   {
//     id: "268011",
//     jobId: "268011",
//     customerName: "Nimal Perera",
//     phone_number: "0771234567",
//     location: "Colombo",
//     machineRefNo: "Q454546",
//     date: "2026-01-20T00:00:00",
//     daysLeft: 3,
//     expected_visit_no: 2,
//     status: "pending"
//   }
// ];

// const mockJobs: Job[] = [
//   {
//     id: "208299",
//     jobId: "208299",
//     customerName: "Pamuditha Tillekeratne",
//     phone_number: "713304911",
//     location: "Wadduwa",
//     machineRefNo: "Q454545",
//     serialNo: "DE1000",
//     customer_agreement: "Free Service",
//     date: "2026-01-23T00:00:00",
//     description: "FS-Q454545-",
//     note: "FS-Q454545-",
//     status: "pending"
//   },
//   {
//     id: "208300",
//     jobId: "208300",
//     customerName: "Kamal Silva",
//     phone_number: "0779876543",
//     location: "Galle",
//     machineRefNo: "Q454547",
//     serialNo: "DE1001",
//     customer_agreement: "Warranty",
//     date: "2026-01-25T00:00:00",
//     description: "Repair work needed",
//     note: "Urgent repair",
//     status: "pending"
//   }
// ];


// Service Card Component
function ServiceCard({ service, onClick }: ServiceCardProps) {
  return (
    <Card
      className="bg-white border border-gray-200 hover:border-blue-300 shadow-sm hover:shadow transition-all cursor-pointer"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-base text-gray-900 mb-1">
              {service.jobId}
            </h3>
            <p className="text-sm text-gray-600 truncate">
              {service.customerName}
            </p>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
        </div>

        <div className="space-y-2 mb-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4 text-gray-400" />
            <span className="truncate">{service.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Hash className="w-4 h-4 text-gray-400" />
            <span>{service.machineRefNo}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-2 text-xs text-gray-700">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span>Visit {service.expected_visit_no}</span>
            <span className="text-gray-400">•</span>
            <span>{service.daysLeft} days left</span>
          </div>
          
          <span className={`
            text-xs font-medium px-2.5 py-1 rounded-full
            ${service.status === 'completed' 
              ? 'bg-green-50 text-green-700' 
              : 'bg-blue-50 text-blue-700'
            }
          `}>
            {service.status}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

// Job Card Component
function JobCard({ job, onClick }: JobCardProps) {
  return (
    <Card
      className="bg-white border border-gray-200 hover:border-orange-300 shadow-sm hover:shadow transition-all cursor-pointer"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-base text-gray-900 mb-1">
              {job.jobId}
            </h3>
            <p className="text-sm text-gray-600 truncate">
              {job.customerName}
            </p>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
        </div>

        <div className="space-y-2 mb-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4 text-gray-400" />
            <span className="truncate">{job.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="w-4 h-4 text-gray-400" />
            <span>{job?.customerName}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <FileText className="w-4 h-4 text-gray-400" />
            <span className="truncate max-w-[150px]">{job.description}</span>
          </div>
          
          <span className={`
            text-xs font-medium px-2.5 py-1 rounded-full
            ${job.status === 'pending' 
              ? 'bg-orange-50 text-orange-700' 
              : 'bg-gray-50 text-gray-700'
            }
          `}>
            {job.status}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

const getOverdueDays = (date: string | Date): number => {
  const dueDate = new Date(date).getTime();
  const now = Date.now();

  return Math.max(
    0,
    Math.ceil((now - dueDate) / (1000 * 60 * 60 * 24))
  );
};


// Due Card Component
function DueCard({ due, onRecall }: DueCardProps) {
  return (
    <Card className="bg-red-50 border border-red-200 shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-base text-gray-900 mb-1">
              {due.machineRefNo}
            </h3>
            <p className="text-sm text-gray-600 truncate">
              {due.customerName}
            </p>
          </div>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onRecall(due);
            }}
            size="sm"
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            <Bell className="w-4 h-4 mr-1" />
            Recall
          </Button>
        </div>

        <div className="space-y-2 mb-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4 text-gray-400" />
            <span className="truncate">{due.machineLocation01}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Phone className="w-4 h-4 text-gray-400" />
            <span>{due.contactPerson}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-red-200">
          <div className="text-xs text-red-700 font-medium">
            Overdue by {getOverdueDays(due.expectedVisitDate)} days
          </div>
          
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-red-100 text-red-700">
            Overdue
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

// Details Dialog Component
function DetailsDialog({ item, type, isOpen, onClose, onRecall }: DetailsDialogProps) {
  const isOverdue = item?.daysLeft !== undefined && item.daysLeft < 0;
  const showRecall = item?.status === 'pending' && isOverdue;

  if (!item) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {type === 'service' ? 'Service' : 'Job'} Details
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Job ID</p>
              <p className="font-semibold text-gray-900">{item.jobId}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Status</p>
              <span className={`
                inline-block text-xs font-medium px-2.5 py-1 rounded-full
                ${item.status === 'completed' 
                  ? 'bg-green-50 text-green-700' 
                  : item.status === 'pending'
                  ? 'bg-orange-50 text-orange-700'
                  : 'bg-gray-50 text-gray-700'
                }
              `}>
                {item.status}
              </span>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-1">Customer Name</p>
            <p className="font-medium text-gray-900">{item.customerName}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-1">Phone Number</p>
            <p className="font-medium text-gray-900">{item.phone_number}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-1">Location</p>
            <p className="font-medium text-gray-900">{item.location}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-1">Machine Ref No</p>
            <p className="font-medium text-gray-900">{item.machineRefNo}</p>
          </div>

          {type === 'job' && (
            <>
              <div>
                <p className="text-sm text-gray-500 mb-1">Serial No</p>
                <p className="font-medium text-gray-900">{item.serialNo}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Customer Agreement</p>
                <p className="font-medium text-gray-900">{item.customer_agreement}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Description</p>
                <p className="font-medium text-gray-900">{item.description}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Note</p>
                <p className="font-medium text-gray-900">{item.note}</p>
              </div>
            </>
          )}

          {type === 'service' && (
            <>
              <div>
                <p className="text-sm text-gray-500 mb-1">Expected Visit No</p>
                <p className="font-medium text-gray-900">{item.expected_visit_no}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Days Left</p>
                <p className={`font-medium ${isOverdue ? 'text-red-600' : 'text-gray-900'}`}>
                  {item.daysLeft} days {isOverdue ? '(Overdue)' : ''}
                </p>
              </div>
            </>
          )}

          <div>
            <p className="text-sm text-gray-500 mb-1">Date</p>
            <p className="font-medium text-gray-900">
              {item.date ? new Date(item.date).toLocaleDateString() : 'N/A'}
            </p>
          </div>
        </div>

        <DialogFooter className="flex gap-2">
          <Button onClick={onClose} variant="outline" className="flex-1">
            Close
          </Button>
          {showRecall && (
            <Button 
              onClick={() => {
                onClose();
                onRecall(item as Service | Job);
              }}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white"
            >
              <Bell className="w-4 h-4 mr-2" />
              Recall
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Recall Dialog Component
function RecallDialog({ item, isOpen, onClose, onSubmit }: RecallDialogProps) {
  const [reason, setReason] = useState<string>('');
  const [isOnSite, setIsOnSite] = useState<boolean>(false);

  const handleSubmit = () => {
    if (reason.trim() && item) {
      onSubmit(item, reason, isOnSite); // include isOnSite in submission
      setReason('');
      setIsOnSite(false);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Recall Job</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div>
            <p className="text-sm text-gray-600 mb-1">
              Job ID: <span className="font-semibold text-gray-900">{item?.machineRefNo}</span>
            </p>
            <p className="text-sm text-gray-600">
              Customer: <span className="font-semibold text-gray-900">{item?.customerName}</span>
            </p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Are you on site?
            </label>
            <div className="flex flex-col gap-2">
              <label className="inline-flex items-center gap-2">
                <input
                  type="radio"
                  name="onSite"
                  value="yes"
                  checked={isOnSite === true}
                  onChange={() => setIsOnSite(true)}
                />
                Yes
              </label>
              <label className="inline-flex items-center gap-2">
                <input
                  type="radio"
                  name="onSite"
                  value="no"
                  checked={isOnSite === false}
                  onChange={() => setIsOnSite(false)}
                />
                No
              </label>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Reason for Recall
            </label>
            <Textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Enter the reason for recalling this job..."
              className="min-h-[120px]"
            />
          </div>
        </div>

        <DialogFooter className="flex gap-2">
          <Button onClick={onClose} variant="outline" className="flex-1">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!reason.trim() || !isOnSite}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white"
          >
            <Bell className="w-4 h-4 mr-2" />
            Recall
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}


// Main Component
export default function ServiceJobManagement() {
  const [activeTab, setActiveTab] = useState<TabType>('services');
  const [selectedItem, setSelectedItem] = useState<SelectedItem | any>(null);
  const [detailsOpen, setDetailsOpen] = useState<boolean>(false);
  const [recallOpen, setRecallOpen] = useState<boolean>(false);
  const [recallItem, setRecallItem] = useState<Service | Job | Due | null>(null);
  const { getAllBreakdownsList, getAllServiceList , getDueJobs } = useApiConfig()
  const [loading, setLoading] = useState<boolean>(false);
  const [breakdownsList, setBreakdownsList] = useState<Job[] | any >([]);
  const [servicesList, setServicesList] = useState<Service[] | any>([]);
  const [duesList, setDuesList] = useState<Due[] | any>([]);

  const fetchBreakdownsList = async () => {
    try {
      setLoading(true)
      const mappedJobs = await getAllBreakdownsList() // Already mapped!
      setBreakdownsList(mappedJobs)
      console.log("mappedJobs", mappedJobs)
    } catch (error) {
      console.error('Error fetching breakdowns:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchDuesList = async () => {
    try {
      setLoading(true)
      const data = await getDueJobs();
      setDuesList(data)
      console.log("Dues List", data)
    } catch (error) {
      console.error('Error fetching dues:', error)
    }finally {
      setLoading(false)
    }
  }

  const fetchServicesList = async () => {
    try {
      setLoading(true)
      const mappedServices = await getAllServiceList() 
      setServicesList(mappedServices)
      console.log("mappedServices List", mappedServices)
    } catch (error) {
      console.error('Error fetching services:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(()=>{
    fetchBreakdownsList();
    fetchServicesList();
    fetchDuesList();
  },[]);



  const handleViewDetails = (item: Service | Job, type: ItemType) => {
    setSelectedItem({ ...item, type });
    setDetailsOpen(true);
  };

  const handleRecallClick = (item: Service | Job | Due) => {
    setRecallItem(item);
    setRecallOpen(true);
  };

  const handleRecallSubmit = (item: Service | Job | Due, reason: string) => {
    console.log('Recall submitted:', { item, reason });
    // Handle recall submission here
  };

    if (loading) {
  return <Loading fullScreen message="Loading dashboard data..." />
}

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4">
      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        <Button
          variant="ghost"
          onClick={() => setActiveTab('services')}
          className={`rounded-none border-b-2 ${
            activeTab === 'services'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-600'
          }`}
        >
          All Services
        </Button>
        <Button
          variant="ghost"
          onClick={() => setActiveTab('jobs')}
          className={`rounded-none border-b-2 ${
            activeTab === 'jobs'
              ? 'border-orange-600 text-orange-600'
              : 'border-transparent text-gray-600'
          }`}
        >
          All Jobs
        </Button>
        <Button
          variant="ghost"
          onClick={() => setActiveTab('dues')}
          className={`rounded-none border-b-2 ${
            activeTab === 'dues'
              ? 'border-red-600 text-red-600'
              : 'border-transparent text-gray-600'
          }`}
        >
          All Dues
        </Button>
      </div>

      {/* Content */}
      <div className="space-y-3">
        {activeTab === 'services' && (
          <>
            {servicesList.map((service: Service, idx: number) => (
              <ServiceCard
                key={`${service.id}-${idx}`}
                service={service}
                onClick={() => handleViewDetails(service, 'service')}
              />
            ))}
          </>
        )}

        {activeTab === 'jobs' && (
          <>
            {breakdownsList.map((job: Job, idx: number) => (
              <JobCard
                key={`${job.id}-${idx}`}
                job={job}
                onClick={() => handleViewDetails(job, 'job')}
              />
            ))}
          </>
        )}

        {activeTab === 'dues' && (
          <>
            {duesList.map((due:any, idx: number) => (
              <DueCard
                key={`${due.id}-${idx}`}
                due={due}
                onRecall={handleRecallClick}
              />
            ))}
          </>
        )}
      </div>

      {/* Dialogs */}
      <DetailsDialog
        item={selectedItem}
        type={selectedItem?.type}
        isOpen={detailsOpen}
        onClose={() => {
          setDetailsOpen(false);
          setSelectedItem(null);
        }}
        onRecall={handleRecallClick}
      />

      <RecallDialog
        item={recallItem}
        isOpen={recallOpen}
        onClose={() => {
          setRecallOpen(false);
          setRecallItem(null);
        }}
        isOnSite={false}
        onSubmit={handleRecallSubmit}
      />
    </div>
  );
}
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  MapPin,
  Clock,
  Calendar,
  ChevronRight,
  Phone,
  Hash,
  FileText,
  Bell,
  Search,
  X,
} from "lucide-react";
import { useApiConfig } from "@/hooks/apiconfig";
import { Loading, LoadingDots, LoadingPulse } from "./Loading";
import UnauthorizedDialog from "./UnauthorizedDialog";
import RecallCard from "./RecallCard";

// Type Definitions
interface Service {
  id: string;
  jobId: string;
  customerName: string;
  serviceDate?: string;
  phone_number: string;
  location: string;
  machineRefNo: string;
  date: string;
  daysLeft: number;
  expected_visit_no: number;
  status: "completed" | "pending" | "overdue";
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
  status: "pending" | "completed" | "in-progress";
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

type ItemType = "service" | "job";

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

type TabType = "services" | "jobs" | "dues";

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
            <span>
              {service.status === "completed"
                ? `${service.serviceDate}`
                : `${service.daysLeft} days left`}
            </span>
          </div>

          <span
            className={`
            text-xs font-medium px-2.5 py-1 rounded-full
            ${
              service.status === "completed"
                ? "bg-green-50 text-green-700"
                : "bg-blue-50 text-blue-700"
            }
          `}
          >
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
            <p className="text-sm text-gray-600 truncate">{job.customerName}</p>
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

          <span
            className={`
            text-xs font-medium px-2.5 py-1 rounded-full
            ${
              job.status === "pending"
                ? "bg-orange-50 text-orange-700"
                : "bg-gray-50 text-gray-700"
            }
          `}
          >
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

  return Math.max(0, Math.ceil((now - dueDate) / (1000 * 60 * 60 * 24)));
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
            <p className="text-sm text-gray-600 truncate">{due.customerName}</p>
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
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span>
              {new Date(due.expectedVisitDate).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Hash className="w-4 h-4 text-gray-400" />
            <span>Visit No. {due.expectedVisitNo}</span>
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
function DetailsDialog({
  item,
  type,
  isOpen,
  onClose,
  onRecall,
}: DetailsDialogProps) {
  const isOverdue = item?.daysLeft !== undefined && item.daysLeft < 0;
  const showRecall = item?.status === "pending" && isOverdue;

  if (!item) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {type === "service" ? "Service" : "Job"} Details
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
              <span
                className={`
                inline-block text-xs font-medium px-2.5 py-1 rounded-full
                ${
                  item.status === "completed"
                    ? "bg-green-50 text-green-700"
                    : item.status === "pending"
                      ? "bg-orange-50 text-orange-700"
                      : "bg-gray-50 text-gray-700"
                }
              `}
              >
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

          {type === "job" && (
            <>
              <div>
                <p className="text-sm text-gray-500 mb-1">Serial No</p>
                <p className="font-medium text-gray-900">{item.serialNo}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Customer Agreement</p>
                <p className="font-medium text-gray-900">
                  {item.customer_agreement}
                </p>
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

          {type === "service" && (
            <>
              <div>
                <p className="text-sm text-gray-500 mb-1">Expected Visit No</p>
                <p className="font-medium text-gray-900">
                  {item.expected_visit_no}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Days Left</p>
                <p
                  className={`font-medium ${isOverdue ? "text-red-600" : "text-gray-900"}`}
                >
                  {item.daysLeft} days {isOverdue ? "(Overdue)" : ""}
                </p>
              </div>
            </>
          )}

          <div>
            <p className="text-sm text-gray-500 mb-1">Date</p>
            <p className="font-medium text-gray-900">
              {item.date ? new Date(item.date).toLocaleDateString() : "N/A"}
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

// Main Component
export default function ServiceJobManagement() {
  const [activeTab, setActiveTab] = useState<TabType>("services");
  const [selectedItem, setSelectedItem] = useState<SelectedItem | any>(null);
  const [detailsOpen, setDetailsOpen] = useState<boolean>(false);
  const [recallOpen, setRecallOpen] = useState<boolean>(false);
  const [recallItem, setRecallItem] = useState<Service | Job | Due | null>(
    null,
  );
  const {
    getAllBreakdownsList,
    getAllServiceList,
    getDueJobs,
    addRecall,
    showUnauthorizedDialog,
    setShowUnauthorizedDialog,
  } = useApiConfig();
  const [loading, setLoading] = useState<boolean>(false);
  const [breakdownsList, setBreakdownsList] = useState<Job[] | any>([]);
  const [servicesList, setServicesList] = useState<Service[] | any>([]);
  const [duesList, setDuesList] = useState<Due[] | any>([]);
  const [duesSearch, setDuesSearch] = useState<string>("");
  const [servicesSearch, setServicesSearch] = useState<string>("");
  const [jobsSearch, setJobsSearch] = useState<string>("");

  const fetchBreakdownsList = async () => {
    try {
      setLoading(true);
      const mappedJobs = await getAllBreakdownsList(); // Already mapped!
      setBreakdownsList(mappedJobs);
      console.log("mappedJobs", mappedJobs);
    } catch (error) {
      console.error("Error fetching breakdowns:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDuesList = async () => {
    try {
      setLoading(true);
      const data = await getDueJobs();
      setDuesList(data);
      console.log("Dues List", data);
    } catch (error) {
      console.error("Error fetching dues:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchServicesList = async () => {
    try {
      setLoading(true);
      const mappedServices = await getAllServiceList();
      setServicesList(mappedServices);
      console.log("mappedServices List", mappedServices);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBreakdownsList();
    fetchServicesList();
    fetchDuesList();
  }, []);

  const handleViewDetails = (item: Service | Job, type: ItemType) => {
    setSelectedItem({ ...item, type });
    setDetailsOpen(true);
  };

  const handleRecallClick = (item: Service | Job | Due) => {
    setRecallItem(item);
    setRecallOpen(true);
  };

  const handleRecallSubmit = (
    rowID: number,
    recallReason: string,
    recallDate: string,
    visitNo: number,
    isRecall: boolean,
    isOnSite: boolean,
  ) => {
    console.log("Recall submitted:", {
      rowID,
      recallReason,
      recallDate,
      visitNo,
      isRecall,
      isOnSite,
    });
    console.log("Recall Item Visit Number:", visitNo);

    // Handle recall submission here
    const payload = {
      rowID,
      recallReason,
      recallDate,
      visitNo,
      isRecall,
      onSite: isOnSite,
    };
    addRecallHandler(payload);
  };

  const addRecallHandler = async (payload: any) => {
    try {
      const response = await addRecall(payload);
      console.log("Recall added successfully:", response);
      window.location.reload();
    } catch (error) {
      console.error("Error adding recall:", error);
    }
  };

  if (loading) {
    return <Loading fullScreen message="Loading dashboard data..." />;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4">
      <UnauthorizedDialog
        isOpen={showUnauthorizedDialog}
        onClose={() => setShowUnauthorizedDialog(false)}
      />
      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        {/* last month services*/}
        <Button
          variant="ghost"
          onClick={() => setActiveTab("services")}
          className={`rounded-none border-b-2 ${
            activeTab === "services"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-600"
          }`}
        >
          All Services
        </Button>

        {/* last month jobs */}
        <Button
          variant="ghost"
          onClick={() => setActiveTab("jobs")}
          className={`rounded-none border-b-2 ${
            activeTab === "jobs"
              ? "border-orange-600 text-orange-600"
              : "border-transparent text-gray-600"
          }`}
        >
          All Jobs
        </Button>

        {/* all dues */}
        <Button
          variant="ghost"
          onClick={() => setActiveTab("dues")}
          className={`rounded-none border-b-2 ${
            activeTab === "dues"
              ? "border-red-600 text-red-600"
              : "border-transparent text-gray-600"
          }`}
        >
          All Dues
        </Button>
      </div>

      {/* Content */}
      <div className="space-y-3">
        {activeTab === "services" && (
          <>
            {/* Header */}
            <div className="flex items-center justify-between mb-1">
              <div>
                <h2 className="text-base font-semibold text-gray-800">
                  All Services
                </h2>
                <p className="text-xs text-gray-400">
                  Last month's service records
                </p>
              </div>
              <span className="text-xs font-medium bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full">
                {
                  servicesList.filter((s: Service) =>
                    servicesSearch.trim()
                      ? s.machineRefNo
                          .toLowerCase()
                          .includes(servicesSearch.toLowerCase())
                      : true,
                  ).length
                }{" "}
                records
              </span>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <input
                type="text"
                value={servicesSearch}
                onChange={(e) => setServicesSearch(e.target.value)}
                placeholder="Search by machine ref no..."
                className="w-full pl-9 pr-9 py-2 text-sm rounded-lg border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder:text-gray-400"
              />
              {servicesSearch && (
                <button
                  onClick={() => setServicesSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Result hint */}
            {servicesSearch.trim() && (
              <p className="text-xs text-gray-500 px-1">
                {
                  servicesList.filter((s: Service) =>
                    s.machineRefNo
                      .toLowerCase()
                      .includes(servicesSearch.toLowerCase()),
                  ).length
                }{" "}
                result(s) for{" "}
                <span className="font-semibold text-gray-700">
                  "{servicesSearch}"
                </span>
              </p>
            )}

            {/* Stats Summary Bar */}
            {(() => {
              const total = servicesList.length;
              const completed = servicesList.filter(
                (s: Service) => s.status === "completed",
              ).length;
              const pending = servicesList.filter(
                (s: Service) => s.status === "pending",
              ).length;
              const completedPct = total
                ? Math.round((completed / total) * 100)
                : 0;
              const pendingPct = total
                ? Math.round((pending / total) * 100)
                : 0;

              return (
                <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm space-y-3">
                  {/* Numbers Row */}
                  <div className="grid grid-cols-3 divide-x divide-gray-100 text-center">
                    <div className="pr-3">
                      <p className="text-xl font-bold text-gray-800">{total}</p>
                      <p className="text-xs text-gray-400 mt-0.5">Total</p>
                    </div>
                    <div className="px-3">
                      <p className="text-xl font-bold text-green-600">
                        {completed}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">Completed</p>
                    </div>
                    <div className="pl-3">
                      <p className="text-xl font-bold text-blue-500">
                        {pending}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">Pending</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div>
                    <div className="flex justify-between text-xs text-gray-500 mb-1.5">
                      <span>
                        Completed{" "}
                        <span className="font-semibold text-green-600">
                          {completedPct}%
                        </span>
                      </span>
                      <span>
                        Pending{" "}
                        <span className="font-semibold text-blue-500">
                          {pendingPct}%
                        </span>
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden flex">
                      <div
                        className="h-full bg-green-400 transition-all duration-500"
                        style={{ width: `${completedPct}%` }}
                      />
                      <div
                        className="h-full bg-blue-400 transition-all duration-500"
                        style={{ width: `${pendingPct}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Service Cards */}
            {servicesList
              .filter((service: Service) =>
                servicesSearch.trim()
                  ? service.machineRefNo
                      .toLowerCase()
                      .includes(servicesSearch.toLowerCase())
                  : true,
              )
              .map((service: Service, idx: number) => (
                <ServiceCard
                  key={`${service.id}-${idx}`}
                  service={service}
                  onClick={() => handleViewDetails(service, "service")}
                />
              ))}
          </>
        )}

        {activeTab === "jobs" && (
          <>
            {/* Header */}
            <div className="flex items-center justify-between mb-1">
              <div>
                <h2 className="text-base font-semibold text-gray-800">
                  All Jobs
                </h2>
                <p className="text-xs text-gray-400">
                  Last Month Breakdown / repair records
                </p>
              </div>
              <span className="text-xs font-medium bg-orange-50 text-orange-600 px-2.5 py-1 rounded-full">
                {
                  breakdownsList.filter((j: Job) =>
                    jobsSearch.trim()
                      ? j.machineRefNo
                          .toLowerCase()
                          .includes(jobsSearch.toLowerCase())
                      : true,
                  ).length
                }{" "}
                records
              </span>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <input
                type="text"
                value={jobsSearch}
                onChange={(e) => setJobsSearch(e.target.value)}
                placeholder="Search by machine ref no..."
                className="w-full pl-9 pr-9 py-2 text-sm rounded-lg border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent placeholder:text-gray-400"
              />
              {jobsSearch && (
                <button
                  onClick={() => setJobsSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Result hint */}
            {jobsSearch.trim() && (
              <p className="text-xs text-gray-500 px-1">
                {
                  breakdownsList.filter((j: Job) =>
                    j.machineRefNo
                      .toLowerCase()
                      .includes(jobsSearch.toLowerCase()),
                  ).length
                }{" "}
                result(s) for{" "}
                <span className="font-semibold text-gray-700">
                  "{jobsSearch}"
                </span>
              </p>
            )}

            {/* Stats Summary Bar */}
            {(() => {
              const total = breakdownsList.length;
              const completed = breakdownsList.filter(
                (j: Job) => j.status === "completed",
              ).length;
              const pending = breakdownsList.filter(
                (j: Job) => j.status === "pending",
              ).length;
              const inProgress = breakdownsList.filter(
                (j: Job) => j.status === "in-progress",
              ).length;
              const completedPct = total
                ? Math.round((completed / total) * 100)
                : 0;
              const pendingPct = total
                ? Math.round((pending / total) * 100)
                : 0;
              const inProgressPct = total
                ? Math.round((inProgress / total) * 100)
                : 0;

              return (
                <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm space-y-3">
                  {/* Numbers Row */}
                  <div className="grid grid-cols-4 divide-x divide-gray-100 text-center">
                    <div className="pr-3">
                      <p className="text-xl font-bold text-gray-800">{total}</p>
                      <p className="text-xs text-gray-400 mt-0.5">Total</p>
                    </div>
                    <div className="px-3">
                      <p className="text-xl font-bold text-green-600">
                        {completed}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">Completed</p>
                    </div>
                    <div className="px-3">
                      <p className="text-xl font-bold text-orange-500">
                        {pending}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">Pending</p>
                    </div>
                    <div className="pl-3">
                      <p className="text-xl font-bold text-yellow-500">
                        {inProgress}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        In Progress
                      </p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div>
                    <div className="flex justify-between text-xs text-gray-500 mb-1.5">
                      <span>
                        Completed{" "}
                        <span className="font-semibold text-green-600">
                          {completedPct}%
                        </span>
                      </span>
                      <span>
                        In Progress{" "}
                        <span className="font-semibold text-yellow-500">
                          {inProgressPct}%
                        </span>
                      </span>
                      <span>
                        Pending{" "}
                        <span className="font-semibold text-orange-500">
                          {pendingPct}%
                        </span>
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden flex">
                      <div
                        className="h-full bg-green-400 transition-all duration-500"
                        style={{ width: `${completedPct}%` }}
                      />
                      <div
                        className="h-full bg-yellow-400 transition-all duration-500"
                        style={{ width: `${inProgressPct}%` }}
                      />
                      <div
                        className="h-full bg-orange-400 transition-all duration-500"
                        style={{ width: `${pendingPct}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Job Cards */}
            {breakdownsList
              .filter((job: Job) =>
                jobsSearch.trim()
                  ? job.machineRefNo
                      .toLowerCase()
                      .includes(jobsSearch.toLowerCase())
                  : true,
              )
              .map((job: Job, idx: number) => (
                <JobCard
                  key={`${job.id}-${idx}`}
                  job={job}
                  onClick={() => handleViewDetails(job, "job")}
                />
              ))}
          </>
        )}

        {activeTab === "dues" && (
          <>
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <input
                type="text"
                value={duesSearch}
                onChange={(e) => setDuesSearch(e.target.value)}
                placeholder="Search by machine ref no..."
                className="w-full pl-9 pr-9 py-2 text-sm rounded-lg border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent placeholder:text-gray-400"
              />
              {duesSearch && (
                <button
                  onClick={() => setDuesSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Result hint */}
            {duesSearch.trim() && (
              <p className="text-xs text-gray-500 px-1">
                {
                  duesList.filter((d: Due) =>
                    d.machineRefNo
                      .toLowerCase()
                      .includes(duesSearch.toLowerCase()),
                  ).length
                }{" "}
                result(s) for{" "}
                <span className="font-semibold text-gray-700">
                  "{duesSearch}"
                </span>
              </p>
            )}

            {/* Due Cards */}
            {duesList
              .filter((due: Due) =>
                duesSearch.trim()
                  ? due.machineRefNo
                      .toLowerCase()
                      .includes(duesSearch.toLowerCase())
                  : true,
              )
              .map((due: any, idx: number) => (
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

      <RecallCard
        item={recallItem}
        isOpen={recallOpen}
        onClose={() => {
          setRecallOpen(false);
          setRecallItem(null);
        }}
        onSubmit={handleRecallSubmit}
      />
    </div>
  );
}

function addRecall(payload: any) {
  throw new Error("Function not implemented.");
}

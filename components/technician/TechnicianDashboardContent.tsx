"use client"

import { useEffect, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, Users, AlertCircle, Calendar, TrendingUp, Settings } from "lucide-react"
import { mockDataConfig } from "@/lib/data-config"
import { NotificationsPanel } from "./NotificationsPanel"
import { DashboardOverview } from "./DashboardOverview"
import { BreakdownTab } from "./BreakdownTab"
import { ServiceTab } from "./ServiceTab"
import { PerformanceTab } from "./PerformanceTab"
import { SettingsTab } from "./SettingsTab"
import { JobDetailsDialog } from "./JobDetailsDialog"
import { useApiConfig } from '@/hooks/apiconfig' 

const { technicianBreakdowns: recentBreakdowns, technicianServices: recentServices } = mockDataConfig

interface Job {
  id: string
  jobId: string
  date: string
  location: string
  description?: string
  customerName?: string
  // daysLeft: number
  status: string
  note?: string
  customer_agreement?: string
}
// Single visit item
export interface ExpectedVisit {
  machineRefNo: string;
  expectedVisitNo: string;
  expectedVisitDate: string; // ISO date string
  expectedVisitCount: number;
  visitStatus: "COMPLETED" | "PENDING"; // union type
}

// Main service response
export interface ServiceResponse {
  result: ExpectedVisit[];
  id: number;
  exception: any | null;
  status: number;
  isCanceled: boolean;
  isCompleted: boolean;
  isCompletedSuccessfully: boolean;
  creationOptions: number;
  asyncState: any | null;
  isFaulted: boolean;
}


export function TechnicianDashboardContent() {
  const api = useApiConfig()
  const [activeTab, setActiveTab] = useState("dashboard")
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [showNotifications, setShowNotifications] = useState(false)
  // const [recentBreakdowns , setRecentBreakdowns] = useState<any[]>([]);
  // const [recentServices, setRecentServices] = useState<any[]>([]);
  useEffect(() => {
    fetchAllData()
  }, [])
  const [pendingBreakdowns, setPendingBreakdowns] = useState([])
  const [completedBreakdowns, setCompletedBreakdowns] = useState([])
  const [services, setServices] = useState([])
  const [performance, setPerformance] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
    const fetchAllData = async () => {
    setLoading(true)
    setError(null)
    try {
      const [pending, completed, serviceVisits, perf] = await Promise.all([
        api.getPendingBreakdowns(),
        api.getCompletedBreakdowns(),
        api.getMonthlyServiceVisits(),
        api.getPerformance(),
      ])

      setPendingBreakdowns(pending)
      setCompletedBreakdowns(completed)
      setServices(serviceVisits)
      setPerformance(perf)
      console.log(pending, completed, serviceVisits, perf)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const notifications = [
    { id: 1, type: "service", title: "New Service Job Assigned", message: "SVC-2025-012 - Routine maintenance at Oak Plaza", time: "5 min ago" },
    { id: 2, type: "breakdown", title: "Urgent Breakdown Alert", message: "BRK-2025-009 - Elevator malfunction at Metro Tower", time: "15 min ago" },
    { id: 3, type: "update", title: "Job Update", message: "BRK-2025-007 parts have arrived", time: "1 hour ago" },
  ]

  const handleJobAction = (job: Job) => {
    setSelectedJob(job)
  }

  const handleComplete = () => {
    if (selectedJob) {
      alert(`Job ${selectedJob.jobId} marked as complete!`)
      setSelectedJob(null)
    }
  }

  const handleInProgress = () => {
    if (selectedJob) {
      alert(`Job ${selectedJob.jobId} marked as in progress!`)
      setSelectedJob(null)
    }
  }

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="md:hidden sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-lg font-bold text-gray-900">Technician Dashboard</h1>
            <div className="relative">
              <Bell 
                className="w-5 h-5 cursor-pointer text-gray-700 hover:text-blue-600" 
                onClick={() => setShowNotifications(!showNotifications)} 
              />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center font-medium">
                {notifications.length}
              </span>
            </div>
          </div>
          <p className="text-xs text-gray-500">
            {activeTab === "dashboard" && "Today's tasks overview"}
            {activeTab === "breakdown" && "Emergency breakdown jobs"}
            {activeTab === "service" && "Scheduled service jobs"}
            {activeTab === "performance" && "Your work metrics"}
            {activeTab === "settings" && "Account settings"}
          </p>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden md:block p-8 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Technician Dashboard</h1>
            <p className="text-gray-500">Welcome back! Here are your assigned jobs.</p>
          </div>
          <div className="relative">
            <Bell 
              className="w-6 h-6 cursor-pointer hover:text-blue-600 transition-colors text-gray-700" 
              onClick={() => setShowNotifications(!showNotifications)} 
            />
            <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
              {notifications.length}
            </span>
          </div>
        </div>
      </div>

      {/* Notifications Panel */}
      {showNotifications && (
        <NotificationsPanel 
          notifications={notifications} 
          onClose={() => setShowNotifications(false)} 
        />
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        {/* Mobile Bottom Navigation */}
        <TabsList className="md:hidden fixed bottom-0 left-0 right-0 grid w-full grid-cols-5 bg-white border-t border-gray-200 z-40 rounded-none h-16 shadow-lg">
          <TabsTrigger
            value="dashboard"
            className="flex flex-col items-center justify-center gap-1 py-2 text-gray-500 data-[state=active]:text-blue-600 data-[state=active]:bg-blue-50"
          >
            <Users className="w-5 h-5" />
            <span className="text-[10px] font-medium">Home</span>
          </TabsTrigger>
          <TabsTrigger
            value="breakdown"
            className="flex flex-col items-center justify-center gap-1 py-2 text-gray-500 data-[state=active]:text-blue-600 data-[state=active]:bg-blue-50"
          >
            <AlertCircle className="w-5 h-5" />
            <span className="text-[10px] font-medium">Breakdown</span>
          </TabsTrigger>
          <TabsTrigger
            value="service"
            className="flex flex-col items-center justify-center gap-1 py-2 text-gray-500 data-[state=active]:text-blue-600 data-[state=active]:bg-blue-50"
          >
            <Calendar className="w-5 h-5" />
            <span className="text-[10px] font-medium">Service</span>
          </TabsTrigger>
          <TabsTrigger
            value="performance"
            className="flex flex-col items-center justify-center gap-1 py-2 text-gray-500 data-[state=active]:text-blue-600 data-[state=active]:bg-blue-50"
          >
            <TrendingUp className="w-5 h-5" />
            <span className="text-[10px] font-medium">Stats</span>
          </TabsTrigger>
          <TabsTrigger
            value="settings"
            className="flex flex-col items-center justify-center gap-1 py-2 text-gray-500 data-[state=active]:text-blue-600 data-[state=active]:bg-blue-50"
          >
            <Settings className="w-5 h-5" />
            <span className="text-[10px] font-medium">More</span>
          </TabsTrigger>
        </TabsList>

        {/* Desktop Tabs Header */}
        <TabsList className="hidden md:flex border-b border-gray-200 p-4 gap-4 bg-white w-full justify-start rounded-none">
          <TabsTrigger value="dashboard">Dashboard Overview</TabsTrigger>
          <TabsTrigger value="breakdown">Breakdowns</TabsTrigger>
          <TabsTrigger value="service">Service Schedule</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Tab Contents */}
        <TabsContent value="dashboard" className="p-4 md:p-8 m-0 pb-20 md:pb-8">
          <DashboardOverview 
            recentServices={recentServices}
            recentBreakdowns={recentBreakdowns}
            onJobClick={handleJobAction} 
          />
        </TabsContent>

        <TabsContent value="breakdown" className="p-4 md:p-8 m-0 pb-20 md:pb-8">
          <BreakdownTab 
            breakdowns={recentBreakdowns}
            onJobClick={handleJobAction} 
          />
        </TabsContent>

        <TabsContent value="service" className="p-4 md:p-8 m-0 pb-20 md:pb-8">
          <ServiceTab 
            services={recentServices}
            onJobClick={handleJobAction} 
          />
        </TabsContent>

        <TabsContent value="performance" className="p-4 md:p-8 m-0 pb-20 md:pb-8">
          <PerformanceTab />
        </TabsContent>

        <TabsContent value="settings" className="p-4 md:p-8 m-0 pb-20 md:pb-8">
          <SettingsTab />
        </TabsContent>
      </Tabs>

      {/* Job Details Dialog */}
      <JobDetailsDialog
        job={selectedJob}
        isOpen={!!selectedJob}
        onClose={() => setSelectedJob(null)}
        onComplete={handleComplete}
        onInProgress={handleInProgress}
      />
    </div>
  )
}
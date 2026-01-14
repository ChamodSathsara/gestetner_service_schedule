
"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Bell, MapPin, FileText, CheckCircle2, AlertCircle, Clock, Users, TrendingUp, Settings, Phone, Calendar, X } from "lucide-react"
import { mockDataConfig } from "@/lib/data-config"

const { technicianBreakdowns: recentBreakdowns, technicianServices: recentServices } = mockDataConfig

interface Job {
  id: string
  jobId: string
  date: string
  location: string
  description?: string
  customerName?: string
  daysLeft: number
  status: string
  note?: string
}

export function TechnicianDashboardContent() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [jobNote, setJobNote] = useState("")
  const [lastVisit] = useState("2024-01-12 by John Silva")
  const [showNotifications, setShowNotifications] = useState(false)

  // Mock notifications data
  const notifications = [
    { id: 1, type: "service", title: "New Service Job Assigned", message: "SVC-2025-012 - Routine maintenance at Oak Plaza", time: "5 min ago" },
    { id: 2, type: "breakdown", title: "Urgent Breakdown Alert", message: "BRK-2025-009 - Elevator malfunction at Metro Tower", time: "15 min ago" },
    { id: 3, type: "update", title: "Job Update", message: "BRK-2025-007 parts have arrived", time: "1 hour ago" },
  ]

  const handleJobAction = (job: Job) => {
    setSelectedJob(job)
    setJobNote("")
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
      {/* Mobile Header - Always Visible */}
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
        <div className="fixed top-0 right-0 w-full md:w-96 h-full bg-white shadow-2xl z-50 overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">Notifications</h2>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowNotifications(false)}
              className="hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          <div className="p-4 space-y-3">
            {notifications.map((notif) => (
              <Card key={notif.id} className="bg-blue-50 border-blue-200 cursor-pointer hover:bg-blue-100 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm text-gray-900">{notif.title}</p>
                      <p className="text-xs text-gray-600 mt-1">{notif.message}</p>
                      <p className="text-xs text-gray-500 mt-2">{notif.time}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
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

        {/* Dashboard Tab */}
        <TabsContent value="dashboard" className="p-4 md:p-8 space-y-4 md:space-y-6 m-0 pb-20 md:pb-8">
          {/* KPI Cards - All Light Blue */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Card className="bg-blue-50 border-blue-200 shadow-sm">
              <CardContent className="pt-4 pb-3 text-center">
                <Calendar className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                <p className="text-2xl md:text-3xl font-bold text-blue-700">{recentServices.length}</p>
                <p className="text-xs text-blue-600 font-medium">Today Service</p>
              </CardContent>
            </Card>
            <Card className="bg-blue-50 border-blue-200 shadow-sm">
              <CardContent className="pt-4 pb-3 text-center">
                <AlertCircle className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                <p className="text-2xl md:text-3xl font-bold text-blue-700">{recentBreakdowns.length}</p>
                <p className="text-xs text-blue-600 font-medium">Today Breakdown</p>
              </CardContent>
            </Card>
            <Card className="bg-blue-50 border-blue-200 shadow-sm">
              <CardContent className="pt-4 pb-3 text-center">
                <CheckCircle2 className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                <p className="text-2xl md:text-3xl font-bold text-blue-700">12</p>
                <p className="text-xs text-blue-600 font-medium">Today Completed</p>
              </CardContent>
            </Card>
            <Card className="bg-blue-50 border-blue-200 shadow-sm">
              <CardContent className="pt-4 pb-3 text-center">
                <TrendingUp className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                <p className="text-2xl md:text-3xl font-bold text-blue-700">94%</p>
                <p className="text-xs text-blue-600 font-medium">Performance</p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Jobs Overview */}
          <div className="space-y-4">
            {/* Today's Service Jobs */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-base md:text-lg font-bold text-gray-900 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-500" />
                  Today's Service Jobs
                </h2>
                <span className="text-xs text-gray-500">{recentServices.length} scheduled</span>
              </div>
              <div className="space-y-3">
                {recentServices.map((job) => (
                  <Card
                    key={job.id}
                    className="bg-white border-l-4 border-l-blue-500 shadow-sm hover:shadow-md transition-all cursor-pointer"
                    onClick={() => handleJobAction(job)}
                  >
                    <CardContent className="p-3 md:p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <p className="font-bold text-sm md:text-base text-gray-900">{job.jobId}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{job.customerName}</p>
                        </div>
                        <span className="text-[10px] md:text-xs font-bold px-2 py-1 rounded bg-blue-100 text-blue-700 ml-2 whitespace-nowrap">
                          {job.daysLeft}d
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                        <MapPin className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">{job.location}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-gray-500">Scheduled service</div>
                        <Button size="sm" className="h-7 text-xs bg-blue-600 hover:bg-blue-700">
                          Start
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Today's Breakdowns */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-base md:text-lg font-bold text-gray-900 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-blue-500" />
                  Today's Breakdowns
                </h2>
                <span className="text-xs text-gray-500">{recentBreakdowns.length} active</span>
              </div>
              <div className="space-y-3">
                {recentBreakdowns.map((job) => (
                  <Card
                    key={job.id}
                    className="bg-white border-l-4 border-l-blue-500 shadow-sm hover:shadow-md transition-all cursor-pointer"
                    onClick={() => handleJobAction(job)}
                  >
                    <CardContent className="p-3 md:p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <p className="font-bold text-sm md:text-base text-gray-900">{job.jobId}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{job.description}</p>
                        </div>
                        <span className="text-[10px] md:text-xs font-bold px-2 py-1 rounded bg-blue-100 text-blue-700 ml-2 whitespace-nowrap">
                          {job.status.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                        <MapPin className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">{job.location}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-xs font-bold text-blue-600 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {job.daysLeft} day{job.daysLeft !== 1 ? "s" : ""} left
                        </div>
                        <Button size="sm" className="h-7 text-xs bg-blue-600 hover:bg-blue-700">
                          Start
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Breakdown Tab */}
        <TabsContent value="breakdown" className="p-4 md:p-8 space-y-3 m-0 pb-20 md:pb-8">
          <div className="mb-4">
            <h2 className="text-lg font-bold text-gray-900">Emergency Breakdowns</h2>
            <p className="text-sm text-gray-500">{recentBreakdowns.length} jobs require immediate attention</p>
          </div>
          {recentBreakdowns.map((job) => (
            <Card
              key={job.id}
              className="bg-white border-l-4 border-l-blue-500 shadow-sm hover:shadow-md transition-all cursor-pointer"
              onClick={() => handleJobAction(job)}
            >
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <p className="font-bold text-base md:text-lg text-gray-900">{job.jobId}</p>
                    <p className="text-sm text-gray-500 mt-1">{job.description}</p>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded bg-blue-100 text-blue-700 ml-2">
                    {job.status.toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{job.location}</span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="text-sm font-bold text-blue-600 flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {job.daysLeft} day{job.daysLeft !== 1 ? "s" : ""} left
                  </div>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Service Tab */}
        <TabsContent value="service" className="p-4 md:p-8 space-y-3 m-0 pb-20 md:pb-8">
          <div className="mb-4">
            <h2 className="text-lg font-bold text-gray-900">Service Schedule</h2>
            <p className="text-sm text-gray-500">{recentServices.length} scheduled maintenance jobs</p>
          </div>
          {recentServices.map((job) => (
            <Card
              key={job.id}
              className="bg-white border-l-4 border-l-blue-500 shadow-sm hover:shadow-md transition-all cursor-pointer"
              onClick={() => handleJobAction(job)}
            >
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <p className="font-bold text-base md:text-lg text-gray-900">{job.jobId}</p>
                    <p className="text-sm text-gray-500 mt-1">{job.customerName}</p>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded bg-blue-100 text-blue-700 ml-2">
                    {job.daysLeft}d
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{job.location}</span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="text-sm text-gray-500">Scheduled service</div>
                  <Button size="sm" variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="p-4 md:p-8 m-0 pb-20 md:pb-8">
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                Performance Metrics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Overall Performance</span>
                  <span className="font-bold text-xl text-blue-600">94.2%</span>
                </div>
                <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: "94.2%" }} />
                </div>
                <p className="text-xs text-gray-500 mt-2">Excellent performance! Keep it up.</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="pt-4 pb-3 text-center">
                    <CheckCircle2 className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                    <p className="text-2xl font-bold text-blue-700">156</p>
                    <p className="text-xs text-blue-600 font-medium">Completed</p>
                  </CardContent>
                </Card>
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="pt-4 pb-3 text-center">
                    <Clock className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                    <p className="text-2xl font-bold text-blue-700">8</p>
                    <p className="text-xs text-blue-600 font-medium">Pending</p>
                  </CardContent>
                </Card>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3">Recent Achievements</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 p-2 bg-blue-50 rounded-lg">
                    <CheckCircle2 className="w-5 h-5 text-blue-600" />
                    <span className="text-sm text-gray-700">10 jobs completed this week</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-blue-50 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    <span className="text-sm text-gray-700">95% customer satisfaction</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="p-4 md:p-8 m-0 pb-20 md:pb-8">
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Account Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                className="w-full justify-start bg-white text-gray-700 border-gray-200 hover:bg-gray-50 h-12"
                variant="outline"
              >
                <Users className="w-4 h-4 mr-3" />
                Edit Profile
              </Button>
              <Button
                className="w-full justify-start bg-white text-gray-700 border-gray-200 hover:bg-gray-50 h-12"
                variant="outline"
              >
                <Settings className="w-4 h-4 mr-3" />
                Change Password
              </Button>
              <Button
                className="w-full justify-start bg-white text-gray-700 border-gray-200 hover:bg-gray-50 h-12"
                variant="outline"
              >
                <Bell className="w-4 h-4 mr-3" />
                Notifications
              </Button>
              <div className="pt-4 border-t border-gray-200">
                <Button
                  className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50 bg-transparent h-12"
                  variant="outline"
                >
                  Logout
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Job Details Dialog */}
      <Dialog open={!!selectedJob} onOpenChange={(open) => !open && setSelectedJob(null)}>
        <DialogContent className="bg-white border-gray-200 max-h-[90vh] overflow-y-auto max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900">Job Details</DialogTitle>
            <DialogDescription className="text-gray-500">Review and update job information</DialogDescription>
          </DialogHeader>

          {selectedJob && (
            <div className="space-y-4">
              {/* Job Info */}
              <div className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg space-y-3 border border-gray-200">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Job ID</p>
                  <p className="font-bold text-lg text-gray-900 mt-1">{selectedJob.jobId}</p>
                </div>
                {selectedJob.description && (
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Description</p>
                    <p className="text-sm text-gray-700 mt-1">{selectedJob.description}</p>
                  </div>
                )}
                {selectedJob.customerName && (
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Customer</p>
                    <p className="text-sm text-gray-700 mt-1">{selectedJob.customerName}</p>
                  </div>
                )}
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Location</p>
                  <p className="font-medium flex items-center gap-2 text-gray-900 mt-1">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    {selectedJob.location}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-200">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Status</p>
                    <p className="font-bold capitalize text-gray-900 mt-1">{selectedJob.status}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Time Left</p>
                    <p className="font-bold text-red-600 mt-1">{selectedJob.daysLeft}d</p>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50 h-11">
                  <Phone className="w-4 h-4 mr-2" />
                  Call
                </Button>
                <Button variant="outline" className="border-green-200 text-green-700 hover:bg-green-50 h-11">
                  <MapPin className="w-4 h-4 mr-2" />
                  Navigate
                </Button>
              </div>

              {/* Last Visit */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-2 text-sm">Last Visit</h4>
                <div className="p-3 border border-gray-200 rounded-lg bg-gray-50">
                  <p className="text-sm text-gray-700">{lastVisit}</p>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="text-sm font-semibold text-gray-900 block mb-2">Add Work Note</label>
                <textarea
                  value={jobNote}
                  onChange={(e) => setJobNote(e.target.value)}
                  placeholder="Enter work notes, observations, or updates..."
                  className="w-full p-3 bg-white border border-gray-300 rounded-lg text-gray-900 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={4}
                />
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <Button
                  onClick={handleInProgress}
                  variant="outline"
                  className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 h-11 font-semibold"
                >
                  In Progress
                </Button>
                <Button onClick={handleComplete} className="bg-green-600 hover:bg-green-700 text-white h-11 font-semibold">
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Complete
                </Button>
              </div>

              <Button
                onClick={() => setSelectedJob(null)}
                variant="outline"
                className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 h-11 mt-2"
              >
                Close
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, AlertCircle, CheckCircle2, TrendingUp } from "lucide-react"
import { JobCard } from "./JobCard"

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

interface DashboardOverviewProps {
  recentServices: Job[]
  recentBreakdowns: Job[]
  onJobClick: (job: Job) => void
}

export function DashboardOverview({ recentServices, recentBreakdowns, onJobClick }: DashboardOverviewProps) {
  return (
    <div className="space-y-4 md:space-y-6">
      {/* KPI Cards */}
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
            <JobCard key={job.id} job={job} onClick={() => onJobClick(job)} variant="service" />
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
            <JobCard key={job.id} job={job} onClick={() => onJobClick(job)} variant="breakdown" />
          ))}
        </div>
      </div>
    </div>
  )
}

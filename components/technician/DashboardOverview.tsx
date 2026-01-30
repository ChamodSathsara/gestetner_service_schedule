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
  status: string
  note?: string
  customer_agreement?: string
  machineRefNo?: string

}

interface DashboardOverviewProps {
  recentServices: Job[]
  recentBreakdowns: Job[]
  onJobClick: (job: Job) => void
}

export function DashboardOverview({ recentServices, recentBreakdowns, onJobClick }: DashboardOverviewProps) {
  
  return (
    <div className="space-y-3 md:space-y-5">
      {/* Colorful KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 border-none shadow-md hover:shadow-lg transition-all">
          <CardContent className="p-2.5 md:p-3 text-center">
            <Calendar className="w-5 h-5 md:w-6 md:h-6 mx-auto mb-1 text-white" />
            <p className="text-2xl md:text-3xl font-bold text-white">{recentServices.length}</p>
            <p className="text-[9px] md:text-xs text-blue-100 font-semibold">Monthly Pending Service</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-red-500 to-red-600 border-none shadow-md hover:shadow-lg transition-all">
          <CardContent className="p-2.5 md:p-3 text-center">
            <AlertCircle className="w-5 h-5 md:w-6 md:h-6 mx-auto mb-1 text-white" />
            <p className="text-2xl md:text-3xl font-bold text-white">{recentBreakdowns.length}</p>
            <p className="text-[9px] md:text-xs text-red-100 font-semibold">Today Pending Jobs</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-500 to-green-600 border-none shadow-md hover:shadow-lg transition-all">
          <CardContent className="p-2.5 md:p-3 text-center">
            <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 mx-auto mb-1 text-white" />
            <p className="text-2xl md:text-3xl font-bold text-white">12</p>
            <p className="text-[9px] md:text-xs text-green-100 font-semibold">Monthly Completed Services</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 border-none shadow-md hover:shadow-lg transition-all">
          <CardContent className="p-2.5 md:p-3 text-center">
            <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 mx-auto mb-1 text-white" />
            <p className="text-2xl md:text-3xl font-bold text-white">2</p>
            <p className="text-[9px] md:text-xs text-purple-100 font-semibold">Today Completed Jobs</p>
          </CardContent>
        </Card>
      </div>

      {/* Service Jobs Section */}
      <div>
        <div className="flex items-center justify-between mb-2 px-0.5">
          <h2 className="text-sm md:text-base font-bold text-gray-900 flex items-center gap-1.5">
            <div className="w-1 h-5 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full"></div>
            <span>Service Jobs</span>
          </h2>
          <span className="text-[10px] md:text-xs text-white bg-gradient-to-r from-blue-500 to-blue-600 px-2.5 py-1 rounded-full font-semibold shadow-sm">
            {recentServices.length}
          </span>
        </div>
        <div className="space-y-2">
          {recentServices.length > 0 ? (
            recentServices.map((job) => (
              <JobCard key={job.id} job={job} onClick={() => onJobClick(job )} variant="service"  />
            ))
          ) : (
            <Card className="bg-gradient-to-r from-gray-50 to-gray-100 border-dashed border-2 border-gray-300">
              <CardContent className="p-4 text-center">
                <Calendar className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-600 font-medium">No service jobs</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Breakdowns Section */}
      <div>
        <div className="flex items-center justify-between mb-2 px-0.5">
          <h2 className="text-sm md:text-base font-bold text-gray-900 flex items-center gap-1.5">
            <div className="w-1 h-5 bg-gradient-to-b from-red-500 to-red-600 rounded-full"></div>
            <span>Breakdowns</span>
          </h2>
          <span className="text-[10px] md:text-xs text-white bg-gradient-to-r from-red-500 to-red-600 px-2.5 py-1 rounded-full font-semibold shadow-sm">
            {recentBreakdowns.length}
          </span>
        </div>
        <div className="space-y-2">
          {recentBreakdowns.length > 0 ? (
            recentBreakdowns.map((job) => (
              <JobCard key={job.id} job={job} onClick={() => onJobClick(job)} variant="breakdown"  />
            ))
          ) : (
            <Card className="bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-200">
              <CardContent className="p-4 text-center">
                <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-green-500" />
                <p className="text-sm text-green-700 font-medium">All clear!</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
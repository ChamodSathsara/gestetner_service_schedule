import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle, CheckCircle2 } from "lucide-react"
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
  phone_number?: number
}

interface BreakdownTabProps {
  breakdowns: Job[]
  onJobClick: (job: Job) => void
}

export function BreakdownTab({ breakdowns, onJobClick }: BreakdownTabProps) {
  return (
    <div className="space-y-3">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg p-3 md:p-4 shadow-md">
        <div className="flex items-center gap-2 mb-1">
          <AlertTriangle className="w-5 h-5 text-white" />
          <h2 className="text-sm md:text-base font-bold text-white">Emergency Breakdowns</h2>
        </div>
        <p className="text-xs md:text-sm text-red-100 ml-7">
          {breakdowns.length} {breakdowns.length === 1 ? 'job requires' : 'jobs require'} immediate attention
        </p>
      </div>

      {/* Breakdown Cards */}
      {breakdowns.length > 0 ? (
        <div className="space-y-2">
          {breakdowns.map((job) => (
            <JobCard 
              key={job.id} 
              job={job} 
              onClick={() => onJobClick(job)} 
              variant="breakdown" 
            />
          ))}
        </div>
      ) : (
        <Card className="bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-200">
          <CardContent className="p-6 md:p-8 text-center">
            <CheckCircle2 className="w-12 h-12 mx-auto mb-3 text-green-500" />
            <p className="text-sm text-green-700 font-bold">No Active Breakdowns</p>
            <p className="text-xs text-green-600 mt-1">All systems operational</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}